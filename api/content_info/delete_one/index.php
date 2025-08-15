<?
$HOME_DIR = "../../";
include $HOME_DIR . "_include/_db.php";
include $HOME_DIR . "_include/_code.php";
?>

<?
$ap_sn = $_POST["ap_sn"];

if(!isset($ap_sn)) {
    $ret = array("code" => ERR_PARAMS_EMPTY, "message" => "Parameters not set ");
    echo json_encode($ret);
    exit;
}

CreateDbCon();

$Rs = CreateRecordset();
$ret = array("code" => SUCCESS, "message" => "OK");


$sql = "DELETE FROM content_info";
$sql .= " WHERE ap_sn = '" . $ap_sn . "'";

$Rs = OpenRecordset($Rs, $sql);

echo json_encode($ret);

DestroyDbCon();
?>
