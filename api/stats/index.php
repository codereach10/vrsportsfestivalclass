<?php
$HOME_DIR = "../";
include $HOME_DIR . "_include/_db.php";
include $HOME_DIR . "_include/_code.php";

$contest_id = $_POST["contest_id"];


CreateDbCon();
$Rs = CreateRecordset();

$ret = array("code" => SUCCESS, "message" => "OK");
$stats = array();

// Count schools
$sql = "SELECT * FROM contest_schools WHERE contest_id = '$contest_id'";
$Rs = OpenRecordset($Rs, $sql);
$count_schools = $Rs->GetCount();
$stats['count_schools'] = $count_schools;

$sql1 = "SELECT * FROM gameschedule WHERE gs_contestID = '$contest_id'";
$Rs = OpenRecordset($Rs, $sql1);
$count_match = $Rs->GetCount();
$stats['count_match'] = $count_match;

$sql2 = "SELECT *  FROM gameschedule WHERE gs_contestID = '$contest_id' AND gs_state = 0";
$Rs = OpenRecordset($Rs, $sql2);
$count_match_left = $Rs->GetCount();
$stats['count_match_left'] = $count_match_left;


$sql3 = "SELECT *  FROM gameschedule WHERE gs_contestID = '$contest_id' AND gs_state = 3";
$Rs = OpenRecordset($Rs, $sql3);
$count_match_over = $Rs->GetCount();
$stats['count_match_over'] = $count_match_over;


echo json_encode($stats);

$Rs = DestroyRecordset($Rs);
DestroyDbCon();
?>
