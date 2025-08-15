<?php
$HOME_DIR = "../../";
include $HOME_DIR . "_include/_db.php";
include $HOME_DIR . "_include/_code.php";

$contest_id = $_POST['contest_id'];
$contest_cnt = $_POST['contest_cnt'];
$contest_name = $_POST['contest_name'];
$register_start_str = $_POST['register_start'];
$register_end_str = $_POST['register_end'];
$kickoff_start_str = $_POST['kickoff_start'];
$kickoff_end_str = $_POST['kickoff_end'];
$terms_info = $_POST['terms_info'];

if (
    !isset($contest_id) ||!isset($contest_cnt) || !isset($contest_name)
) {
    $missing_params = array();
    if (!isset($contest_id)) $missing_params[] = "contest_id";
    if (!isset($contest_cnt)) $missing_params[] = "contest_cnt";
    if (!isset($contest_name)) $missing_params[] = "contest_name";

    $ret = array("code" => ERR_PARAMS_EMPTY, "message" => "Parameters not set: " . implode(", ", $missing_params));
    echo json_encode($ret);
    exit;
}

try {
    $register_start = (new DateTime($register_start_str))->format('Y-m-d H:i:s');
    $register_end = (new DateTime($register_end_str))->format('Y-m-d H:i:s');
    $kickoff_start = (new DateTime($kickoff_start_str))->format('Y-m-d H:i:s');
    $kickoff_end = (new DateTime($kickoff_end_str))->format('Y-m-d H:i:s');
} catch (Exception $e) {
    // 날짜 형식이 잘못되었을 경우 에러 처리
    $ret = array("code" => ERR_INVALID_DATE, "message" => "Invalid date format provided.");
    echo json_encode($ret);
    exit;
}

CreateDbCon();
$Rs = CreateRecordset();
$ret = array("code" => SUCCESS, "message" => "OK");

$sql = "UPDATE contest_info SET ";
$sql .= "contest_cnt = '" . $contest_cnt . "', ";
$sql .= "contest_name = '" . $contest_name . "', ";
$sql .= "register_start = '" . $register_start . "', ";
$sql .= "register_end = '" . $register_end . "', ";
$sql .= "kickoff_start = '" . $kickoff_start . "', ";
$sql .= "kickoff_end = '" . $kickoff_end . "', ";
$sql .= "terms_info = '" . $terms_info . "' ";
$sql .= "WHERE contest_id = '" . $contest_id . "';";



$Rs = OpenRecordset($Rs, $sql);

echo json_encode($ret);

DestroyDbCon();
?>
