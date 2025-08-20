<?php
$HOME_DIR = "../../";
include $HOME_DIR . "_include/_db.php";
include $HOME_DIR . "_include/_code.php";
?>

<?php
$gs_uid = $_POST["gs_uid"];

if(!isset($gs_uid)) {
    $ret = array("code" => ERR_PARAMS_EMPTY, "message" => "Parameters not set ");
    echo json_encode($ret);
    exit;
}

CreateDbCon();


    $Rs = CreateRecordset();
    $ret = array("code" => SUCCESS, "message" => "OK");


    $sql = "DELETE FROM gameschedule ";
    $sql .= " WHERE gs_uid = '" . $gs_uid . "'";

    $Rs = OpenRecordset($Rs, $sql);


echo json_encode($ret);

DestroyDbCon();
?>
