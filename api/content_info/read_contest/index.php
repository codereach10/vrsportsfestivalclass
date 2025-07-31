<?php
$HOME_DIR = "../../";
include $HOME_DIR . "_include/_db.php";
include $HOME_DIR . "_include/_code.php";


$contest_id = $_POST['contest_id'];

CreateDbCon();
$Rs = CreateRecordset();

$ret = array("code" => SUCCESS, "message" => "OK");
$matches = array();


    $sql = "SELECT gs.*, 
    st1.school_name AS pid1_name, 
    st2.school_name AS pid2_name, 
    sh.school_name AS host_name, 
    ct.ap_name
FROM gameschedule gs
JOIN school_info st1 ON gs.gs_pid1 = st1.school_pid
JOIN school_info st2 ON gs.gs_pid2 = st2.school_pid
JOIN school_info sh ON gs.gs_scCode = sh.school_sc_code
JOIN content_info ct ON gs.gs_apSn = ct.parent_ap_sn
WHERE gs.gs_contestID ='$contest_id'";

    $Rs = OpenRecordset($Rs, $sql);

    while ($Rs->NextRow()) {
        $data = array();
        $data['gs_uid'] = $Rs->Col('gs_uid');
        $data['ap_name'] = $Rs->Col('ap_name');
        $data['gs_name'] = $Rs->Col('gs_name');
        $data['gs_datetime_start'] = $Rs->Col('gs_datetime_start');
        $data['pid1_name'] = $Rs->Col('pid1_name');
        $data['pid2_name'] = $Rs->Col('pid2_name');
        $data['host_name'] = $Rs->Col('host_name');
        $data['gs_state'] = $Rs->Col('gs_state');
        
        array_push($matches, $data);
    }

    $ret['matches'] = $matches;

echo json_encode($ret);

$Rs = DestroyRecordset($Rs);
DestroyDbCon();
?>

