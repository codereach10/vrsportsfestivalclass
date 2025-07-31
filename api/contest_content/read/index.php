<?
//- 파일명 : vrsportsfestival/api/contest_content/read/index.php
//- 파일설명 : contest_content

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
?>

<?
$HOME_DIR = "../../";
include $HOME_DIR . "_include/_db.php";
include $HOME_DIR . "_include/_code.php";
?>

<?
CreateDbCon();
$Rs = CreateRecordset();

$ret = array("code" => SUCCESS, "message" => "OK");

$content = array();

$sql = "SELECT * FROM contest_content";
$Rs = OpenRecordset($Rs, $sql);
 


while ($Rs->NextRow()) {
	$data = array();

	$data[contest_id] = $Rs->Col('contest_id');
	$data[ap_sn] = $Rs->Col('ap_sn');
	$data[ap_age] = $Rs->Col('ap_age');
	$data[ap_limit_cnt] = $Rs->Col('ap_limit_cnt');
	$data[ap_current_cnt] = $Rs->Col('ap_current_cnt');

	array_push($content, $data);
}

$ret[content] = $content;

echo json_encode($ret);

$Rs = DestroyRecordset($Rs);
DestroyDbCon();
?>