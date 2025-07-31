<?
	//- 파일명 : vrsportsfestival/api/schedule/room/index.php
	//- 파일설명 : schedule/room/
?>
<?
	$HOME_DIR = "../../";
	include $HOME_DIR."_include/_db.php";
?> 
<? 	
$scheduleID = $_POST["scheduleID"];
if (!isset($scheduleID)) {
	$ret = array("code"=>1,"msg"=>"not enough params");
	echo json_encode($ret);
	exit;
}
$roomID = $_POST["roomID"];
$roomPW = $_POST["roomPW"];
?> 
<? 	
	CreateDbCon();
	$Rs = CreateRecordset();
	
	$ret = array("code"=>0);
	
	$sql = "UPDATE gameschedule SET";
	$sql .= " gs_roomID=";
		$sql .= ((isset($roomID) && $roomID != null) ? $roomID : "NULL");
	$sql .= ", gs_roomPW=";
		$sql .= ((isset($roomPW) && $roomPW != null) ? ("'".$roomPW."'") : "NULL");
	$sql .= " WHERE gs_uid=".$scheduleID;
	$Rs = OpenRecordset($Rs, $sql);
	if ($Rs->NextRow())
	{
	}
	
	//$ret["sql"] = $sql;
	echo json_encode($ret);
	
	$Rs = DestroyRecordset($Rs);
	DestroyDbCon();
?>