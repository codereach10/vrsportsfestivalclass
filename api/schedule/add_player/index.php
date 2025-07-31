<?
$HOME_DIR = "../../";
include $HOME_DIR . "_include/_db.php";
include $HOME_DIR . "_include/_code.php";
?>

<?

$gs_uid = $_POST['gs_uid'];
$gs_pid1 = $_POST['gs_pid1'];
$gs_pid2 = $_POST['gs_pid2'];
$gs_pid3 = $_POST['gs_pid3'] !== '' ? $_POST['gs_pid3'] : null;
$gs_pid4 = $_POST['gs_pid4'] !== '' ? $_POST['gs_pid4'] : null;



if (!isset($gs_pid1) || !isset($gs_pid2)) {
    $ret = array("code" => ERR_PARAMS_EMPTY, "message" => "Parameter does not exist.");
    echo json_encode($ret);
    exit;
}

?>
<?
CreateDbCon();

$Rs = CreateRecordset();
$ret = array("code" => SUCCESS, "message" => "OK");

$sql = "UPDATE gameschedule SET gs_pid1='".$gs_pid1."', gs_pid2='".$gs_pid2."', gs_pid3=".($gs_pid3 === null ? "NULL" : "'".$gs_pid3."'").", gs_pid4=".($gs_pid4 === null ? "NULL" : "'".$gs_pid4."'")." WHERE gs_uid='".$gs_uid."'";

$Rs = OpenRecordset($Rs, $sql);

echo json_encode($ret);

DestroyDbCon();
?>
