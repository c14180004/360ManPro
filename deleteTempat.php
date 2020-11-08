<?php
require_once "connect.php";
if(isset($_POST['deletePlaceId'])){

    //delete tempat yang gedungnya hilang
    $strIdTempat = $_POST['deletePlaceId'];
    $arrIdTempat = explode(",",$strIdTempat);
    $sqlDeleteTempat = "DELETE FROM tempat WHERE (id) IN (".$strIdTempat.")";
    $resDeleteTempat = mysqli_query($conn,$sqlDeleteTempat);
    if($resDeleteTempat){
        echo "delete tempat success";
    }

    //ambil data point/panorama yang tempatnya di delete
    $arrIdPoint = [];
    $arrIdTempatPoint =[];
    $sqlDataTempatPoint = "SELECT * FROM tempat_point";
    $resDataTempatPoint = mysqli_query($conn,$sqlDataTempatPoint);
    while($rowDataTempatPoint = mysqli_fetch_assoc($resDataTempatPoint)){
        if(in_array($rowDataTempatPoint['id_tempat'],$arrIdTempat)){
            array_push($arrIdPoint,$rowDataTempatPoint['id_panorama']);
            array_push($arrIdTempatPoint,$rowDataTempatPoint['id']);
        }
    }
    echo implode(",",$arrIdTempatPoint);

    //ambil data point/panorama yang tempatnya di delete
    $sqlDataPoint = "SELECT * FROM panorama";
    $resDataPoint = mysqli_query($conn,$sqlDataPoint);
    while($rowDataPoint = mysqli_fetch_assoc($resDataPoint)){
        if(in_array($rowDataPoint['id'],$arrIdPoint)){
            unlink($rowDataPoint['image']);
        }
    }

    //delete tempat_point yang tempatnya hilang
    $strIdTempatPoint = implode(",",$arrIdTempatPoint);
    $sqlDeleteTempatPoint = "DELETE FROM tempat_point WHERE (id) IN (".$strIdTempatPoint.")";
    $resDeleteTempatPoint = mysqli_query($conn,$sqlDeleteTempatPoint);
    if($resDeleteTempatPoint){
        echo "delete tempat_point success";
    }

    //delete tempat_point yang tempatnya hilang
    $strIdPoint = implode(",",$arrIdPoint);
    $sqlDeletePoint = "DELETE FROM panorama WHERE (id) IN (".$strIdPoint.")";
    $resDeletePoint = mysqli_query($conn,$sqlDeletePoint);
    if($resDeletePoint){
        echo "delete point success";
    }

    //ambil data llnk yang poinya di delete
    $arrIdLink = [];
    $sqlDataLink = "SELECT * FROM child_panorama";
    $resDataLink = mysqli_query($conn,$sqlDataLink);
    while($rowDataLink = mysqli_fetch_assoc($resDataLink)){
        if(in_array($rowDataLink['id_parent'],$arrIdPoint) || in_array($rowDataLink['id_child'],$arrIdPoint)){
            array_push($arrIdLink,$rowDataLink['id']);
        }
    }

    //delete link yang pointnya hilang
    $strIdLink = implode(",",$arrIdLink);
    $sqlDeleteLink = "DELETE FROM  child_panorama WHERE (id) IN (".$strIdLink.")";
    $resDeleteLink = mysqli_query($conn,$sqlDeleteLink);
    if($resDeleteLink){
        echo "delete link success";
    }

}else{
    echo 0;
}
