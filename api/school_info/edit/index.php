<?php
$HOME_DIR = "../../";
include $HOME_DIR . "_include/_db.php";
include $HOME_DIR . "_include/_code.php";

$school_pid = $_POST['school_pid'];
$school_host = $_POST['school_host'];
$school_sc_code = $_POST['school_sc_code'];
$school_name = $_POST['school_name'];
$school_group = $_POST['school_group'];


if (
    !isset($school_pid) || !isset($school_group) || !isset($school_sc_code) || !isset($school_name) 
) {
    $missing_params = array();
    if (!isset($school_sc_code)) $missing_params[] = "school_sc_code";
    if (!isset($school_name)) $missing_params[] = "school_name";
    if (!isset($school_group)) $missing_params[] = "school_group";
    header('Content-Type: application/json; charset=utf-8');
    $ret = array("code" => ERR_PARAMS_EMPTY, "message" => "Parameters not set: " . implode(", ", $missing_params));
    echo json_encode($ret);
    exit;
}

CreateDbCon();
$Rs = CreateRecordset();
$ret = array("code" => SUCCESS, "message" => "OK");

$sql = "UPDATE school_info SET ";
$sql .= "school_host = '" . $school_host . "', ";
$sql .= "school_sc_code = '" . $school_sc_code . "', ";
$sql .= "school_name = '" . $school_name . "', ";
$sql .= "school_group = '" . $school_group . "' ";
$sql .= "WHERE school_pid = '" . $school_pid . "';";


$Rs = OpenRecordset($Rs, $sql);

echo $sql;
echo json_encode($ret);

DestroyDbCon();
?>
