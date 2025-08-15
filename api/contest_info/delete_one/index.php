<?php
$HOME_DIR = "../../";
include $HOME_DIR . "_include/_db.php";
include $HOME_DIR . "_include/_code.php";
?>

<?php
$contest_id = $_POST["contest_id"];

if(!isset($contest_id)) {
    $ret = array("code" => ERR_PARAMS_EMPTY, "message" => "Parameters not set ");
    echo json_encode($ret);
    exit;
}

CreateDbCon();

$Rs = CreateRecordset();
$ret = array("code" => SUCCESS, "message" => "OK");

$sql = "DELETE FROM contest_info";
$sql .= " WHERE contest_id = '" . $contest_id . "'";

$Rs = OpenRecordset($Rs, $sql);

echo json_encode($ret);

DestroyDbCon();
?>
