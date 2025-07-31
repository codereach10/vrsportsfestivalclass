<?
//- 파일명 : vrsportsfestival/api/prize_info/read/index.php
//- 파일설명 : contest_info


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
?>
<?
$HOME_DIR = "../../";
include $HOME_DIR . "_include/_db.php";
include $HOME_DIR . "_include/_code.php";
?>

<?
CreateDbCon();
$Rs = CreateRecordset();
$ret = array("code" => SUCCESS, "message" => "OK");


$prizes = array();

$sql = "SELECT * FROM prize_info";
$Rs = OpenRecordset($Rs, $sql);

while ($Rs->NextRow()) {
    $data = array();

    $data['contest_id'] = strtotime($Rs->Col("contest_id"));
    $data['prize_text'] = $Rs->Col("prize_text");
    $data['prize_img'] = $Rs->Col("prize_img");
    array_push($prizes, $data);
}

$ret['prizes'] = $prizes;
echo json_encode($ret);

$Rs = DestroyRecordset($Rs);
DestroyDbCon();
?>