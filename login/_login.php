<?php
$HOME_DIR = "../";
include $HOME_DIR . "_include/_db.php";

$user_id = $_POST['id'];
$user_password = $_POST['password'];

session_start();

CreateDbCon();

// Fetch user data from database
$sql = "SELECT id, password, role FROM admin WHERE id = '$user_id';";
$Rs = OpenRecordset($Rs, $sql);

$hashed_password = null;
$user_role = null;

while ($row = $Rs->NextRow()) {
    $hashed_password = $row['password'];
    $user_role = $row['role'];
}

// Verify password
if (password_verify($user_password, $hashed_password)) {
   
    $_SESSION["user_name"] = $user_id;

   
    if ($user_role == 'master') {
        $_SESSION["user_role"] = "master";
    } elseif ($user_role == 'ranking') {
        $_SESSION["user_role"] = "ranking";
    } else {
        $_SESSION["user_role"] = "user"; 
    }

    include $HOME_DIR . "_include/_session.php";

    echo json_encode(array("code" => 0, "message" => "OK", "role" => $_SESSION["user_role"]));
} else {
    // Invalid password or user ID
    echo json_encode(array("code" => 2, "message" => "Invalid Password or User ID"));
}

// Close database connection
DestroyRecordset($Rs);
DestroyDbCon();
?>
