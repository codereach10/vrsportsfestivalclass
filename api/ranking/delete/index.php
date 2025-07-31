<?php
$HOME_DIR = "../../";
include $HOME_DIR . "_include/_db.php";
include $HOME_DIR . "_include/_code.php";
?>
<?php
$seq = $_POST['seq'];
if ($seq) {
   

    CreateDbCon();
    $Rs = CreateRecordset();

    $ret = array("code" => SUCCESS, "message" => "OK") ;

    if ($seq) {
        $sql = "DELETE FROM ranking WHERE seq = '" . $seq . "'";
        $Rs = OpenRecordset($Rs, $sql);
    }

    echo json_encode($ret);

    $Rs = DestroyRecordset($Rs);
    DestroyDbCon();
} else {
   
    $ret = array("code" => ERROR, "message" => "seq parameter is missing or empty");
    echo json_encode($ret);
}
?>
