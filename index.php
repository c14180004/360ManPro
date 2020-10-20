<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width, shrink-to-fit=no">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="360View.css"> 
        <title>Panolens.js Development Example</title>
    </head>
    <body>
        <div class="cursorPoint"></div>
        <img class="cursorLink" src="arrowUp.png">
        <div class='contain'>
            <button class="sideNavOpen"><i class="fa fa-bars" aria-hidden="true"></i></button>
            <div class="sideNav">
                <button class="sideNavClose"><i class="fa fa-arrow-left" aria-hidden="true"></i></button>
                <div class="tempat">
                    <button class="tablink">Place</button>
                    <button class="tablink">Point</button>
                    <button class="tablink">Link</button>
                    <div id="Place" class="tabContent">      
                        <button class="btn addPlace" style="background-color:#111;">Add Place</button>
                        <div class="addForm addFormPlace">
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
                        <hr>
                        <ul id="ListPlace">
                            <li class="placeName">Lantai 1</li>
                        </ul>
                    </div>
                    <div id="Point" class="tabContent">
                        <button class="btn addPoint" style="background-color:#111;">Add Point</button>
                        <div class="addForm addFormPoint">
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
                        <hr>
                        <ul id="ListPoint">
                            <li class="pointName">Pintu masuk perpus</li>
                        </ul>
                    </div>
                    <div id="Link" class="tabContent">
                        <div class="addFormLink">
                            <div class="form-group">
                                <label for="LinkDest">Destination Point</label>
                                <input type="text" class="form-control" id="linkDest" name="linkDest" disabled required>
                            </div>
                            <ul id="ListPointLink">
                                
                            </ul><br><br>
                            <button class="btn btn-success" id="choosePointLink">Choose Point</button>
                            <button class="btn btn-primary" id="addLink" disabled>Add</button>
                        </div>
                    </div>
                </div>
                
            </div>
            <div class="canvas">
                
                <div class="minimap">
                    <h2 class="judulMap">Lantai 6</h2>
                    <h2 class="closeMap"><i class="fa fa-chevron-up" aria-hidden="true"></i></h2>
                    <img src="mapperpus/6.PNG" id="minimap">
                </div>
                <div id="panorama"></div> 
            </div>
            
        </div>
        
        
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
        <script src="js/three.js"></script>
        <script src="js/panolens.js"></script>
        <script src="360View.js"></script>
    </body>
</html>