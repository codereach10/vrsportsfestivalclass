<?
//- 파일명 : vrsportsfestival/api/content_info/read_single/index.php
//- 파일설명 : content_info
?>

<?
$HOME_DIR = "../../";
include $HOME_DIR . "_include/_db.php";
include $HOME_DIR . "_include/_code.php";
?>
<?
$ap_sn = $_POST["ap_sn"]
?>

<?
CreateDbCon();

$Rs = CreateRecordset();

$ret = array("code" => SUCCESS, "message" => "OK");
$sql = "SELECT * FROM content_info WHERE ap_sn='" . $ap_sn . "'";
$content = array();

$Rs = OpenRecordset($Rs, $sql);

while ($Rs->NextRow()) {
    $data = array();
    $data['ap_sn'] = $Rs->Col('ap_sn');
    $data['parent_ap_sn'] = $Rs->Col('parent_ap_sn');
    $data['ap_name'] = $Rs->Col('ap_name');
    $data['ap_intro'] = $Rs->Col('ap_intro');
    $data['ap_guide'] = $Rs->Col('ap_guide');
    $data['ap_rule'] = $Rs->Col('ap_rule');

    array_push($content, $data);
}

$ret['content'] = $content;


echo json_encode($ret);

DestroyDbCon();
?>