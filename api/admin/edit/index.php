<?
$HOME_DIR = "../../";
include $HOME_DIR . "_include/_db.php";
include $HOME_DIR . "_include/_code.php";

$seq = $_POST['seq'];
$id = $_POST['id'];
$role = $_POST['role'];



if (
    !isset($seq) ||!isset($id) || !isset($role)
) {
    $missing_params = array();
    if (!isset($seq)) $missing_params[] = "seq";
    if (!isset($id)) $missing_params[] = "id";
    if (!isset($role)) $missing_params[] = "role";

    $ret = array("code" => ERR_PARAMS_EMPTY, "message" => "Parameters not set: " . implode(", ", $missing_params));
    echo json_encode($ret);
    exit;
}

CreateDbCon();
$Rs = CreateRecordset();
$ret = array("code" => SUCCESS, "message" => "OK");

$sql = "UPDATE admin SET ";
$sql .= "role = '" . $role . "' ";
$sql .= "WHERE seq = '" . $seq . "';";


$Rs = OpenRecordset($Rs, $sql);

echo json_encode($ret);

DestroyDbCon();
?>
