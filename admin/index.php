<?php

$HOME_DIR = "./";
include $HOME_DIR . "_include/_session.php";

?>



<!doctype html>
<html lang="kr">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport"
    content="width=device-width, initial-scale=1, user-scalable=0, minimum-scale=1, maximum-scale=1" />
  <meta name="description" content="VRSportsFestival" />
  <title>VRSportsFestival</title>
  <script type="text/javascript" src="/inc/jquery-1.11.0.min.js"></script>
  <script type="text/javascript" src="/inc/babel-7.0.0-beta.3.min.js"></script>
  <script type="text/javascript" src="/inc/react-15.6.2.min.js"></script>
  <script type="text/javascript" src="/inc/react-dom-15.6.1.min.js"></script>
  <script type="text/javascript" src="/inc/gsap.min.js"></script>
  <script type="text/javascript" src="/inc/wstyle-0.3.1.js"></script>
  <script type="text/babel" src="./App.jsx"></script>
  <script type="text/babel" src="./Main.jsx"></script>
  <!-- pages-->
  <script type="text/babel" src="./admin/contestAdmin.jsx"></script>
  <script type="text/babel" src="./admin/schoolAdmin.jsx"></script>
  <script type="text/babel" src="./admin/matchAdmin.jsx"></script>
  <script type="text/babel" src="./admin/contentAdmin.jsx"></script>
  <script type="text/babel" src="./admin/rankingAdmin.jsx"></script>
  <script type="text/babel" src="./admin/contestDetailsAdmin.jsx"></script>
  <script type="text/babel" src="./admin/admin.jsx"></script>
  <!-- components -->
  <script type="text/babel" src="./admin/components/menuItem.jsx"></script>
  <script type="text/babel" src="./admin/components/sideMenu.jsx"></script>
  <script type="text/babel" src="./admin/components/dataTable.jsx"></script>
  <script type="text/babel" src="./admin/components/header.jsx"></script>
  <script type="text/babel" src="./admin/components/toast.jsx"></script>
  <script type="text/babel" src="./admin/components/deleteConfirmationPopup.jsx"></script>
  <script type="text/babel" src="./admin/components/customDropdown.jsx"></script>
  <!-- utils -->
  <script type="text/babel" src="./admin/utils/request.js"></script>
  <!-- fonts -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap">
  <link href="https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap" rel="stylesheet">




<style type="text/wcss">
  html, body {
  box-sizing:border-box;
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

<body>
  <div id="root"></div>
</body>

<script type="text/babel">
  let startReactDOM = () => {
    <? 
      if ($_ISLOGIN & $_SESSION["user_role"] == "master") { ?>
      ReactDOM.render(<Main onclose={() => window.backHistory()} />, document.getElementById('root'));
    <? } else { ?>
      ReactDOM.render(<App />, document.getElementById('root')); 
    <? } ?>
  };

  if (!window.startReactDOM)
    window.startReactDOM = startReactDOM;
  else
    startReactDOM();
</script>

</html>
