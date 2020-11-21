<?php
	require_once "connect.php";
	$search = $_GET["search"];
    $query = "SELECT * FROM `gedung` WHERE nama LIKE '%$search%'";
    $q = mysqli_query($conn, $query);
    // $q = mysqli_query($xxlink, "SELECT * FROM songs");

    $arr=[];
    while($res = mysqli_fetch_assoc($q)){
        array_push($arr, $res);
    }

    echo json_encode($arr);
?>