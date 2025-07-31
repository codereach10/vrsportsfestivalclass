<?php
$HOME_DIR = "../../";
include $HOME_DIR . "_include/_db.php";
include $HOME_DIR . "_include/_code.php";


$contest_id = $_POST['contest_id'];

CreateDbCon();
$Rs = CreateRecordset();

$ret = array("code" => SUCCESS, "message" => "OK");
$school = array();


    $sql = "SELECT cs.*, st.school_name, st.school_sc_code, st.school_host
            FROM contest_schools cs
            JOIN school_info st ON cs.school_id = st.school_pid
            WHERE cs.contest_id = '$contest_id'";
    $Rs = OpenRecordset($Rs, $sql);

    while ($Rs->NextRow()) {
        $data = array();
        $data['seq'] = $Rs->Col('seq');
        $data['host']= $Rs->Col('school_host');
        $data['contest_id'] = $Rs->Col('contest_id');
        $data['school_id'] = $Rs->Col('school_id');
        $data['school_name'] = $Rs->Col('school_name');
    $data["school_sc_code"] = $Rs->Col('school_sc_code');
        array_push($school, $data);
    }

    $ret['school'] = $school;

echo json_encode($ret);

$Rs = DestroyRecordset($Rs);
DestroyDbCon();
?>
