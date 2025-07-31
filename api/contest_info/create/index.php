<?
//- 파일명 : vrsportsfestival/api/contest_info/create/index.php
//- 파일설명 : contest_info
?>

<?
$HOME_DIR = "../../";
include $HOME_DIR . "_include/_db.php";
include $HOME_DIR . "_include/_code.php";
?>
<?

$contest_cnt = $_POST['contest_cnt'];
$contest_name = $_POST['contest_name'];
$register_start = $_POST['register_start'];
$register_end = $_POST['register_end'];
$kickoff_start = $_POST['kickoff_start'];
$kickoff_end = $_POST['kickoff_end'];
$banner_small = $_POST['banner_small'];
$banner_mid = $_POST['banner_mid'];
$banner_large = $_POST['banner_large'];

$terms_info = $_POST['terms_info'];
$contest_state = $_POST['contest_state'];


if (!isset($contest_cnt) || !isset($contest_name) || !isset($register_start) || !isset($register_end) || !isset($kickoff_start) || !isset($kickoff_end) || !isset($terms_info)) {
    
    $missing_params = array();
    if (!isset($contest_cnt)) $missing_params[] = "contest_cnt";
    if (!isset($contest_name)) $missing_params[] = "contest_name";
    if (!isset($register_start)) $missing_params[] = "register_start";
    if (!isset($register_end)) $missing_params[] = "register_end";
    if (!isset($kickoff_start)) $missing_params[] = "kickoff_start";
    if (!isset($kickoff_end)) $missing_params[] = "kickoff_end";
    if (!isset($terms_info)) $missing_params[] = "terms_info";

    $ret = array("code" => ERR_PARAMS_EMPTY, "message" => "Parameters not set: " . implode(", ", $missing_params));
    echo json_encode($ret);
    exit;
}

?>
<?
CreateDbCon();

$Rs = CreateRecordset();
$ret = array("code" => SUCCESS, "message" => "OK");

$sql = "INSERT INTO contest_info";
$sql .= " (contest_cnt, contest_name, register_start, register_end, kickoff_start, kickoff_end, banner_small, banner_mid, banner_large, terms_info, contest_state) VALUES";
$sql .= " ('" . $contest_cnt . "','" . $contest_name . "', '" . $register_start . "', '" . $register_end . "', '" . $kickoff_start . "','" . $kickoff_end . "','" . $banner_small . "','" . $banner_mid . "','" . $banner_large . "','" . $terms_info . "', '" . $contest_state . "');";


$Rs = OpenRecordset($Rs, $sql);
echo json_encode($ret);

DestroyDbCon();
?>