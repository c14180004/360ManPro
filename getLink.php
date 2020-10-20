<?php
    require_once "connect.php";
    if(isset($_GET['id'])){
        $id = $_GET['id'];
        $sqlGetLink = "SELECT * FROM child_panorama WHERE id_parent = ".$id;
        $resGetLink = mysqli_query($conn,$sqlGetLink);
        $arr=[];
        while($rowGetLink = mysqli_fetch_assoc($resGetLink)){
            array_push($arr,$rowGetLink);
        }
        echo json_encode($arr);
    }
    
?>