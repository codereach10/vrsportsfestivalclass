<?
//- 파일명 : vrsportsfestival/api/schedule/create
//- 파일설명 : schedule
?>

<?php
$HOME_DIR = "../../";
include $HOME_DIR . "_include/_db.php";
include $HOME_DIR . "_include/_code.php";
?>

<?php
$apSn = $_POST['gs_apSn']; 
$gs_scCode = $_POST['gs_scCode'];
$gs_contestID = $_POST['gs_contestID'];
$gs_name = $_POST['gs_name'];
$gs_round = $_POST['gs_round'];
$gs_num = $_POST['gs_num'];
$gs_pid1 = $_POST['gs_pid1'];
$gs_pid2 = $_POST['gs_pid2'];
$gs_datetime_start = $_POST['gs_datetime_start'];
$gs_datetime_end = $_POST['gs_datetime_end'];
?>

<?php
CreateDbCon();

$Rs = CreateRecordset();
$ret = array("code" => SUCCESS, "message" => "OK");

// Fetch parent_ap_sn from content_info based on the provided apSn
$sql_fetch = "SELECT parent_ap_sn FROM content_info WHERE ap_sn = '" . $apSn . "'";
$Rs = OpenRecordset($Rs, $sql_fetch);

    $parent_ap_sn = $Rs->Col("parent_ap_sn");

    // Extract hour and minutes from gs_datetime_start
    $datetime_start = new DateTime($gs_datetime_start);
    $gs_hour = $datetime_start->format('H'); // Get hour
    $gs_playminutes = $datetime_start->format('i'); // Get minutes

    // Insert into gameschedule using parent_ap_sn, gs_hour, and gs_playminutes
    $sql_insert = "INSERT INTO gameschedule";
    $sql_insert .= " (gs_apSn, gs_contestID, gs_scCode, gs_name, gs_round, gs_num, gs_pid1, gs_pid2, gs_datetime_start, gs_datetime_end, gs_hour, gs_playminutes, gs_state) VALUES";
    $sql_insert .= " ('" . $parent_ap_sn . "','" . $gs_contestID . "','" . $gs_scCode . "','" . $gs_name . "','" . $gs_round . "','" . $gs_num . "','" . $gs_pid1 . "','" . $gs_pid2 . "','" . $gs_datetime_start . "','" . $gs_datetime_end . "','" . $gs_hour . "','" . $gs_playminutes . "', 0)";

    $Rs = OpenRecordset($Rs, $sql_insert);
    echo json_encode($ret);


DestroyDbCon();
?>
