<?
	//- 파일명 : vrsportsfestival/api/contest_content/create/index.php
	//- 파일설명 : contest_content
?>

<?
	$HOME_DIR = "../../";
	include $HOME_DIR."_include/_db.php";
	include $HOME_DIR."_include/_code.php";
?> 

<? 
$contest_id = $_POST['contest_id'];
$ap_sn = $_POST['ap_sn'];
$ap_age = $_POST['ap_age'];
$ap_limit_cnt = $_POST['ap_limit_cnt'];
$ap_current_cnt = $_POST['ap_current_cnt'];

?> 

<?
CreateDbCon();

$Rs = CreateRecordset();

$ret = array("code"=> SUCCESS, "message" => "OK"); 
$sql = "INSERT INTO contest_content";
$sql .=" (contest_id, ap_sn, ap_age, ap_limit_cnt, ap_current_cnt) VALUES";
$sql .=" ('".$contest_id."', '".$ap_sn."','".$ap_age."', '".$ap_limit_cnt."', '".$ap_current_cnt."')";

$Rs = OpenRecordset($Rs, $sql);
echo json_encode($ret);

DestroyDbCon();
?>