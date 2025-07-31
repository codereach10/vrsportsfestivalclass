<?php
//- 파일명 : vrsportsfestival/api/ranking/update/index.php
//- 파일설명 : ranking 

$HOME_DIR = "../../";
include $HOME_DIR . "_include/_db.php";
include $HOME_DIR . "_include/_code.php";

$ranking_school_sc = $_POST["ranking_school_sc"];
$ranking_ap_sn = $_POST["ranking_ap_sn"];
$ranking_score = $_POST["ranking_score"];
$ranking_video_name = $_POST["ranking_video_name"];

CreateDbCon();

$Rs = CreateRecordset();

$ret = array("code" => SUCCESS, "message" => "OK");

$insert_sql = "INSERT INTO ranking (ranking_school_sc, ranking_ap_sn, ranking_score, ranking_video_name) VALUES ('" . $ranking_school_sc . "','" . $ranking_ap_sn . "','" . $ranking_score . "','" . $ranking_video_name . "')";
$Rs = OpenRecordset($Rs, $insert_sql);

echo json_encode($ret);

DestroyDbCon();
?>
