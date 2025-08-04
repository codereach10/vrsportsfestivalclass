<?
    // 업로드할 디렉토리 (예: /var/www/html/uploads)
    $uploadDir = $_SERVER['DOCUMENT_ROOT']."/uploads/";

    // 디렉토리가 없으면 생성
    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }
    
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
            echo json_encode(["error" => "허용되지 않은 확장자입니다."]);
            exit;
        }

        // 업로드 시도
        if (move_uploaded_file($file["tmp_name"], $targetFile)) {
            $response['message'] = "업로드 성공";
            $response['filePath'] = "/uploads/" . $filename; // 클라이언트가 접근 가능한 경로로 조정 필요
        } else {
            http_response_code(500);
            $response['error'] = "파일 업로드 실패";
        }
    } else {
        http_response_code(400);
        $response['error'] = "잘못된 요청입니다.";
    }

    header("Content-Type: application/json");
    echo json_encode($response);
?>
