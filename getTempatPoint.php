<?php
    require_once "connect.php";
    $sqlGetPoint = "SELECT * FROM tempat_point";
    $resGetPoint = mysqli_query($conn,$sqlGetPoint);
    $arr=[];
    while($rowGetPoint = mysqli_fetch_assoc($resGetPoint)){
        array_push($arr,$rowGetPoint);
    }
    echo json_encode($arr);
?>