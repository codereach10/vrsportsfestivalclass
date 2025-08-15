<?
$HOME_DIR = "../../";
include $HOME_DIR . "_include/_db.php";
include $HOME_DIR . "_include/_code.php";
?>

<?

$admin_id = $_POST['id'];
$admin_password = $_POST['password'];
$admin_role = $_POST['role'];

//header('Content-Type: application/json; charset=utf-8');
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

$sql_check = "SELECT COUNT(*) as cnt from admin where id = '".$admin_id."'";
$Rs = CreateRecordset();
$Rs = OpenRecordset($Rs, $sql_check);
// Fetch the count
$count = 0;

$count = (int)$Rs->Col('cnt');

// 2. 개수(count)에 따른 분기 처리
if ($count > 0) {
    $ret = array("code" => FAILURE , "message" => "이미 등록된 아이디입니다.");
} else {
    $hashedPassword = hashPassword($admin_password);

    $sql  = "INSERT INTO admin (id, password, role) VALUES ";
    $sql .= "('" . $admin_id . "', '" . $hashedPassword . "', '" . $admin_role . "')";

    $Rs = OpenRecordset($Rs, $sql);

    if (!$Rs) {
        handleDatabaseError("Error executing SQL statement: " . mysqli_error());
    }

    // Return success message
    $ret = array("code" => SUCCESS, "message" => "OK");
}
echo json_encode($ret);

DestroyDbCon();
?>
