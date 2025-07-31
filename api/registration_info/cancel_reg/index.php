<?
//- 파일명 : vrsportsfestival/api/
//- 파일설명 : ...

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
?>

<?
$HOME_DIR = "../../";
include $HOME_DIR . "_include/_db.php";
include $HOME_DIR . "_include/_code.php";
?>

<?
$sc_code = $_POST['sc_code'];
$ap_sn = $_POST['ap_sn'];
?>

<?
CreateDbCon();
$ret = array("code" => SUCCESS, "message" => "OK");

$sql = "UPDATE registration_info SET is_register = 0, is_roster=0, is_rules=0 WHERE sc_code ='$sc_code' AND ap_sn='$ap_sn'";
$sql1 = "UPDATE contest_content SET ap_current_cnt = ap_current_cnt-1 WHERE ap_sn ='$ap_sn'";

$Rs = OpenRecordset($Rs, $sql);
$Rs = OpenRecordset($Rs, $sql1);

echo json_encode($ret);

$Rs = DestroyRecordset($Rs);
DestroyDbCon();
?>