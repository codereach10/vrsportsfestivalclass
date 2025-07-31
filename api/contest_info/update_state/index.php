<?
//- 파일명 : vrsportsfestival/api/contest_info/update_state/index.php
//- 파일설명 : contest_info
?>

<?
$HOME_DIR = "../../";
include $HOME_DIR . "_include/_db.php";
include $HOME_DIR . "_include/_code.php";
?>

<?
$contest_id = $_POST['contest_id'];

$contest_state = $_POST['contest_state'];

if (!isset($contest_id) || !isset($contest_state)) {
	$ret = array("code" => ERR_PARAMS_EMPTY, "message" => "Parameter does not exist.");
	echo json_encode($ret);
	exit;
}



?>

<?
CreateDbCon();

$Rs = CreateRecordset();
$ret = array("code" => SUCCESS, "message" => "OK");
$current_date = date("Y-m-d H:m:s");

$sql = "UPDATE contest_info SET contest_state='" . $contest_state . "', updated_at='" . $current_date . "' WHERE contest_id = $contest_id;";

$Rs = OpenRecordset($Rs, $sql);

echo json_encode($ret);
DestroyDbCon();
?>