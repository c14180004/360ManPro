<?php
require_once "connect.php";

$id = 0;
$nama = $username = $password = "";
$nama_err = $username_err = $password_err = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
	if (empty($_POST["nama"])) {
		$nama_err = "Name is required";
	} 
	else {
		$nama = test_input($_POST["nama"]);
		if (!preg_match("/^[a-zA-Z ]*$/", $nama)) {
			$nama_err = "Only letters and white space allowed";
		}
	}
	if (empty($_POST["username"])) {
		$username_err = "Name is required";
	} 
	else {
		$username = test_input($_POST["username"]);
		if (!preg_match("/^[a-zA-Z ]*$/", $username)) {
			$username_err = "Only letters and white space allowed";
		}
	}
	if (empty($_POST["password"])) {
		$password_err = "Name is required";
	} 
	else {
		$password = test_input($_POST["password"]);
		if (!preg_match("/^[a-zA-Z ]*$/", $password)) {
			$password_err = "Only letters and white space allowed";
		}
	}

	echo $nama_err;
	echo $username_err;
	echo $password_err;
	if(empty($nama_err) && empty($username_err) && empty($password_err)){
		// Prepare a select statement
		$sql = "SELECT Username FROM admin WHERE Username = ?";
		
		if($stmt = mysqli_prepare($conn, $sql)){
			// Bind variables to the prepared statement as parameters
			mysqli_stmt_bind_param($stmt, "s", $username);
			
			
			// Attempt to execute the prepared statement
			if(mysqli_stmt_execute($stmt)){
				/* store result */
				mysqli_stmt_store_result($stmt);
				
				if(mysqli_stmt_num_rows($stmt) == 1){
				  echo "This username is already taken.";
				} else{
					$sql = "INSERT INTO admin VALUES(?,?,?,?)";
					if($stmt=mysqli_prepare($conn,$sql)){
						mysqli_stmt_bind_param($stmt,"isss",$id,$username,$password,$nama);
						$password = password_hash($password,PASSWORD_DEFAULT);
						if(mysqli_stmt_execute($stmt)){
							echo "SUKSES";
						}
						else{
							echo "GAGAL";
						}
					}
				}
			} else{
				echo $password_err;
				echo $username_err;
				echo $nama_err;
			}
	
			// Close statement
			mysqli_stmt_close($stmt);
		}
	}
	else{
		echo "INVALID FORMAT / EMPTY";
	}
}

function test_input($data) {
	$data = trim($data);
	$data = stripslashes($data);
	$data = htmlspecialchars($data);
	return $data;
  }
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <title>Petra Christian University Virtual Tour</title>
    <!-- Favicon-->
    <link rel="icon" type="image/x-icon" href="assets/logoukp.png" />
    <!-- Font Awesome icons (free version)-->
    <script src="https://use.fontawesome.com/releases/v5.13.0/js/all.js" crossorigin="anonymous"></script>
    <!-- Google fonts-->
    <link href="https://fonts.googleapis.com/css?family=Merriweather+Sans:400,700" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic" rel="stylesheet" type="text/css" />
    <!-- Third party plugin CSS-->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/magnific-popup.min.css" rel="stylesheet" />
    <!-- Core theme CSS (includes Bootstrap)-->
    <link href="css/bootstrap.css" rel="stylesheet"/>
    <link href="css/styles.css" rel="stylesheet"/>  
    <style>
        /*============= LOGIN =============*/
        input[type=text],input[type=password] {
            background-color: #f6f6f6;
            border: none;
            color: #0d0d0d;
            padding: 15px 32px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin: 5px;
            width: 85%;
            border: 2px solid #f6f6f6;
            transition: all 0.5s ease-in-out;
            border-radius: 5px 5px 5px 5px;
        }
        input[type=text]:focus,input[type=password]:focus {
            background-color: #fff;
            border-bottom: 2px solid #5fbae9;
        }
        input[type=submit]{
            background-color: #56baed;
            border: none;
            color: white;
            padding: 15px 30px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            text-transform: uppercase;
            width: 85%;
            font-size: 13px;
            box-shadow: 0 10px 30px 0 rgba(95,186,233,0.4);
            border-radius: 5px 5px 5px 5px;
            margin: 5px 5px 5px 5px;
            transition: all 0.3s ease-in-out;
        }
        input[type=submit]:hover{
            background-color: #39ace7;
        }
        #clickable:hover{
            cursor:pointer;
            color: #56baed;
        }
        #signup{
            margin: 10px auto;
        }
    </style>
    <script type="text/javascript">
        function showhide(){
            var x = document.getElementById("password");
            if (x.type == "password") {
                x.type = "text";
            }else{
                x.type = "password";
            }
        }
    </script>
</head>
<body>
	<!-- Navigation -->
	<nav class="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav">
            <div class="container">
                <a class="navbar-brand" href="#"><img src="img/logoPetra.png" alt="logo" title="logo" style="height:100px;width:230px;"></a>
                <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ml-auto my-2 my-lg-0">
                        <li class="nav-item"><a class="nav-link js-scroll-trigger" href="index.php">Home</a></li>
                        <li class="nav-item"><a class="nav-link js-scroll-trigger" href="loginpage.php">Login</a></li>
                    </ul>
                </div>
            </div>
    </nav>
	<!-- End Navigation -->
	<header class="masthead" id="home">
    <div class="container">
        <div class="row d-flex justify-content-center" style="padding-top: 80px;">
            <div class="col-md-4" style="border: solid 1px lightgrey;padding:20px; border-radius: 15px;box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);text-align: center; background: #FFFFFF;">
                <h2 style="padding: 10px;">Sign Up</h2>
				<form method="post">
				<div class = "form-group">
                    <label style="width: 100%;">Nama</label>
                    <input type="text" name="nama" id="nama" placeholder="Nama" maxlength="40">
                </div>
				<div class = "form-group">
                    <label style="width: 100%;">Username</label>
                    <input type="text" name="username" id="username" placeholder="Username" maxlength="20">
                    <!-- <input type="text" name="alamat" id="alamat" placeholder="Alamat"> -->
                </div>
                <div class = "form-group">
                    <label style="width: 100%;">Password</label>
                    <input type="password" name="password" id="password" placeholder="Password" maxlength="20">
                    <a id="clickable" onclick="showhide()">Show/Hide Password</a>
                </div>
                <input type="submit" name="signup" id="signup" value="sign up">
				</form>
            </div>
        </div>
    </div>
	</header>
	<br><br>

    <!-- Contact-->
    <section class="page-section py-4" id="contact" >
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-8 text-center">
                        <h2 class="mt-0">Contacts</h2>
                        <hr class="divider my-4" />
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-3 ml-auto text-center mb-5 mb-lg-0">
                        <i class="fas fa-phone fa-3x mb-3 text-muted"></i>
                        <div>phone : +62 31 8439040 </div>
                    </div>
                    <div class="col-lg-3 mr-auto text-center mb-5 mb-lg-0">
                        <i class="fas fa-envelope fa-3x mb-3 text-muted"></i>
                        <!-- Make sure to change the email address in BOTH the anchor text and the link target below!-->
                        <a class="d-block" href="mailto:info@petra.ac.id">Email : info@petra.ac.id</a>
                    </div>
                    <div class="col-lg-3 mr-auto text-center mb-5 mb-lg-0">
                        <i class="fas fa-home fa-3x mb-3 text-muted"></i>
                        <!-- Make sure to change the email address in BOTH the anchor text and the link target below!-->
                        <div>Jalan Siwalankerto 121 - 131</div>
                        <div>Surabaya 60236</div>
                    </div>
                    <div class="col-lg-3 mr-auto text-center mb-5 mb-lg-0" >
                        <i class="fas fa-fax fa-3x mb-3 text-muted"></i>
                        <!-- Make sure to change the email address in BOTH the anchor text and the link target below!-->
                        <div>Fax: +62 31 8436418</div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Footer-->
        <footer class="bg-light py-5">
            <div class="container"><div class="small text-center text-muted">Copyright © 2020 - petra.ac.id</div></div>
        </footer>
    <!-- Script Source Files -->
    

	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.bundle.min.js"></script>
    <!-- Third party plugin JS-->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.4.1/jquery.easing.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/jquery.magnific-popup.min.js"></script>
    <!-- Core theme JS-->
    <script src="js/scripts.js"></script>
</body>
</html>