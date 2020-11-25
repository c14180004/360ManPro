<?php
require_once "connect.php";

if(isset($_SESSION["loggedinadmin"]) && $_SESSION["loggedinadmin"] === true){
	header("location: 360view.php");
    exit;
}

$username = $password = "";
$username_err = $password_err = "";
 
// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){
 
    // Check if username is empty
    if(empty(trim($_POST["username"]))){
        $username_err = "Please enter username.";
    } else{
        $username = trim($_POST["username"]);
    }
    
    // Check if password is empty
    if(empty(trim($_POST["password"]))){
        $password_err = "Please enter your password.";
    } else{
        $password = trim($_POST["password"]);
    }
    
    // Validate credentials
    if(empty($username_err) && empty($password_err)){
        // Prepare a select statement
        $sql = "SELECT ID_Admin, Username, Password FROM admin WHERE Username = ?";
        
        if($stmt = mysqli_prepare($conn, $sql)){
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "s", $param_username);
            
            // Set parameters
            $param_username = $username;
            
            // Attempt to execute the prepared statement
            if(mysqli_stmt_execute($stmt)){
                // Store result
                mysqli_stmt_store_result($stmt);
                
                // Check if username exists, if yes then verify password
                if(mysqli_stmt_num_rows($stmt) == 1){                    
                    // Bind result variables
                    mysqli_stmt_bind_result($stmt, $id, $username, $hashed_password);
                    if(mysqli_stmt_fetch($stmt)){
						echo $password;
						echo $hashed_password;
                        if(password_verify($password, $hashed_password)){
                            // Password is correct, so start a new session
                            echo "Login Success";
                            // Store data in session variables
                            $_SESSION["loggedinadmin"] = true;
                            $_SESSION["id_admin"] = $id;
                            $_SESSION["username"] = $username;                            
                            
                            // Redirect user to welcome page
                            header("location: 360view.php");
                        } else{
                            // Display an error message if password is not valid
                            $password_err = "The password you entered was not valid.";
                        }
                    }
                } else{
                    // Display an error message if username doesn't exist
                    $username_err = "No account found with that username.";
                }
            } else{
                echo "Oops! Something went wrong. Please try again later.";
            }

            // Close statement
            mysqli_stmt_close($stmt);
        }
    }
    
    // Close connection
    mysqli_close($conn);
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
                        <li class="nav-item"><a class="nav-link js-scroll-trigger" href="index.php">List Gedung</a></li>
                        <li class="nav-item"><a class="nav-link js-scroll-trigger" href="index.php">Contact</a></li>
                        <li class="nav-item"><a class="nav-link js-scroll-trigger" href="loginpage.php">Login</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    <!-- End Navigation -->
    <header class="masthead" id="home">
    <div class="container">
        <div class="row d-flex justify-content-center" style="padding-top: 80px;">
            <div class="col-md-4" style="border: solid 1px lightgrey; padding:20px; border-radius: 15px;box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);text-align: center;background: #FFFFFF;">
                <h2 style="padding: 10px;">Sign In</h2>
                <form method="post">
                    <div class = "form-group">
                        <label style="width: 100%;">Username/Email</label>
                        <input type="text" name="username" id="username" placeholder="Username/Email">
                    </div>
                    <div class = "form-group">
                        <label style="width: 100%;">Password</label>
                        <input type="password" name="password" id="password" placeholder="Password">
                        <a id="clickable" onclick="showhide()">Show/Hide Password</a>
                    </div>
                    <div class="text-danger">
                        <p>
                         <?php 
                        if (!empty($username_err)) {
                          echo $username_err; 
						}
						if (!empty($password_err)) {
						  echo $password_err;
						}
                        ?> 
                        </p>
                    </div>
                    <input type="submit" name="login" id="login" value="Sign In">
                    <!-- <div id="signup">
                        Don't have an account ? <a href="signup.php">Sign up</a>    
                    </div> -->
                </form>
            </div>
        </div>
    </div>
    </header>
    <br><br>
    
    <!-- <footer class="page-footer font-small pt-4">
        <div class="container">
            <div class="row">
				<div class="col-md-6 text-left">
					<img src="img/download.png" alt="logo" style="width: 200px;">
					<p id="alamat">Alamat:</p>
					<p>Jalan Siwalankerto 121 - 131</p>
					<p>Surabaya 60236</p>
				</div>

				<div class="col-md-6 mb-md-0 mb-3 text-left my-md-3">
					<p id="telepon">Telepon: +62 31 8439040, 8394830 - 31</p>
					<p>Fax: +62 31 8436418</p>				
					<p>Email: info@petra.ac.id</p>
  				</div>
  
	  		</div>
		</div>
		<div class="footer-copyright text-center pt-3">© 2020 Copyright:
	        <a href="https://www.petra.ac.id/"> petra.com</a>
	    </div>
    </footer> -->

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
    

	<!-- Bootstrap core JS-->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.bundle.min.js"></script>
    <!-- Third party plugin JS-->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.4.1/jquery.easing.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/jquery.magnific-popup.min.js"></script>
    <!-- Core theme JS-->
    <script src="js/scripts.js"></script>
</body>
</html>