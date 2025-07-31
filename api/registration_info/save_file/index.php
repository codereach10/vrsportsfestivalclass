<?

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

ini_set('display_errors', 1);
error_reporting(E_ALL);
?>

<?

if (isset($_FILES['file'])) {
    $file = $_FILES['file'];


    $file_name = $file['name'];
    $file_tmp = $file['tmp_name'];
    $file_size = $file['size'];
    $file_error = $file['error'];

    if ($file_error === 0) {
        $dirpath = dirname(getcwd());

        $file_destination = '../../../participation/roster/' . $file_name;
        if (is_uploaded_file($file_tmp)) {
            if (move_uploaded_file($file_tmp, $file_destination)) {
                echo json_encode(
                    array(
                        "message" => "File uploaded successfully."
                    )
                );
            } else {
                echo json_encode(array("error" => "Failed to move uploaded file."));
            }
        } else {
            echo json_encode(array("error" => "File is not an uploaded file."));
        }
    }
}

?>