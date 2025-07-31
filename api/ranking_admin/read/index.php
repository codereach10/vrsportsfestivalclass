<?php
//- 파일명 : vrsportsfestival/api/ranking_admin/read/index.php
//- 파일설명 : ranking_admin

$HOME_DIR = "../../";
include $HOME_DIR . "_include/_db.php";
include $HOME_DIR . "_include/_code.php";


CreateDbCon();
$Rs = CreateRecordset();

// Prepare the SQL query
$insert_sql = "SELECT * FROM ranking_update";
$Rs = OpenRecordset($Rs, $insert_sql);

$ret = array("code" => SUCCESS, "message" => "OK");

while ($Rs->NextRow()) {
    $current_confirmed_date = $Rs->Col("current_confirmed_date");
    $data = $current_confirmed_date;
}


$ret["current_confirmed_date"] = $data;
echo json_encode($ret);

DestroyDbCon();
?>
