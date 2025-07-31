<?php
$HOME_DIR = "../../";
include $HOME_DIR . "_include/_db.php";
include $HOME_DIR . "_include/_code.php";

$uid = $_POST['uid']; 
$apSn = $_POST['apSn']; 
$host = $_POST['host']; 
$name = $_POST['name']; 
$state = $_POST['state'];
$datetime_start = $_POST["datetime_start"];
$gs_pid1 = $_POST['pid1_name'];
$gs_pid2 = $_POST['pid2_name'];

CreateDbCon();
$Rs = CreateRecordset();


$sql = "SELECT parent_ap_sn FROM content_info WHERE ap_name = '" . $apSn . "'";

$apSnResult = OpenRecordset($Rs, $sql);
$apSnFromTable = $apSnResult->Col('parent_ap_sn');


$sql = "SELECT school_sc_code FROM school_info WHERE school_name = '" . $host . "'";
$hostResult = OpenRecordset($Rs, $sql);
$hostFromTable = $hostResult->Col('school_sc_code');

$sql = "SELECT school_pid FROM school_info WHERE school_name = '" . $gs_pid1 . "'";
$p1Result = OpenRecordset($Rs, $sql);
$p1FromTable = $p1Result->Col('school_pid');

$sql = "SELECT school_pid FROM school_info WHERE school_name = '" . $gs_pid2 . "'";
$p2Result = OpenRecordset($Rs, $sql);
$p2FromTable = $p2Result->Col('school_pid');




$ret = array(
    "code" => SUCCESS, 
    "message" => "OK",  
    "apSn" => $apSnFromTable, 
    "host" => $hostFromTable, 
    "name" => $name, 
    "state" => $state, 
    "datetime"=> $datetime_start,
    "gs_pid1" => $p1FromTable, 
    "gs_pid2" => $p2FromTable
);

$sql = "UPDATE gameschedule SET ";
$sql .= "gs_name = '" . $name . "', "; 
$sql .= "gs_apSn = '" . $apSnFromTable . "', "; 
$sql .= "gs_scCode = '" .$hostFromTable . "', "; 
$sql .= "gs_state = '" . $state . "', ";
$sql .= "gs_pid1 = '" . $p1FromTable . "', ";
$sql .= "gs_pid2 = '" . $p2FromTable . "', ";
$sql .= "gs_datetime_start = '" . $datetime_start . "' ";
$sql .= "WHERE gs_uid = '" . $uid . "';";

$Rs = OpenRecordset($Rs, $sql);

echo json_encode($ret);

DestroyDbCon();
?>
