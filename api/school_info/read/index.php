<?
//- 파일명 : vrsportsfestival/api/school_info/read/index.php
//- 파일설명 : school_info
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

$school = array();

$sql = "SELECT * FROM school_info";
$Rs = OpenRecordset($Rs, $sql);

while ($Rs->NextRow()) {
    $data = array();

    $data[school_pid] = $Rs->Col('school_pid');
    $data[school_host] = $Rs->Col('school_host');
    $data[school_sc_code] = $Rs->Col('school_sc_code');
    $data[school_name] = $Rs->Col('school_name');

    array_push($school, $data);
}

$ret[school] = $school;


echo json_encode($ret);

$Rs = DestroyRecordset($Rs);
DestroyDbCon();
?>