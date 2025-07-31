<?php
// Set the base directory
$HOME_DIR = "../../";

// Include necessary files
include $HOME_DIR . "_include/_db.php";
include $HOME_DIR . "_include/_code.php";

$ranking_school_sc = $_POST['ranking_school_sc'];
$ranking_ap_sn = $_POST['ranking_ap_sn'];
// Establish database connection
CreateDbCon();
$Rs = CreateRecordset();

$ret = array("code" => SUCCESS, "message" => "OK");

// Fetch all relevant data
$sql = "SELECT COUNT(*) AS count
        FROM ranking
        WHERE ranking_school_sc = '$ranking_school_sc'
        AND ranking_ap_sn = '$ranking_ap_sn'";

$Rs = OpenRecordset($Rs, $sql);

$ret["count"] = $Rs->Col("count");


// Output JSON response
echo json_encode($ret);

// Clean up resources
$Rs = DestroyRecordset($Rs);
DestroyDbCon();
?>
