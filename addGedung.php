<?php
require_once "connect.php";
if(isset($_POST['namaGedung']) && 
isset($_POST['detailGedung']) &&
isset($_POST['point']) &&
isset($_POST['gedungX']) &&
isset($_POST['gedungY'])){

    $namaGedung = $_POST['namaGedung'];
    $detailGedung = $_POST['detailGedung'];
    $point = $_POST['point'];
    $gedungX = $_POST['gedungX'];
    $gedungY = $_POST['gedungY'];

    $response="";
    $sqlAddGedung="INSERT INTO gedung VALUES(0,'".$namaGedung."','".$detailGedung."','".$point."','".$gedungX."','".$gedungY."')";
    $resAddGedung=mysqli_query($conn,$sqlAddGedung);
    if($resAddGedung){
        $response = "success";
    }else{
        $response = "gagal";
    }

    echo $response;
    exit;
}

echo 0;