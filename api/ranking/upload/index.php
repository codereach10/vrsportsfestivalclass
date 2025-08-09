<?
    // 업로드할 디렉토리 (예: /var/www/html/uploads)
    $uploadDir = $_SERVER['DOCUMENT_ROOT']."/uploads/";

    // 디렉토리가 없으면 생성
    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }
    $maxFileSize = 500 * 1024 * 1024;
    $response = [];

    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['video'])) {
        $file = $_FILES['video'];
        $filename = basename($file['name']);
        $targetFile = $uploadDir . $filename;

        // 확장자 체크 (보안 목적)
        $allowedExts = ['mp4', 'mov', 'avi', 'webm'];
        $ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
        if (!in_array($ext, $allowedExts)) {
            http_response_code(400);
            $response['error'] = "업로드 영상의 타입이 적절하지 않습니다. 영상을 확인 후 다시 시도해 주세요.";
        } else
        if($file['size'] > $maxFileSize) {
            http_response_code(400);
            $response['error'] = "용량이 500MB를 초과하였습니다.\n업로드 가능 용량은 500MB입니다.";
            exit;
        } 
        // 업로드 시도
        if (move_uploaded_file($file["tmp_name"], $targetFile)) {
            $response['message'] = "업로드 성공";
            $response['filePath'] = "/uploads/" . $filename; // 클라이언트가 접근 가능한 경로로 조정 필요
        } else {
            http_response_code(500);
            $response['error'] = "네트워크 연결상태가 좋지 않습니다. 잠시 후 다시 시도해주십시요.";
        }
    } else {
        http_response_code(400);
        $response['error'] = "잘못된 요청입니다.";
    }

    header("Content-Type: application/json");
    echo json_encode($response);
?>
