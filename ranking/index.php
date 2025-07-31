<?php
// File name:
// File description:
?>
<?php
$HOME_DIR = "../";
?>

<!DOCTYPE html>
<html lang="kr">
<head>
	<meta charset="utf-8">
	<link rel="icon" href="favicon.ico">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="theme-color" content="#000000">
	<title>VRSports 2024 Ranking</title>
	<script type="text/javascript" src="../inc/jquery-1.11.0.min.js"></script>
	<script type="text/javascript" src="../inc/babel-7.0.0-beta.3.min.js"></script>
	<script type="text/javascript" src="../inc/react-15.6.2.min.js"></script>
	<script type="text/javascript" src="../inc/react-dom-15.6.1.min.js"></script>
	<script type="text/javascript" src="../inc/gsap.min.js"></script>
	<script type="text/javascript" src="../inc/wstyle-0.3.1.js"></script>
	<script type="text/javascript" src="../inc/aws-sdk-2.1654.0.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js" integrity="sha512-a+SUDuwNzXDvz4XrIcXHuCf089/iJAoN4lmrXJg18XnduKK6YlDHNRalv4yd1N40OKI80tFidF+rqTFKGPoWFQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>	<script type="text/babel" src="App.jsx"></script>

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


		@media only screen and (max-width: 768px) {

			
			#ranking-main{
				overflow-x: hidden !important;
				overflow-y: auto;
			}
			.side-menu {
				flex-direction: column;
				justify-content: center;
				align-items: center;	
				gap:0px !important;
			
			}

			.side-menu-item {
				margin: -20px !important;
				padding: 0px !important;
			
			
			}

			.ranking-alert {
				height: 150px !important;
				background-image: none !important;
				background-color: rgba(4,32,120,255);
				font-size: 10px;
				padding-top: 10px;
		
			}

		
			.ranking-header {
				font-size: 10px !important;
			}
			.ranking-body
			{
				transform: scale(0.5);
				transform-origin: top;
			
			}
			


		
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
		ReactDOM.render(<App path ={path} />, document.getElementById('root'));
	</script>
</html>
