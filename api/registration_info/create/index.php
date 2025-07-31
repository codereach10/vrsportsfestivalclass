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
$match_id = $_POST["match_id"];
$ap_sn = $_POST['ap_sn'];
$team_name = $_POST['team_name']
    ?>

<?
CreateDbCon();
$ret = array("code" => SUCCESS, "message" => "OK");

$check_sql = "SELECT * FROM registration_info WHERE ap_sn='" . $ap_sn . "' AND sc_code='" . $sc_code . "'";
$check_query = mysqli_query($DbCon, $check_sql);
$check_num_rows = mysqli_num_rows($check_query);


if ($check_num_rows > 0) {
    $sql = "UPDATE registration_info SET is_register=1 WHERE ap_sn='" . $ap_sn . "' AND sc_code='" . $sc_code . "'";
} else {
    $sql = "INSERT INTO registration_info";
    $sql .= " (sc_code, ap_sn, team_name, is_register, is_roster) VALUES";
    $sql .= " ('" . $sc_code . "','" . $ap_sn . "','" . $team_name . "',1,0)";
}

$Rs = OpenRecordset($Rs, $sql);

echo json_encode($ret);

$Rs = DestroyRecordset($Rs);
DestroyDbCon();
?>