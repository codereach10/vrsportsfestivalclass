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

$ranking = array();
$school_content_counters = array(); // Initialize an array to hold counters for each school and content

// Fetch all relevant data
$sql = "SELECT r.ranking_school_sc, r.ranking_ap_sn, r.ranking_score AS score, r.ranking_video_name, r.seq, r.created_at, r.status, si.school_name, si.school_group, gi.ap_name
        FROM ranking r
        LEFT JOIN school_info si ON r.ranking_school_sc = si.school_sc_code
        LEFT JOIN content_info gi ON r.ranking_ap_sn = gi.ap_sn
        ORDER BY r.created_at ASC";

$Rs = OpenRecordset($Rs, $sql);

while ($Rs->NextRow()) {
    $school_sc = $Rs->Col("ranking_school_sc");
    $content_sn = $Rs->Col("ranking_ap_sn");

    // Initialize the counter for the school and content if it doesn't exist
    if (!isset($school_content_counters[$school_sc])) {
        $school_content_counters[$school_sc] = array();
    }
    if (!isset($school_content_counters[$school_sc][$content_sn])) {
        $school_content_counters[$school_sc][$content_sn] = 0;
    }

    $data = array(
        "seq" => $Rs->Col("seq"),
        "ranking_school_sc" => $Rs->Col("ranking_school_sc"),
        "ranking_ap_sn" => $Rs->Col("ranking_ap_sn"),
        "ranking_score" => $Rs->Col("score"),
        "ranking_video" => $Rs->Col("ranking_video_name"),
        "school_name" => $Rs->Col("school_name"),
        "school_group" => $Rs->Col("school_group"),
        "ap_name" => $Rs->Col("ap_name"),
        "status" => $Rs->Col("status"),
        "created_at" => $Rs->Col("created_at"),
       
    );

    $ranking[] = $data;

    // Increment the counter for the school and content
    $school_content_counters[$school_sc][$content_sn]++;
}

$ret["ranking"] = $ranking;
$ret["count"] = $school_content_counters;
// Output JSON response
echo json_encode($ret);

// Clean up resources
$Rs = DestroyRecordset($Rs);
DestroyDbCon();
?>
