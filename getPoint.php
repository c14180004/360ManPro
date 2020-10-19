<?php
    require_once "connect.php";
    $sqlGetPoint = "SELECT tempat_point.id as id, tempat_point.id_tempat as idTempat, panorama.id as idPanorama, panorama.nama as nama, panorama.detail as detail, panorama.image as panoImage, tempat_point.x as x, tempat_point.y as y FROM tempat_point JOIN panorama ON tempat_point.id_panorama = panorama.id";
    $resGetPoint = mysqli_query($conn,$sqlGetPoint);
    $arr=[];
    while($rowGetPoint = mysqli_fetch_assoc($resGetPoint)){
        array_push($arr,$rowGetPoint);
    }
    echo json_encode($arr);
?>