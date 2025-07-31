<?php
$HOME_DIR = "../../";
include $HOME_DIR . "_include/_db.php";
include $HOME_DIR . "_include/_code.php";
?>

<?php
if (!isset($_POST['updates']) || empty($_POST['updates'])) {
  echo json_encode(array("code" => ERROR, "message" => "No updates received"));
  exit();
}

$updates = $_POST['updates'];

CreateDbCon();
$Rs = CreateRecordset();

$ret = array("code" => SUCCESS, "message" => "OK");

foreach ($updates as $update) {
  $seq = $update["seq"];
  $ranking_score = $update["ranking_score"];

  $update_sql = "UPDATE ranking SET ranking_score = '$ranking_score' WHERE seq = '$seq'";
  $Rs = OpenRecordset($Rs, $update_sql);
}

echo json_encode($ret);

DestroyDbCon();
?>
