<?php
// File name:
// File description:
?>
<?php
$HOME_DIR = "../../";
include $HOME_DIR . "_include/_session.php";
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<link rel="icon" href="favicon.ico">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="theme-color" content="#000000">
	<title>VRSports 2024 Ranking</title>
	<script type="text/javascript" src="../../inc/jquery-1.11.0.min.js"></script>
	<script type="text/javascript" src="../../inc/babel-7.0.0-beta.3.min.js"></script>
	<script type="text/javascript" src="../../inc/react-15.6.2.min.js"></script>
	<script type="text/javascript" src="../../inc/react-dom-15.6.1.min.js"></script>
	<script type="text/javascript" src="../../inc/gsap.min.js"></script>
	<script type="text/javascript" src="../../inc/wstyle-0.3.1.js"></script>
	<script type="text/babel" src="finish.jsx"></script>
	

	<style type="text/wcss">
		html, body {
			box-sizing: border-box;
		}
		body {
			position: relative;
			margin: 0; padding: 0; border: 0;
			-webkit-user-select: none;
			-webkit-text-size-adjust: none;
			-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
			font-family: 'Inter', sans-serif;
		}
		#root {
			width: 100%;
			border: 0;
		}
	</style>
</head>

<body>
	<div id="root"></div>
</body>


<script type="text/babel">
		ReactDOM.render(<Finish/>, document.getElementById('root'));
	</script>
</html>
