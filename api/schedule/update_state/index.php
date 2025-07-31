<?
//- 파일명 : vrsportsfestival/api/
//- 파일설명 : ...

?>

<?
$HOME_DIR = "../../";
include $HOME_DIR . "_include/_db.php";
include $HOME_DIR . "_include/_code.php";
?>

<?
$gs_uid = $_POST['gs_uid'];
$gs_state = $_POST['gs_state'];

?>

<?
CreateDbCon();
$ret = array("code" => SUCCESS, "message" => "OK");

$sql = "UPDATE gameschedule SET gs_state = $gs_state, gs_roomID = null, gs_roomPW = null WHERE gs_uid = '" . $gs_uid . "'";


$Rs = OpenRecordset($Rs, $sql);

echo json_encode($ret);

$Rs = DestroyRecordset($Rs);
DestroyDbCon();
?>