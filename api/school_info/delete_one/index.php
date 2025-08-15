<?php
$HOME_DIR = "../../";
include $HOME_DIR . "_include/_db.php";
include $HOME_DIR . "_include/_code.php";
?>

<?php
$school_pid = $_POST["school_pid"];

if( !isset($school_pid)) {
    $ret = array("code" => ERR_PARAMS_EMPTY, "message" => "Parameters not set ");
    echo json_encode($ret);
    exit;
}

CreateDbCon();

$Rs = CreateRecordset();
$ret = array("code" => SUCCESS, "message" => "OK");


    $sql = "DELETE FROM school_info";
    $sql .= " WHERE school_pid = '" . $school_pid . "'";

    $Rs = OpenRecordset($Rs, $sql);


echo json_encode($ret);

DestroyDbCon();
?>
