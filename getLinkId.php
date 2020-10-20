<?php
    require_once "connect.php";
    $sqlGetLink = "SELECT * FROM child_panorama";
    $resGetLink = mysqli_query($conn,$sqlGetLink);
    $arr=[];
    while($rowGetLink = mysqli_fetch_assoc($resGetLink)){
        array_push($arr,$rowGetLink);
    }
    echo json_encode($arr);
?>