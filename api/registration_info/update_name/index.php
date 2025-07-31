<?

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
$team_name = $_POST["team_name"];
if (!isset($sc_code) || !isset($ap_sn) || !isset($team_name)) {
    $ret = array("code" => ERR_PARAMS_EMPTY, "msg" => "not enough params");
    echo json_encode($ret);
    exit;
}
?>
<?
CreateDbCon();
$Rs = CreateRecordset();

$team = array();
$ret = array("code" => SUCCESS, "message" => "OK");

$sql = "UPDATE registration_info SET team_name= '$team_name' WHERE sc_code ='$sc_code' AND ap_sn='$ap_sn'";

$Rs = OpenRecordset($Rs, $sql);

echo json_encode($ret);

$Rs = DestroyRecordset($Rs);
DestroyDbCon();

?>