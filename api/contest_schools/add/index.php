<?
$HOME_DIR = "../../";
include $HOME_DIR . "_include/_db.php";
include $HOME_DIR . "_include/_code.php";
?>

<?
$contest_id = $_POST["contest_id"];
$school_ids = $_POST["school_ids"];


if(!isset($contest_id) || !isset($school_ids)) {
    if (!isset($contest_id)) {
        $missing_param = "contest_id";
    } else {
        $missing_param = "school_ids";
    }

    $ret = array("code" => ERR_PARAMS_EMPTY, "message" => "Parameter '{$missing_param}' not set");

    echo json_encode($ret);
    exit;
}

CreateDbCon();

$Rs = CreateRecordset();
$ret = array("code" => SUCCESS, "message" => "OK");

foreach ($school_ids as $school_id) { 
    $sql = "INSERT INTO contest_schools";
    $sql .= " (contest_id, school_id) VALUES";
    $sql .= " ('" . $contest_id . "','" . $school_id . "')";

    $Rs = OpenRecordset($Rs, $sql);
}

echo json_encode($ret);

DestroyDbCon();
?>
