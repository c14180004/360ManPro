<?php
    require_once "connect.php";
    $q = mysqli_query($conn, "SELECT * FROM gedung");

    $arr=[];
    while($res = mysqli_fetch_assoc($q)){
        array_push($arr, $res);
    }

    echo json_encode($arr);
?>