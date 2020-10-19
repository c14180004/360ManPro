<?php 
	$conn = mysqli_connect("localhost","manpro","manpro","manpro");
	if (mysqli_connect_errno()) {
	  echo "Failed to connect to MySQL: " . mysqli_connect_error();
	  exit();
	}else{
		session_start();
	}
?>