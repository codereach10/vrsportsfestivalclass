<?php
$HOME_DIR = "../../";
include $HOME_DIR . "_include/_db.php";
include $HOME_DIR . "_include/_code.php";
?>

<?php
$contest_id = $_POST["contest_id"];
$school_ids = $_POST["school_ids"];

if(!isset($contest_id) || !isset($school_ids)) {
    $ret = array("code" => ERR_PARAMS_EMPTY, "message" => "Parameters not set ");
    echo json_encode($ret);
    exit;
}

CreateDbCon();

$Rs = CreateRecordset();
$ret = array("code" => SUCCESS, "message" => "OK", "contest_id" => $contest_id, "school_ids" => $school_ids);

foreach ($school_ids as $school_id) { 
    $sql = "DELETE FROM contest_schools";
    $sql .= " WHERE contest_id = '" . $contest_id . "'";
    $sql .= " AND school_id = '" . $school_id . "'";

    $Rs = OpenRecordset($Rs, $sql);
}

echo json_encode($ret);

DestroyDbCon();
?>
