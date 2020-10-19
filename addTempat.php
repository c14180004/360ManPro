<?php
require_once "connect.php";
if(isset($_FILES['file']['name']) && isset($_POST['namaTempat']) && isset($_POST['detailTempat'])){

   /* Getting file name */
   $filename = uniqid().".png";
   $namaTempat = $_POST['namaTempat'];
   $detailTempat = $_POST['detailTempat'];
   /* Location */
   $location = "mapUpload/".$filename;
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
         $sqlAddTempat="INSERT INTO tempat VALUES(0,'".$namaTempat."','".$detailTempat."','".$location."')";
         $resAddTempat=mysqli_query($conn,$sqlAddTempat);
         if($resAddTempat){
             $response = "success";
         }else{
             $response ="gagal";
         }
      }
   }

   echo $response;
   exit;
}

echo 0;