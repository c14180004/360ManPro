<?php
    require_once "connect.php";
    $sqlGetTempat = "SELECT * FROM tempat";
    $resGetTempat = mysqli_query($conn,$sqlGetTempat);
    $arr=[];
    while($rowGetTempat = mysqli_fetch_assoc($resGetTempat)){
        array_push($arr,$rowGetTempat);
    }
    echo json_encode($arr);
?>