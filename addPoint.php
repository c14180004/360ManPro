<?php
require_once "connect.php";
if(isset($_FILES['file']['name']) && 
isset($_POST['namaPoint']) && 
isset($_POST['detailPoint']) &&
isset($_POST['idTempat']) &&
isset($_POST['pointX']) &&
isset($_POST['pointY'])){

   /* Getting file name */
   $filename = uniqid().".png";
   $namaPoint = $_POST['namaPoint'];
   $detailPoint = $_POST['detailPoint'];
   $idTempat = $_POST['idTempat'];
   $pointX = $_POST['pointX'];
   $pointY = $_POST['pointY'];

   /* Location */
   $location = "pointUpload/".$filename;
   $imageFileType = pathinfo($location,PATHINFO_EXTENSION);
   $imageFileType = strtolower($imageFileType);

   /* Valid extensions */
   $valid_extensions = array("jpg","jpeg","png");

   $response = 0;
   /* Check file extension */
   if(in_array(strtolower($imageFileType), $valid_extensions)) {
      /* Upload file */
      if(move_uploaded_file($_FILES['file']['tmp_name'],$location)){
         $response = $location;
         $sqlAddPoint="INSERT INTO panorama VALUES(0,'".$namaPoint."','".$detailPoint."','".$location."')";
         $resAddPoint=mysqli_query($conn,$sqlAddPoint);
         if($resAddPoint){
             $response = "success";
         }else{
             $response ="gagal";
         }
      }
   }
   $idPano=0;
   $sqlGetIdpano = "SELECT id FROM panorama";
   $resGetIdpano = mysqli_query($conn,$sqlGetIdpano);
   while($rowGetIdpano= mysqli_fetch_assoc($resGetIdpano)){
       $idPano = $rowGetIdpano['id'];
   }
   $response = $response.", idpano: ".$idPano;
   $sqlAddPoint="INSERT INTO tempat_point VALUES(0,".$idTempat.", ".$idPano.", ".$pointX.", ".$pointY.")";
   $resAddPoint=mysqli_query($conn,$sqlAddPoint);
   if($resAddPoint){
       $response = $response.", insert: berhasil";
   }else{
       $response = $response.", insert: gagal";
   } 

   echo $response;
   exit;
}

echo 0;