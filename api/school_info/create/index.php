<?
	//- 파일명 : vrsportsfestival/api/school_info/create
	//- 파일설명 : school_info
?>

<?
	$HOME_DIR = "../../";
	include $HOME_DIR."_include/_db.php";
	include $HOME_DIR."_include/_code.php";
?> 

<?
	$school_host = $_POST["school_host"];
	$school_sc_code = $_POST["school_sc_code"];
	$school_name = $_POST["school_name"];
	header('Content-Type: application/json; charset=utf-8');
	if( !isset($school_sc_code) || !isset($school_name) ) {
		$ret = array("code" => ERR_PARAMS_EMPTY, "message" => "Parameters not set ");
		echo json_encode($ret);
		exit;
	}
?>
<?
CreateDbCon();

$Rs = CreateRecordset();
$ret = array("code"=> SUCCESS, "message" => "OK");

// 1. 중복 확인 (Prepared Statement 사용)
$sql_check = "SELECT COUNT(*) as cnt FROM school_info WHERE school_sc_code = '".$school_sc_code."'";
$Rs = OpenRecordset($Rs, $sql_check);
// Fetch the count
$count = 0;

$count = (int)$Rs->Col('cnt');

// 2. 개수(count)에 따른 분기 처리
if ($count > 0) {
    // 이미 코드가 존재하는 경우
    $ret = ["code" => FAILURE , "message" => "이미 사용 중인 학교 코드입니다."];
} else {
	$sql ="INSERT INTO school_info";
	$sql .=" (school_host, school_sc_code, school_name) VALUES";
	$sql .=" ('".$school_host."','".$school_sc_code."','".$school_name."')";

	$Rs = OpenRecordset($Rs, $sql);
	
}
echo json_encode($ret);
DestroyDbCon();
?>