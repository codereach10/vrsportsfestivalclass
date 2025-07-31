<?
//- 파일명 : vrsportsfestival/api/schedule/index.php
//- 파일설명 : schedule
?>
<?
$HOME_DIR = "../";
include $HOME_DIR . "_include/_db.php";
?>
<?
CreateDbCon();
$Rs = CreateRecordset();

$ret = array("code" => 0);
date_default_timezone_set('Asia/Seoul');

$schedule = array();
$sql = "SELECT *";
$sql .= ", p1.school_pid AS p1_uid, p1.school_sc_code AS p1_scCode, p1.school_name AS p1_name";
$sql .= ", p2.school_pid AS p2_uid, p2.school_sc_code AS p2_scCode, p2.school_name AS p2_name";
$sql .= ", p3.school_pid AS p3_uid, p3.school_sc_code AS p3_scCode, p3.school_name AS p3_name";
$sql .= ", p4.school_pid AS p4_uid, p4.school_sc_code AS p4_scCode, p4.school_name AS p4_name";
$sql .= " FROM gameschedule";
$sql .= " LEFT JOIN school_info AS p1 ON gs_pid1=p1.school_pid";
$sql .= " LEFT JOIN school_info AS p2 ON gs_pid2=p2.school_pid";
$sql .= " LEFT JOIN school_info AS p3 ON gs_pid3=p3.school_pid";
$sql .= " LEFT JOIN school_info AS p4 ON gs_pid4=p4.school_pid";


$Rs = OpenRecordset($Rs, $sql);
while ($Rs->NextRow()) {
	$data = array();

	$data[uid] = $Rs->Col("gs_uid");
	$data[apSn] = $Rs->Col("gs_apSn");
	$data[host] = $Rs->Col("gs_scCode");
	$data[name] = $Rs->Col("gs_name");
	$data[rounds] = $Rs->Col("gs_round");
	$data[num] = $Rs->Col("gs_num");
	$data[hour] = $Rs->Col("gs_hour");
	$data[play_minutes] = $Rs->Col("gs_playminutes");
	$data[date_start] = strtotime($Rs->Col("gs_datetime_start"));
	$data[date_end] = strtotime($Rs->Col("gs_datetime_end"));
	$data[roomID] = $Rs->Col("gs_roomID");
	$data[roomPW] = $Rs->Col("gs_roomPW");
	$data[state] = $Rs->Col("gs_state");

	$players = array();
	array_push($players, array("uid" => $Rs->Col("p1_uid"), "scCode" => $Rs->Col("p1_scCode"), "name" => $Rs->Col("p1_name")));
	array_push($players, array("uid" => $Rs->Col("p2_uid"), "scCode" => $Rs->Col("p2_scCode"), "name" => $Rs->Col("p2_name")));
	$uid = $Rs->Col("p3_uid");
	if (isset($uid))
		array_push($players, array("uid" => $Rs->Col("p3_uid"), "scCode" => $Rs->Col("p3_scCode"), "name" => $Rs->Col("p3_name")));
	$uid = $Rs->Col("p4_uid");
	if (isset($uid))
		array_push($players, array("uid" => $Rs->Col("p4_uid"), "scCode" => $Rs->Col("p4_scCode"), "name" => $Rs->Col("p4_name")));

	$scCode = $Rs->Col("gs_scCode3");
	if (isset($scCode)) {
		array_push($players, array("scCode" => $scCode));
	}

	$scCode = $Rs->Col("gs_scCode4");
	if (isset($scCode)) {
		array_push($players, array("scCode" => $scCode));
	}

	$data[players] = $players;


	array_push($schedule, $data);
}
$ret[schedule] = $schedule;

echo json_encode($ret);

$Rs = DestroyRecordset($Rs);
DestroyDbCon();
?>