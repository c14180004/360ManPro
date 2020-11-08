<!DOCTYPE html>
<html>
    <head>
        <?php
        session_start();
        $isLogin;
            if(isset($_SESSION["loggedinadmin"]) && $_SESSION["loggedinadmin"] == true){
                $isLogin = "true";
            }else{
                $isLogin = "false";
            }
        ?>
        <meta charset="utf-8">
        <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width, shrink-to-fit=no">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="css/360View.css"> 
        <title>Panolens.js Development Example</title>
    </head>
    <body>
        
        <img class="cursorGedung" src="assets/gedungPoint.png">
        <div class="cursorPoint"></div>
        <img class="cursorLink" src="assets/arrowUp.png">
        <div class='contain'>
            <button class="sideNavOpen"><i class="fa fa-bars" aria-hidden="true"></i></button>
            <div class="sideNav">
                <button class="sideNavClose"><i class="fa fa-arrow-left" aria-hidden="true"></i></button>
                <div class="tempat">
                    <button class="tablink">Gedung</button>
                    <button class="tablink">Place</button>
                    <button class="tablink">Point</button>
                    <button class="tablink admin">Link</button>
                    <div id="Gedung" class="tabContent">
                        <button class="btn add addGedung" style="background-color:#111;">Add Gedung</button>
                        <button class="btn btn-danger delete deleteGedung">Delete</button>
                        <div class="addForm addFormGedung">
                            <div class="form-group">
                                <label for="namaGedung">Nama</label>
                                <input type="text" class="form-control" id="namaGedung" name="namaGedung" requried>
                            </div>
                            <div class="form-group">
                                <label for="detailGedung">More Information</label>
                                <textarea type="text" class="form-control" id="detailGedung" name="detailGedung" rows="5" required></textarea>
                            </div>
                            
                            <button class="btn btn-success" id="chooseGedung">Choose Point</button>
                            <button class="btn btn-primary" id="addGedung" disabled>Add</button>
                        </div>
                        <hr class="admin">
                        <ul id="ListGedung">
                            
                        </ul>
                        <!-- <ul id="istGedung">
                            <li id="tempat100" class="gedungName"><div class="gedungHeader">satu</div><div class="gedungInfo">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatibus neque iste sit explicabo quaerat id! Cumque cum aliquam rem tempora? Tenetur officiis officia, similique perspiciatis accusantium est sit asperiores earum.</div></li>
                            <li id='"++"' class='gedungName'><div class='gedungHeader'>satu</div><div class='checkbox gedungCB'></div><div class='gedungInfo'></div></li>
                        </ul> -->
                    </div>
                    <div id="Place" class="tabContent">   
                        <button class="btn add addPlace admin" style="background-color:#111;">Add Place</button>
                        <button class="btn btn-danger delete deletePlace">Delete</button>
                        <div class="addForm addFormPlace admin">
                            <label id="forGedung" class="forParent">At:</label>
                            <div class="form-group">
                                <label for="namaTempat">Nama</label>
                                <input type="text" class="form-control" id="namaTempat" name="namaTempat" requried>
                            </div>
                            <div class="form-group">
                                <label for="detailTempat">More Information</label>
                                <textarea type="text" class="form-control" id="detailTempat" name="detailTempat" rows="5" required></textarea>
                            </div>
                            <div class="form-group">
                                <label for="imageTempat">Image</label>
                                <input type="file" class="form-control" id="imageTempat" name="imageTempat" required>
                            </div>
                            <button class="btn btn-primary" id="addPlace">Add</button>
                        </div>
                        <hr class="admin">
                        <ul id="ListPlace">
                            <li class="placeName">Lantai 1</li>
                        </ul>
                    </div>
                    <div id="Point" class="tabContent">
                        <button class="btn add addPoint admin" style="background-color:#111;">Add Point</button>
                        <button class="btn btn-danger delete deletePoint">Delete</button>
                        <div class="addForm addFormPoint">
                            <label id="forPlace" class="forParent">At:</label>
                            <div class="form-group">
                                <label for="namaPoint">Nama</label>
                                <input type="text" class="form-control" id="namaPoint" name="namaPoint" requried>
                            </div>
                            <div class="form-group">
                                <label for="detailPoint">More Information</label>
                                <textarea type="text" class="form-control" id="detailPoint" name="detailPoint" rows="5" required></textarea>
                            </div>
                            <div class="form-group">
                                <label for="imagePoint">Image</label>
                                <input type="file" class="form-control" id="imagePoint" name="imagePoint" required>
                            </div>
                            <button class="btn btn-success" id="choosePoint">Choose Point</button>
                            <button class="btn btn-primary" id="addPoint" disabled>Add</button>
                        </div>
                        <hr class="admin">
                        <ul id="ListPoint">
                            <li class="pointName"></li>
                        </ul>
                    </div>
                    <div id="Link" class="tabContent">
                        <button class="btn add addLink admin" style="background-color:#111;">Add Link</button>
                        <button class="btn btn-danger delete deleteLink">Delete</button>
                        <div class="addForm addFormLink">
                            <label id="forPoint" class="forParent">From:</label>
                            <div class="form-group">
                                <label for="namaLink">Nama</label>
                                <input type="text" class="form-control" id="namaLink" name="namaLink" requried>
                            </div>
                            <div class="form-group">
                                <label for="LinkDest">To Point</label>
                                <input type="text" class="form-control" id="linkDest" name="linkDest" disabled required>
                            </div>
                            <ul id="ListPointLink">
                                
                            </ul>
                            <br>
                            <button class="btn btn-success" id="choosePointLink">Choose Point</button>
                            <button class="btn btn-primary" id="addLink" disabled>Add</button>
                        </div>
                        <hr class="admin">
                        <ul id="ListLink">
                            <li class="linkName"></li>
                        </ul>
                    </div>
                </div>
                
            </div>
            <div class="mapContainer">
                <div class="map">
                    <div class="mapPetra">
                        <img class="mapPetraImage" src="assets/mapPetra.png">
                    </div>
                </div>
            </div>
            <div class="canvas">
                <div class="minimap">
                    <h2 class="judulMap"></h2>
                    <h2 class="closeMap"><i class="fa fa-chevron-up" aria-hidden="true"></i></h2>
                    <img src="" id="minimap">
                </div>
                <div id="panorama"></div> 
            </div>
            
        </div>
        
        
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
        <script src="js/three.js"></script>
        <script src="js/OrbitControls.js"></script>
        <script src="js/panolens.js"></script>
        <script src="js/360View.js"></script>
        <script>
            $(document).ready(function(){
                isLogin = <?php echo $isLogin?>;
                console.log(isLogin);
                if(isLogin == true){
                    $(".admin").css("display","block");
                    $(".add").css("display","inline");
                    $(".delete").css("display","inline");
                    $(".tablink").css("width","25%");
                }else{
                    $(".admin").css("display","none");
                    $(".add").css("display","none");
                    $(".delete").css("display","none");
                    $(".tablink").css("width","33.33%");
                }
            })
            
        </script>       
    </body>
</html>