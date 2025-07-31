<?
session_start();

$_SESSION = array();

session_destroy();
echo json_encode(array("code" => 0, "message" => "OK"));
?>