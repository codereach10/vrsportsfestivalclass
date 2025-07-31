<?
	//- 파일명 : vrsportsfestival/api/contest_content/read_single/index.php
	//- 파일설명 : contest_content
?>
<?
	$HOME_DIR = "../../";
	include $HOME_DIR."_include/_db.php";
	include $HOME_DIR."_include/_code.php";
?> 
<?
$contest_id = $_POST['contest_id'];
?>

<?
	CreateDbCon();
	$Rs = CreateRecordset();

	$ret = array ("code" => SUCCESS, "message"=>"OK");
	
	$content = array();
	
	$sql = "SELECT * FROM contest_content WHERE contest_id = $contest_id";
	$Rs = OpenRecordset($Rs, $sql);
	
	while ($Rs->NextRow()) {
		$data = array();
		
		$data[contest_id] = $Rs->Col('contest_id');
		$data[ap_sn] = $Rs->Col('ap_sn');
		$data[ap_age] = $Rs -> Col('ap_age');
		$data[ap_limit_cnt] = $Rs -> Col('ap_limit_cnt');
		$data[ap_current_cnt] = $Rs ->Col('ap_current_cnt');
		
		array_push($content, $data);
	}

	$ret[content] = $content;

	echo json_encode($ret);
		
	$Rs = DestroyRecordset($Rs);
	DestroyDbCon();
?>