<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

ini_set('display_errors', 1);
error_reporting(E_ALL);

if (!empty($_FILES)) {
    $responses = array();

    foreach ($_FILES as $key => $file) {
        $file_name = $file['name'];
        $file_tmp = $file['tmp_name'];
        $file_size = $file['size'];
        $file_error = $file['error'];

        $allowed_extensions = array('jpg');

        $file_extension = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));

        if ($file_error === 0) {
            if (in_array($file_extension, $allowed_extensions)) {
                $dirpath = dirname(getcwd());
                $file_destination = '../../../banners/' . $file_name;

                if (is_uploaded_file($file_tmp)) {
                    if (move_uploaded_file($file_tmp, $file_destination)) {
                        $responses[] = array(
                            "file" => $file_name,
                            "message" => "File uploaded successfully."
                        );
                    } else {
                        $responses[] = array(
                            "file" => $file_name,
                            "error" => "Failed to move uploaded file."
                        );
                    }
                } else {
                    $responses[] = array(
                        "file" => $file_name,
                        "error" => "File is not an uploaded file."
                    );
                }
            } else {
                $responses[] = array(
                    "file" => $file_name,
                    "error" => "Invalid file format. Only JPG images are allowed."
                );
            }
        }
    }

    echo json_encode($responses);
} else {
    echo json_encode(array("error" => "No files uploaded."));
}
?>
