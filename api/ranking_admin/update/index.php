<?php
//- 파일명 : vrsportsfestival/api/ranking_admin/update/index.php
//- 파일설명 : ranking_admin

$HOME_DIR = "../../";
include $HOME_DIR . "_include/_db.php";
include $HOME_DIR . "_include/_code.php";


CreateDbCon();

$Rs = CreateRecordset();

$ret = array("code" => SUCCESS, "message" => "OK");

$update_sql = "UPDATE ranking_update SET current_confirmed_date = NOW()";
$Rs = OpenRecordset($Rs, $update_sql);

echo json_encode($ret);

DestroyDbCon();
?>
