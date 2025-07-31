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
?>
<?
CreateDbCon();

$Rs = CreateRecordset();
$ret = array("code"=> SUCCESS, "message" => "OK");

$sql ="INSERT INTO school_info";
$sql .=" (school_host, school_sc_code, school_name) VALUES";
$sql .=" ('".$school_host."','".$school_sc_code."','".$school_name."')";

$Rs = OpenRecordset($Rs, $sql);
echo json_encode($ret);

DestroyDbCon();
?>