<?php
$HOME_DIR = "../../";
include $HOME_DIR . "_include/_db.php";
include $HOME_DIR . "_include/_code.php";

$ap_sn = $_POST['ap_sn'];
$parent_ap_sn = $_POST['parent_ap_sn'];
$ap_name = $_POST['ap_name'];
$ap_intro = $_POST['ap_intro'];
$ap_guide = $_POST['ap_guide'];
$ap_rule = $_POST['ap_rule'];

if (
    !isset($ap_sn) || !isset($parent_ap_sn) || !isset($ap_name) || !isset($ap_intro) || !isset($ap_guide) || !isset($ap_rule)
) {
    $missing_params = array();
    if (!isset($ap_sn)) $missing_params[] = "ap_sn";
    if (!isset($parent_ap_sn)) $missing_params[] = "parent_ap_sn";
    if (!isset($ap_name)) $missing_params[] = "ap_name";
    if (!isset($ap_intro)) $missing_params[] = "ap_intro";
    if (!isset($ap_guide)) $missing_params[] = "ap_guide";
    if (!isset($ap_rule)) $missing_params[] = "ap_rule";

    $ret = array("code" => ERR_PARAMS_EMPTY, "message" => "Parameters not set: " . implode(", ", $missing_params));
    echo json_encode($ret);
    exit;
}

CreateDbCon();
$Rs = CreateRecordset();

$ret = array("code" => SUCCESS, "message" => "OK", "ap_intro" => $ap_intro, "ap_sn" => $ap_sn);

$sql = "UPDATE content_info SET ";
$sql .= "parent_ap_sn = '" . $parent_ap_sn . "', ";
$sql .= "ap_name = '" . $ap_name . "', ";
$sql .= "ap_intro = '" . $ap_intro . "', ";
$sql .= "ap_guide = '" . $ap_guide . "', ";
$sql .= "ap_rule = '" . $ap_rule . "' ";
$sql .= "WHERE ap_sn= '" . $ap_sn . "';";

$Rs = OpenRecordset($Rs, $sql);

echo json_encode($ret);

DestroyDbCon();
?>
