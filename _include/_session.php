<?
//- 파일명 : _include/_session.php
//- 파일설명 : 

?><?
session_start();


//////////////////////////////////////////////////////////
// login check
$_ISLOGIN = FALSE;
if ( isset($_SESSION["user_name"]) )
{
	$_ISLOGIN = TRUE;
}
else
{
	// label 출력후 로그오프되는 버그로 session_destroy() 안함.
	session_destroy();
}

?>
