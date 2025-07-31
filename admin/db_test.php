<?
	//- 파일명 : vrsportsfestival/db_test.php
	//- 파일설명 : player
?>
<?
$HOME_DIR = "";
include $HOME_DIR."_include/_db.php";
include $HOME_DIR."_include/_session.php";
?> 
<?
if ($_ISLOGIN) {
	echo "hello";
	exit;
}
/*$scCode = $_POST["scCode"];
if (!isset($scCode)) {
	$ret = array("code"=>1,"msg"=>"not enough params");
	echo json_encode($ret);
	exit;
}*/
?> 
<?
	CreateDbCon();
	$Rs = CreateRecordset();

	$sql = "SELECT * FROM school_info";
	$Rs = OpenRecordset($Rs, $sql);
	while ($Rs->NextRow())
	{
		echo $Rs->Col("school_sc_code");
		echo " ".$Rs->Col("school_name");
		echo " ".$Rs->Col("created_at");
		echo "<br />";
	}
	
	$Rs = DestroyRecordset($Rs);
	DestroyDbCon();
?>
