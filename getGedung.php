<?php
    require_once "connect.php";
    $sqlGetGedung = "select * from gedung";
    $resGetGedung = mysqli_query($conn,$sqlGetGedung);
    $arr=[];
    while($rowGetGedung = mysqli_fetch_assoc($resGetGedung)){
        array_push($arr,$rowGetGedung);
    }
    echo json_encode($arr);
?>