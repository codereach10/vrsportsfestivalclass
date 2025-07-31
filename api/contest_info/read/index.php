<?
//- 파일명 : vrsportsfestival/api/contest_info/read/index.php
//- 파일설명 : contest_info
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


$contest = array();

$sql = "SELECT * FROM contest_info order by contest_id desc";
$Rs = OpenRecordset($Rs, $sql);

while ($Rs->NextRow()) {
	$data = array();

	$data['contest_id'] = $Rs->Col("contest_id");
	$data['contest_cnt'] = $Rs->Col("contest_cnt");
	$data['contest_name'] = $Rs->Col("contest_name");
	$data['register_start'] = strtotime($Rs->Col("register_start"));
	$data['register_end'] = strtotime($Rs->Col("register_end"));
	$data['kickoff_start'] = strtotime($Rs->Col("kickoff_start"));
	$data['kickoff_end'] = strtotime($Rs->Col("kickoff_end"));
	$data['banner_small'] = $Rs->Col("banner_small");
	$data['banner_mid'] = $Rs->Col("banner_mid");
	$data['banner_large'] = $Rs->Col("banner_large");
	$data['terms_info'] = $Rs->Col("terms_info");
	$data['contest_state'] = $Rs->Col("contest_state");

	array_push($contest, $data);
}

$ret['contest'] = $contest;
echo json_encode($ret);

$Rs = DestroyRecordset($Rs);
DestroyDbCon();
?>