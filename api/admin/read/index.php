<?php
// Set the base directory
$HOME_DIR = "../../";

// Include necessary files
include $HOME_DIR . "_include/_db.php";
include $HOME_DIR . "_include/_code.php";

// Establish database connection
CreateDbCon();
$Rs = CreateRecordset();

$ret = array("code" => SUCCESS, "message" => "OK");

$admin = array();

$sql = "SELECT * from admin";
$Rs = OpenRecordset($Rs, $sql);

while ($Rs->NextRow()) {
    $data = array();

    $data['seq'] = $Rs->Col('seq');
    $data['id'] = $Rs->Col('id');
    $data['role'] = $Rs->Col('role');

    array_push($admin, $data);
}

$ret["admin"] = $admin;
// Output JSON response
echo json_encode($ret);

// Clean up resources
$Rs = DestroyRecordset($Rs);
DestroyDbCon();
?>
