<?php
$HOME_DIR = "../../";
include $HOME_DIR . "_include/_db.php";
include $HOME_DIR . "_include/_code.php";

$contest_id = $_POST['contest_id'];
$contest_state = $_POST['contest_state'];

if (!isset($contest_id) || !isset($contest_state)) {
    $missing_params = array();
    if (!isset($contest_id)) $missing_params[] = "contest_id";
    if (!isset($contest_state)) $missing_params[] = "contest_state";

    $ret = array("code" => ERR_PARAMS_EMPTY, "message" => "Parameters not set: " . implode(", ", $missing_params));
    echo json_encode($ret);
    exit;
}

CreateDbCon();
$Rs = CreateRecordset();
$ret = array("code" => SUCCESS, "message" => "OK");

$sql = "UPDATE contest_info SET ";
$sql .= "contest_state = '" . $contest_state . "' ";
$sql .= "WHERE contest_id = '" . $contest_id . "';";

$Rs = OpenRecordset($Rs, $sql);

echo json_encode($ret);

DestroyDbCon();
?>
