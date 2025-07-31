<?
	//- 파일명 : vrsportsfestival/api/content_info/create/index.php
	//- 파일설명 : content_info
?>

<?
	$HOME_DIR = "../../";
	include $HOME_DIR."_include/_db.php";
	include $HOME_DIR."_include/_code.php";
?> 

<?

$ap_sn = $_POST['ap_sn'];
$parent_ap_sn = $_POST['parent_ap_sn'];
$ap_name = $_POST['ap_name'];
$ap_intro = $_POST['ap_intro'];
$ap_guide = $_POST['ap_guide'];
$ap_rule =$_POST['ap_rule'];
?>

<?
 CreateDbCon();

 $Rs = CreateRecordset();

 $ret = array("code"=> SUCCESS, "message" => "OK");
 $sql = "INSERT INTO content_info";
 $sql .=" (ap_sn, parent_ap_sn, ap_name, ap_intro, ap_guide, ap_rule) VALUES";
 $sql .=" ('".$ap_sn."','".$parent_ap_sn."','".$ap_name."','".$ap_intro."', '".$ap_guide."','".$ap_rule."')";
 
 $Rs = OpenRecordset($Rs, $sql);
 echo json_encode($ret);
 
 DestroyDbCon();
?>