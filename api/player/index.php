<?
//- 파일명 : vrsportsfestival/api/player/index.php
//- 파일설명 : player
?>
<?
$HOME_DIR = "../";
include $HOME_DIR . "_include/_db.php";
?>
<?
$scCode = $_POST["scCode"];
if (!isset($scCode)) {
	$ret = array("code" => 1, "msg" => "not enough params");
	echo json_encode($ret);
	exit;
}
?>
<?
CreateDbCon();

$ret = array("code" => 0, "scCode" => $scCode);

$players = array();
$isHost = false;

$sql = "SELECT * FROM school_info WHERE school_sc_code='$scCode'";
$Rs = OpenRecordset($Rs, $sql);
while ($Rs->NextRow()) {
	$host = $Rs->Col("school_host");
	if ($host == '1' || $isHost) {
		$isHost = true;
	} else {
		array_push($players, array("uid" => $Rs->Col("school_pid"), "name" => $Rs->Col("school_name")));
	}
}

if ($isHost) {
	$ret[type] = 'host';
} else if (count($players) == 0) {
	$ret[type] = 'guest';
} else {
	$ret[type] = 'player';
}

echo json_encode($ret);

$Rs = DestroyRecordset($Rs);
DestroyDbCon();
?>