<?php
$HOME_DIR = "../../";
include $HOME_DIR . "_include/_db.php";
?>

<?

$admin_id = $_POST['id'];
$admin_password = $_POST['password'];
$admin_role = $_POST['role'];


if (!isset($admin_id) || !isset($admin_password)|| !isset($admin_role)) {
    handleDatabaseError("Missing parameters.");
}


//function to hash password
function hashPassword($password) {
    return password_hash($password, PASSWORD_BCRYPT);
}
// Function to handle database errors
function handleDatabaseError($errorMessage) {
    $ret = array("code" => ERR_PARAMS_EMPTY, "message" => $errorMessage);
    echo json_encode($ret);
    exit;
}



// Check if required fields are set


CreateDbCon();

$hashedPassword = hashPassword($admin_password);

$sql  = "INSERT INTO admin (id, password, role) VALUES ";
$sql .= "('" . $admin_id . "', '" . $hashedPassword . "', '" . $admin_role . "')";

$Rs = CreateRecordset();

$Rs = OpenRecordset($Rs, $sql);

if (!$Rs) {
    handleDatabaseError("Error executing SQL statement: " . mysqli_error());
}

// Return success message
$ret = array("code" => SUCCESS, "message" => "OK");
echo json_encode($ret);

DestroyDbCon();
?>
