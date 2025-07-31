<?php
//- 파일명 : vrsportsfestival/api/record/create/index.php
//- 파일설명 : record 

$HOME_DIR = "../../";
include $HOME_DIR . "_include/_db.php";
include $HOME_DIR . "_include/_code.php";

$record_match = $_POST["record_match"];
$record_school_sc = $_POST["record_school_sc"];
$record_ap_sn = $_POST["record_ap_sn"];
$record_score = $_POST["record_score"];

CreateDbCon();

$ret = array("code" => SUCCESS, "message" => "OK");

$check_sql = "
    SELECT COUNT(*) as count 
    FROM record 
    WHERE record_match = '$record_match' 
    AND record_school_sc = '$record_school_sc'
";

$check_result = OpenRecordset(null, $check_sql);
$check_data = $check_result->NextRow(); 
$exists = ($check_data && $check_data['count'] > 0);

if ($exists) {
    // Update existing record
    $update_sql = "
        UPDATE record 
        SET record_score = '$record_score' 
        WHERE record_match = '$record_match' 
        AND record_school_sc = '$record_school_sc'
    ";
    OpenRecordset(null, $update_sql);
} else {
    // Insert new record
    $insert_sql = "
        INSERT INTO record (record_match, record_school_sc, record_ap_sn, record_score) 
        VALUES ('$record_match', '$record_school_sc', '$record_ap_sn', '$record_score')
    ";
    OpenRecordset(null, $insert_sql);
}

echo json_encode($ret);

DestroyDbCon();
?>
