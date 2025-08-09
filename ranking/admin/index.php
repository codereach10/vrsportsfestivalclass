<?php
// File name:
// File description:
?>
<?php
$HOME_DIR = "../../";
include $HOME_DIR . "_include/_session.php";
?>

<?php
/*
function parse_env($file_path) {
    $vars = [];
    $lines = file($file_path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);


    foreach ($lines as $line) {
        
        list($key, $value) = explode('=', $line, 2);
		
        $vars[$key] = trim($value);
    }
	
    return $vars;
}

/$env_file = __DIR__ . '/../config/.env';

$env_vars = parse_env($env_file);

$AWS_ACCESS_KEY_ID = isset($env_vars['AWS_ACCESS_KEY_ID ']) ? trim($env_vars['AWS_ACCESS_KEY_ID ']) : null;
$AWS_SECRET_KEY = isset($env_vars['AWS_SECRET_KEY ']) ? trim($env_vars['AWS_SECRET_KEY ']) : null;
$AWS_REGION = isset($env_vars['AWS_REGION ']) ? trim($env_vars['AWS_REGION ']) : null;

*/
?>
<!DOCTYPE html>
<html lang="kr">
<head>
	<meta charset="utf-8">
	<link rel="icon" href="favicon.ico">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="theme-color" content="#000000">
	<title>VRSports 2025 Ranking</title>
	<script type="text/javascript" src="../../inc/jquery-1.11.0.min.js"></script>
	<script type="text/javascript" src="../../inc/babel-7.0.0-beta.3.min.js"></script>
	<script type="text/javascript" src="../../inc/react-15.6.2.min.js"></script>
	<script type="text/javascript" src="../../inc/react-dom-15.6.1.min.js"></script>
	<script type="text/javascript" src="../../inc/gsap.min.js"></script>
	<script type="text/javascript" src="../../inc/wstyle-0.3.1.js"></script>
	<script type="text/babel" src="../App.jsx"></script>
	
	<script>


</script>
	
	<style type="text/css">
		@font-face {
			font-family: "SUIT-Bold";
			src: url(./font/SUIT/SUIT-Bold.otf);
		}
		@font-face {
			font-family: "SUIT-Medium";
			src: url(./font/SUIT/SUIT-Medium.otf);
		}
		@font-face {
			font-family: "GangWonEdu";
			src: url(./font/GangwonEduExtraBold.otf);
		}
		@font-face {
			font-family: "SUIT-Regular";
			src: url(./font/SUIT/SUIT-Regular.otf);
		}
		@font-face {
			font-family: "SUIT-Light";
			src: url(./font/SUIT/SUIT-Light.otf);
		}
	</style>
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
	const path = window.location.pathname;


	let startReactDOM = () => {
    
	<?php if ($_ISLOGIN) { ?>
	 //ReactDOM.render(<App path ={path} isLoggedIn = {true} awsAccessKeyId={AWS_ACCESS_KEY_ID}
                //awsSecretKey={AWS_SECRET_KEY}
                //awsRegion={AWS_REGION}/>, document.getElementById('root'));
		ReactDOM.render(<App path ={path} isLoggedIn = {true} /> , document.getElementById('root'));	
    <?php } else { ?>
		
	//ReactDOM.render(<App path ={path} isLoggedIn = {false} awsAccessKeyId={AWS_ACCESS_KEY_ID}
                //awsSecretKey={AWS_SECRET_KEY}
                //awsRegion={AWS_REGION}/>, document.getElementById('root'));
		ReactDOM.render(<App path ={path} isLoggedIn = {false} />, document.getElementById('root'));		
		
	<?php
	} ?>
  };

  if (!window.startReactDOM)
    window.startReactDOM = startReactDOM;
  else
    startReactDOM();

	</script>
</html>
