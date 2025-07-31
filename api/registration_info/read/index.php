<?
//- 파일명 : vrsportsfestival/api/registration_info/read
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
$sc_code = $_POST["sc_code"];
?>
<?
CreateDbCon();

$Rs = CreateRecordset();
$ret = array("code" => SUCCESS, "message" => "OK");

$register = array();
$sql = "SELECT * FROM registration_info WHERE sc_code = $sc_code";

$Rs = OpenRecordset($Rs, $sql);

while ($Rs->NextRow()) {
    $data = array();

    $data[team_id] = $Rs->Col("team_id");
    $data[sc_code] = $Rs->Col("sc_code");
    $data[match_id] = $Rs->Col("match_id");
    $data[ap_sn] = $Rs->Col("ap_sn");
    $data[team_name] = $Rs->Col("team_name");
    $data[is_register] = $Rs->Col("is_register");
    $data[is_roster] = $Rs->Col("is_roster");

    array_push($register, $data);
}

$ret[register] = $register;

echo json_encode($ret);
$Rs = DestroyRecordset($Rs);
DestroyDbCon();
?>