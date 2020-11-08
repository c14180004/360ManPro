<?php
    require_once "connect.php";
    if(isset($_POST['x']) && 
        isset($_POST['y']) &&
        isset($_POST['z']) &&
        isset($_POST['parent']) &&
        isset($_POST['child']) &&
        isset($_POST['nama'])){
        $x = $_POST['x'];
        $y = $_POST['y'];
        $z = $_POST['z'];
        $parent = $_POST['parent'];
        $child = $_POST['child'];
        $nama = $_POST['nama'];
        $sqlAddLink = "INSERT INTO child_panorama VALUES(0,'".$nama."',".$parent.",".$child.",".$x.",".$y.",".$z.")";
        $resAddLink = mysqli_query($conn,$sqlAddLink);
        if($resAddLink){
            echo "berhasil";
        }
            
    }else{
        
    }
?>