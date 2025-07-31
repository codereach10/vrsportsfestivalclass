<?php
$HOME_DIR = "../../";
include $HOME_DIR . "_include/_db.php";
include $HOME_DIR . "_include/_code.php";

$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(['code' => 400, 'error' => 'Invalid JSON'], JSON_UNESCAPED_UNICODE);
    exit;
}

CreateDbCon();
$Rs = CreateRecordset();

$ret = array("code" => 200, "message" => "등록 가능한 레코드입니다.");
$ranking = array();

$ranking_school_sc = $data["ranking_school_sc"] ?? null;
$ranking_ap_sn = $data["ranking_ap_sn"] ?? null;

if ($ranking_school_sc === null || $ranking_ap_sn === null) {
    echo json_encode(['code' => 400, 'error' => 'Missing parameters'], JSON_UNESCAPED_UNICODE);
    exit;
}

$sql = "SELECT school_pid, school_sc_code FROM school_info WHERE school_sc_code = '$ranking_school_sc'";
$Rs = OpenRecordset($Rs, $sql);

if (!$Rs || !$Rs->NextRow()) {
    echo json_encode(['code' => 404, 'error' => '참가 학교 아닙니다.'], JSON_UNESCAPED_UNICODE);
    exit;
}

$sql = "SELECT seq, ranking_school_sc, ranking_ap_sn, ranking_score 
        FROM ranking 
        WHERE ranking_school_sc = '$ranking_school_sc' 
        AND ranking_ap_sn = '$ranking_ap_sn'";
$Rs = OpenRecordset($Rs, $sql);

if (!$Rs) {
    echo json_encode(['code' => 500, 'error' => 'Database query failed'], JSON_UNESCAPED_UNICODE);
    exit;
}

while ($Rs->NextRow()) {
    $data = array(
        "seq" => $Rs->Col("seq"),
        "ranking_school_sc" => $Rs->Col("ranking_school_sc"),
        "ranking_ap_sn" => $Rs->Col("ranking_ap_sn"),
        "ranking_score" => $Rs->Col("ranking_score"),
    );

    $ranking[] = $data;
}

if (count($ranking) < 99) {
    echo json_encode($ret, JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(['code' => 403, 'error' => '횟수가 초과되었습니다.'], JSON_UNESCAPED_UNICODE);
}
?>
