<?php 
	$conn = mysqli_connect("localhost","root","","manpro");
	if (mysqli_connect_errno()) {
	  echo "Failed to connect to MySQL: " . mysqli_connect_error();
	  exit();
	}else{
		session_start();
	}
?>