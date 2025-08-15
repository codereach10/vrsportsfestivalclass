<?php
$HOME_DIR = "../../";
include $HOME_DIR . "_include/_db.php";
include $HOME_DIR . "_include/_code.php";
?>

<?php
$seq = $_POST["seq"];

if(!isset($seq)) {
    $ret = array("code" => ERR_PARAMS_EMPTY, "message" => "Parameters not set ");
    echo json_encode($ret);
    exit;
}

CreateDbCon();

$sql_check = "SELECT role FROM admin WHERE seq = '" . $seq . "'";
$Rs = OpenRecordset($Rs, $sql_check);
if( $Rs && $Rs->EOF == false) {
    $role = $Rs->Col("role");
}
if($role == 'master') {
    $ret = array("code" => FAILURE, "message" => "마스터 관리자는 삭제할 수 없습니다.");
} else {
    $Rs = CreateRecordset();
    $ret = array("code" => SUCCESS, "message" => "OK");


    $sql = "DELETE FROM admin";
    $sql .= " WHERE seq = '" . $seq . "'";

    $Rs = OpenRecordset($Rs, $sql);

}
echo json_encode($ret);

DestroyDbCon();
?>
