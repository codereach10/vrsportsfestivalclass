<?
//- 파일명 : vrsportsfestival/api/schedule/change_date/index.php
//- 파일설명 : schedule
?>

<?
$HOME_DIR = "../../";
include $HOME_DIR . "_include/_db.php";
include $HOME_DIR . "_include/_code.php";
?>

<?

$gs_uid = $_POST['gs_uid'];
$gs_datetime_start = $_POST['gs_datetime_start'];
$gs_datetime_end = $_POST['gs_datetime_end'];

if (!isset($gs_datetime_start) || !isset($gs_datetime_end)) {
    $ret = array("code" => ERR_PARAMS_EMPTY, "message" => "Parameter does not exist.");
    echo json_encode($ret);
    exit;
}

?>

<?
CreateDbCon();

$Rs = CreateRecordset();
$ret = array("code" => SUCCESS, "message" => "OK");


$sql = "UPDATE gameschedule SET gs_datetime_start='" . $gs_datetime_start . "',  gs_datetime_end='" . $gs_datetime_end . "' WHERE gs_uid = $gs_uid;";

$Rs = OpenRecordset($Rs, $sql);

echo json_encode($ret);
DestroyDbCon();
?>