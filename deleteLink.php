<?php
require_once "connect.php";
if(isset($_POST['deleteLinkId'])){

    //delete link yang pointnya hilang
    $strIdLink = $_POST['deleteLinkId'];
    $arrIdLink = explode(",",$strIdLink);
    $sqlDeleteLink = "DELETE FROM  child_panorama WHERE (id) IN (".$strIdLink.")";
    $resDeleteLink = mysqli_query($conn,$sqlDeleteLink);
    if($resDeleteLink){
        echo "delete link success";
    }

}else{
    echo 0;
}
