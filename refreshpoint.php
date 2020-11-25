<?php
    require_once "connect.php";
    $q = mysqli_query($conn, "SELECT tempat_point.id as id, tempat_point.id_tempat as idTempat, panorama.id as idPanorama, panorama.nama as nama, panorama.detail as detail, panorama.image as panoImage, tempat_point.x as x, tempat_point.y as y FROM tempat_point JOIN panorama ON tempat_point.id_panorama = panorama.id");

    $arr=[];
    while($res = mysqli_fetch_assoc($q)){
        array_push($arr, $res);
    }

    echo json_encode($arr);
?>