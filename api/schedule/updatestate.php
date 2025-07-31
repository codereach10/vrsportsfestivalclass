<?
//error_reporting( E_ALL );
//ini_set( "display_errors", 1 );
  
$HOME_DIR = "../";
include $HOME_DIR."_include/_db.php";
?> 
<? 	
$scheduleID = $_POST["scheduleID"];
if (!isset($scheduleID)) {
	$ret = array("code"=>1,"msg"=>"not enough params");
	echo json_encode($ret);
	exit;
}
$state = $_POST["scheduleState"];
?> 
<? 	
	CreateDbCon();
	$Rs = CreateRecordset();	
	
	$schedule = array();
	$sql = "UPDATE gameschedule SET gs_state = '$state' WHERE gs_uid= '$scheduleID'";
	$Rs = OpenRecordset($Rs, $sql);
	if ($Rs->NextRow())
	{
	}
	
	$ret = array("code"=>0, "msg"=>"SUCCESS_UPDATE_STATE: $state");
	echo json_encode($ret);
	
	$Rs = DestroyRecordset($Rs);
	DestroyDbCon();
?>