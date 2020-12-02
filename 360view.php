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
        <title>Petra Christian University Campus Tour</title>
    </head>
    <body>
        
        <img class="cursorGedung" src="assets/gedungPoint.png">
        <div class="cursorPoint"></div>
        <img class="cursorLink" src="assets/arrowUp.png">
        <div class='contain'>
            <button class="sideNavOpen"><i class="fa fa-bars" aria-hidden="true"></i></button>
            <div class="sideNav">
                <div class="top">
                        <button class="sideNavClose"><i class="fa fa-arrow-left" aria-hidden="true"></i></button>
                        <button class="logout btn btn-warning admin">Logout</button>
                </div>
                <div class="tempat">
                    <button class="tablink">Gedung</button>
                    <button class="tablink">Place</button>
                    <button class="tablink">Point</button>
                    <button class="tablink admin">Link</button>
                    <div id="Gedung" class="tabContent">
                        <!-- hanzen -->
                        <div class="searchbar-Gedung">
                            <label for="searchbargedung">Search Gedung :</label>
                            <input type="text" class="form-control" id="searchbargedung" placeholder="Enter Nama Gedung">    
                        </div>
                        <!-- hanzen -->
                        <br>
                        <div class = "path" id="pathGedung"></div>
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
                            <div class="pointOption">
                                <div class="pointOptionRow">
                                    <div class="pointOptionIcon" id="point"><img  src="assets/icon/point.png" width="50px" height="50px"></div>
                                    <div class="pointOptionIcon" id="building"><img  src="assets/icon/building.png"  width="50px" height="50px"></div>
                                    <div class="pointOptionIcon" id="basket"><img  src="assets/icon/basket.png"  width="50px" height="50px"></div>
                                </div>
                                <div class="pointOptionRow">
                                    <div class="pointOptionIcon" id="kantin"><img  src="assets/icon/kantin.png" width="50px" height="50px"></div>
                                    <div class="pointOptionIcon" id="atm"><img  src="assets/icon/atm.png"  width="50px" height="50px"></div>
                                    <div class="pointOptionIcon" id="parking"><img  src="assets/icon/parking.png"  width="50px" height="50px"></div>
                                </div>
                            </div>
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
                        <div class = "path" id="pathPlace"></div>
                        <!-- hanzen -->
                        <div class="searchbar-Place">
                            <label for="searchbarplace">Search Place :</label>
                            <input type="text" class="form-control" id="searchbarplace" placeholder="Enter Nama Place">    
                        </div>
                        <br>
                        <!-- hanzen -->        
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
                        <div class = "path" id="pathPoint"></div>
                        <!-- hanzen -->
                        <div class="searchbar-Point">
                            <label for="searchbarpoint">Search Point :</label>
                            <input type="text" class="form-control" id="searchbarpoint" placeholder="Enter Nama Point">    
                        </div>
                        <br>
                        <!-- hanzen -->  
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
                        <div class = "path" id="pathLink"></div>
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
                        <img class="mapPetraImage" src="assets/denaUKP.png">
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
        <script id ="scriptView" src="js/360View.js" 
            gedung = "<?php if(isset($_GET["gedung"])){echo($_GET["gedung"]);}?>";
            fasilitas = "<?php if(isset($_GET["fasilitas"])){echo($_GET["fasilitas"]);}?>";
            prodi = "<?php if(isset($_GET["prodi"])){echo($_GET["prodi"]);}?>";
            biro = "<?php if(isset($_GET["biro"])){echo($_GET["biro"]);}?>";
        ></script>
        <script>
            var gedung = "<?php if(isset($_GET["gedung"])){echo($_GET["gedung"]);}?>";
            var fasilitas = "<?php if(isset($_GET["fasilitas"])){echo($_GET["fasilitas"]);}?>";
            var prodi = "<?php if(isset($_GET["prodi"])){echo($_GET["prodi"]);}?>";
            var biro = "<?php if(isset($_GET["biro"])){echo($_GET["biro"]);}?>";
            // punyagedung
            function refreshData(){
                 $("#ListGedung").text("Data Loading...");
                if(ajaxcall!=null){
                    ajaxcall.abort();
                }
                ajaxcall = $.get("refesh.php",
                {
                    //input kalau ada
                },
                function(result){
                    console.log(result);
                    var data = JSON.parse(result);
                    var str = "";
                    //loop
                    for(var i=0; i<data.length; i++){
                        var temp = data[i];
                        str +="<li id='gedungName"+temp.id+"' class='gedungName'><div class='gedungHeader'>"+temp.nama+"</div><div class='checkbox gedungCB'></div><div class='gedungInfo'>"+temp.detail+"</div></li>"
                        $(".mapPetra").append("<img class='gedungPoint' id='gedung"+temp.id+"'src='assets/icon/"+temp.icon+".png'>");
                        $(".mapPetra").children("#gedung"+temp.id).css({"left":(temp.x - $(".map").offset().left)+"px","top":(temp.y - $(".map").offset().top)+"px"});
                        console.log(str);
                    }
                    $("#ListGedung").html(str);
                    gedungInfoListener();
                        gedungDeleteListener();
                        $(".gedungName").on("click",function(){
                            if(!isGedungDeleting){
                                var tempGedungId = $(this).attr("id");
                                nowIdGedung = parseInt(tempGedungId.substring(10,tempGedungId.length));
                                //console.log(nowIdGedung);
                                nowIdTempat = -1;
                                nowIdPoint = -1;
                                getDataPlace(nowIdGedung);
                                $(".tablink").eq(1).click();
                            }
                        });
                        $(".gedungPoint").on("click",function(){
                            var tempGedungId = $(this).attr("id");
                            nowIdGedung = parseInt(tempGedungId.substring(6,tempGedungId.length));
                            //console.log(nowIdGedung);
                            nowIdTempat = -1;
                            nowIdPoint = -1;
                            getDataPlace(nowIdGedung);
                            $(".tablink").eq(1).click();
                        });
                })
            }
            function searchData(search){
                $("#ListGedung").text("Data Loading...");
                $("#ListGedung").empty();
                ajaxcall = $.get("searchgedung.php",
                {
                    search: search
                },
                function(result){
                    console.log(result);
                    var data = JSON.parse(result);
                    var str = "";
                    //loop
                    for(var i=0; i<data.length; i++){
                        var temp = data[i];
                        str +="<li id='gedungName"+temp.id+"' class='gedungName'><div class='gedungHeader'>"+temp.nama+"</div><div class='checkbox gedungCB'></div><div class='gedungInfo'>"+temp.detail+"</div></li>"
                        $(".mapPetra").append("<img class='gedungPoint' id='gedung"+temp.id+"'src='assets/icon/"+temp.icon+".png'>");
                        $(".mapPetra").children("#gedung"+temp.id).css({"left":(temp.x - $(".map").offset().left)+"px","top":(temp.y - $(".map").offset().top)+"px"});
                        console.log(str);
                    }
                    if(data.length>0){
                        $("#ListGedung").html(str);
                        gedungInfoListener();
                        gedungDeleteListener();
                        $(".gedungName").on("click",function(){
                            if(!isGedungDeleting){
                                var tempGedungId = $(this).attr("id");
                                nowIdGedung = parseInt(tempGedungId.substring(10,tempGedungId.length));
                                //console.log(nowIdGedung);
                                nowIdTempat = -1;
                                nowIdPoint = -1;
                                getDataPlace(nowIdGedung);
                                $(".tablink").eq(1).click();
                            }
                        });
                        $(".gedungPoint").on("click",function(){
                            var tempGedungId = $(this).attr("id");
                            nowIdGedung = parseInt(tempGedungId.substring(6,tempGedungId.length));
                            //console.log(nowIdGedung);
                            nowIdTempat = -1;
                            nowIdPoint = -1;
                            getDataPlace(nowIdGedung);
                            $(".tablink").eq(1).click();
                        });
                    }

                })
            }

            //punyaplace
            function refreshDataPlace(){
            $("#ListPlace").text("Data Loading...");
                if(ajaxcall!=null){
                    ajaxcall.abort();
                }
                ajaxcall = $.get("refreshplace.php",
                {
                    //input kalau ada
                },
                function(result){
                    console.log(result);
                    var data = JSON.parse(result);
                    var str = "";
                    //loop
                    for(var i=0;i<data.length;i++){
                        var temp = data[i];
                        if(temp.id_gedung == nowIdGedung){
                            // str += "<li id='tempat"+temp.id+"' class='placeName'>"+temp.nama+"</li>";
                            str +="<li id='tempat"+temp.id+"' class='placeName'><div class='placeHeader'>"+temp.nama+"</div><div class='checkbox placeCB'></div><div class='placeInfo'>"+temp.detail+"</div></li>"
                        }
                    }
                    $("#ListPlace").html(str);
                    placeInfoListener();
                    placeDeleteListener();
                    console.log(dataPlace);  
                    $(".placeName").on("click",function(){
                        tempTempatId = $(this).attr("id");
                        nowIdTempat = parseInt(tempTempatId.substring(6,tempTempatId.length));
                        //console.log(nowIdTempat);
                        
                        for(var i=0;i<dataPlace.length;i++){
                            if(dataPlace[i].id == nowIdTempat){
                                str = "";
                                str +='<h2 class="judulMap">'+dataPlace[i].nama+'</h2><h2 class="closeMap"><i class="fa fa-chevron-up" aria-hidden="true"></i></h2><img src="'+dataPlace[i].image+'" id="minimap">';
                                $(".minimap").html(str);
                                $("#minimap").on("click",function(){
                                    if(!pointSelected){
                                        var x = event.clientX;
                                        var y = event.clientY;
                                        console.log("X: " + x + ", Y: " + y);
                                        addPlace(x,y);
                                    }
                                })
                                hideMiniMap();
                                nowIdPoint = -1;
                                getDataPoint(nowIdTempat);
                            }
                        }
                        if(nowIdTempat == -1){
                            getDataPoint(-1)
                        }
                        getPointId();
                    });
                    $(".placeName").eq(0).click();
                })
            }
            function searchDataPlace(search){
                $("#ListPlace").text("Data Loading...");
                $("#ListPlace").empty();
                ajaxcall = $.get("searchplace.php",
                {
                    search: search
                },
                function(result){
                    console.log(result);
                    var data = JSON.parse(result);
                    var str = "";
                    //loop
                    for(var i=0;i<data.length;i++){
                        var temp = data[i];
                        if(temp.id_gedung == nowIdGedung){
                            // str += "<li id='tempat"+temp.id+"' class='placeName'>"+temp.nama+"</li>";
                            str +="<li id='tempat"+temp.id+"' class='placeName'><div class='placeHeader'>"+temp.nama+"</div><div class='checkbox placeCB'></div><div class='placeInfo'>"+temp.detail+"</div></li>"
                        }
                    }
                    if(data.length>0){
                        $("#ListPlace").html(str);
                        placeInfoListener();
                        placeDeleteListener();
                        console.log(dataPlace);  
                        $(".placeName").on("click",function(){
                            tempTempatId = $(this).attr("id");
                            nowIdTempat = parseInt(tempTempatId.substring(6,tempTempatId.length));
                            //console.log(nowIdTempat);
                            
                            for(var i=0;i<dataPlace.length;i++){
                                if(dataPlace[i].id == nowIdTempat){
                                    str = "";
                                    str +='<h2 class="judulMap">'+dataPlace[i].nama+'</h2><h2 class="closeMap"><i class="fa fa-chevron-up" aria-hidden="true"></i></h2><img src="'+dataPlace[i].image+'" id="minimap">';
                                    $(".minimap").html(str);
                                    $("#minimap").on("click",function(){
                                        if(!pointSelected){
                                            var x = event.clientX;
                                            var y = event.clientY;
                                            console.log("X: " + x + ", Y: " + y);
                                            addPlace(x,y);
                                        }
                                    })
                                    hideMiniMap();
                                    nowIdPoint = -1;
                                    getDataPoint(nowIdTempat);
                                }
                            }
                            if(nowIdTempat == -1){
                                getDataPoint(-1)
                            }
                            getPointId();
                        });
                        $(".placeName").eq(0).click();
                    }

                })
            }

            //punyapoint
            function refreshDataPoint(){
            $("#ListPoint").text("Data Loading...");
            var pertama = false;
                if(ajaxcall!=null){
                    ajaxcall.abort();
                }
                ajaxcall = $.get("refreshpoint.php",
                {
                    //input kalau ada
                },
                function(result){
                    
                    var data = JSON.parse(result);
                    dataPoint = data;
                    var str = "";
                    var str1 = "";
                    for(var j = 0;j<dataPoint.length;j++){
                        if(dataPoint[j].idTempat == nowIdTempat){
                            if(!pertama){
                                nowIdPoint = dataPoint[j].id;
                                pertama = true;
                            }
                            $(".minimap").append("<button id='point"+dataPoint[j].id+"' class='mapPoint'></button>");
                            if(navOpen || pertama){
                                $(".minimap").children("#point"+dataPoint[j].id).css({"left":(dataPoint[j].x-320)+"px","top":(dataPoint[j].y)+"px"});
                            }else{
                                $(".minimap").children("#point"+dataPoint[j].id).css({"left":(dataPoint[j].x-20)+"px","top":(dataPoint[j].y)+"px"});
                            }
                            
                            str +="<li id='pointName"+dataPoint[j].id+"' class='pointName'><div class='pointHeader'>"+dataPoint[j].nama+"</div><div class='checkbox pointCB'></div><div class='pointInfo'>"+dataPoint[j].detail+"</div></li>"
                            str1 +="<li id='poinLinkName"+dataPoint[j].id+"' class='pointLinkName'>"+dataPoint[j].nama+"</li>";
                        }
                    }
                    $("#ListPoint").html(str);
                    $("#ListPointLink").html(str1);
                    pointInfoListener();
                    pointDeleteListener();           
                    $(".pointName").on("click",function(){
                        var tempPointNameId = $(this).attr("id");
                        nowIdPoint = parseInt(tempPointNameId.substring(9,tempPointNameId.length));
                        for(var i = 0;i<$(".mapPoint").length;i++){
                            var tempPointId = $(".mapPoint").eq(i).attr("id");
                            if( tempPointId.substring(5,tempPointId.length) == nowIdPoint){
                                $(".mapPoint").eq(i).css("background-color","green");
                            }else{
                                $(".mapPoint").eq(i).css("background-color","red");
                            }
                        }
                        
                        for(var i = 0;i<panorama.length;i++){
                            if(panorama[i].getId() == nowIdPoint){
                                viewer.setPanorama(panorama[i].getPanorama());
                                addPanoramaListener(i);
                            }
                        }
                        getLinkPoint();
                        getDataLink(nowIdPoint);
                    });
                    $(".mapPoint").on("click",function(){
                        tempMapPoint = $(this).attr("id");
                        nowIdPoint = parseInt(tempMapPoint.substring(5,tempMapPoint.length));
                        for(var i = 0;i<$(".mapPoint").length;i++){
                            $(".mapPoint").eq(i).css("background-color","red");
                        }
                        $(this).css("background-color","green");
                        for(var i = 0;i<panorama.length;i++){
                            if(panorama[i].getId() == nowIdPoint){
                                viewer.setPanorama(panorama[i].getPanorama());
                                addPanoramaListener(i);
                            }
                        }
                        getLinkPoint();
                    });
                    $(".pointLinkName").on("click",function(){
                        var tempLinkNameId = $(this).attr("id");
                        selectedLinkId=parseInt(tempLinkNameId.substring(12,tempLinkNameId.length));
                        $("#linkDest").val($(this).text());
                    });
                    //styling
                    $(".mapPoint").hover(function(){
                        var pointOffset = $(this).position();
                        $(this).css({"width":"14px","height":"14px","top":(pointOffset.top -1)+"px","left":(pointOffset.left-1)+"px"});
                    },function(){
                        var pointOffset = $(this).position();
                        $(this).css({"width":"12px","height":"12px","top":(pointOffset.top +1)+"px","left":(pointOffset.left+1)+"px"});
                    });
                    getLinkPoint();
                    $(".pointName").eq(0).click();
                })
            }
            function searchDataPoint(search){
                $("#ListPoint").text("Data Loading...");
                $("#ListPoint").empty();
                var pertama = false;
                ajaxcall = $.get("searchpoint.php",
                {
                    search: search
                },
                function(result){
                    var data = JSON.parse(result);
                    dataPoint = data;
                    var str = "";
                    var str1 = "";
                    for(var j = 0;j<dataPoint.length;j++){
                        if(dataPoint[j].idTempat == nowIdTempat){
                            if(!pertama){
                                nowIdPoint = dataPoint[j].id;
                                pertama = true;
                            }
                            $(".minimap").append("<button id='point"+dataPoint[j].id+"' class='mapPoint'></button>");
                            if(navOpen || pertama){
                                $(".minimap").children("#point"+dataPoint[j].id).css({"left":(dataPoint[j].x-320)+"px","top":(dataPoint[j].y)+"px"});
                            }else{
                                $(".minimap").children("#point"+dataPoint[j].id).css({"left":(dataPoint[j].x-20)+"px","top":(dataPoint[j].y)+"px"});
                            }
                            
                            str +="<li id='pointName"+dataPoint[j].id+"' class='pointName'><div class='pointHeader'>"+dataPoint[j].nama+"</div><div class='checkbox pointCB'></div><div class='pointInfo'>"+dataPoint[j].detail+"</div></li>"
                            str1 +="<li id='poinLinkName"+dataPoint[j].id+"' class='pointLinkName'>"+dataPoint[j].nama+"</li>";
                        }
                    }
                    $("#ListPoint").html(str);
                    $("#ListPointLink").html(str1);
                    pointInfoListener();
                    pointDeleteListener();           
                    $(".pointName").on("click",function(){
                        var tempPointNameId = $(this).attr("id");
                        nowIdPoint = parseInt(tempPointNameId.substring(9,tempPointNameId.length));
                        for(var i = 0;i<$(".mapPoint").length;i++){
                            var tempPointId = $(".mapPoint").eq(i).attr("id");
                            if( tempPointId.substring(5,tempPointId.length) == nowIdPoint){
                                $(".mapPoint").eq(i).css("background-color","green");
                            }else{
                                $(".mapPoint").eq(i).css("background-color","red");
                            }
                        }
                        
                        for(var i = 0;i<panorama.length;i++){
                            if(panorama[i].getId() == nowIdPoint){
                                viewer.setPanorama(panorama[i].getPanorama());
                                addPanoramaListener(i);
                            }
                        }
                        getLinkPoint();
                        getDataLink(nowIdPoint);
                    });
                    $(".mapPoint").on("click",function(){
                        tempMapPoint = $(this).attr("id");
                        nowIdPoint = parseInt(tempMapPoint.substring(5,tempMapPoint.length));
                        for(var i = 0;i<$(".mapPoint").length;i++){
                            $(".mapPoint").eq(i).css("background-color","red");
                        }
                        $(this).css("background-color","green");
                        for(var i = 0;i<panorama.length;i++){
                            if(panorama[i].getId() == nowIdPoint){
                                viewer.setPanorama(panorama[i].getPanorama());
                                addPanoramaListener(i);
                            }
                        }
                        getLinkPoint();
                    });
                    $(".pointLinkName").on("click",function(){
                        var tempLinkNameId = $(this).attr("id");
                        selectedLinkId=parseInt(tempLinkNameId.substring(12,tempLinkNameId.length));
                        $("#linkDest").val($(this).text());
                    });
                    //styling
                    $(".mapPoint").hover(function(){
                        var pointOffset = $(this).position();
                        $(this).css({"width":"14px","height":"14px","top":(pointOffset.top -1)+"px","left":(pointOffset.left-1)+"px"});
                    },function(){
                        var pointOffset = $(this).position();
                        $(this).css({"width":"12px","height":"12px","top":(pointOffset.top +1)+"px","left":(pointOffset.left+1)+"px"});
                    });
                    getLinkPoint();
                    $(".pointName").eq(0).click();
                })
            }
            
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
                // punyagedung
                var timer;
                $("#searchbargedung").on("input",function(){
                    console.log("bhaa");
                    clearTimeout(timer);
                    timer = setTimeout(function(){
                        var search=$("#searchbargedung").val();
                        console.log(search);
                        if(search==""){
                            //kosong
                            refreshData();
                        }
                        else{
                            searchData(search);
                        }
                    },200); //200ms kemudian baru functionnya dipanggil
                })
                

                //punyaplace
                var timer1;
                $("#searchbarplace").on("input",function(){
                    console.log("bhaa");
                    clearTimeout(timer1);
                    timer1 = setTimeout(function(){
                        var search=$("#searchbarplace").val();
                        console.log(search);
                        if(search==""){
                            //kosong
                            refreshDataPlace();
                        }
                        else{
                            searchDataPlace(search);
                        }
                    },200); //200ms kemudian baru functionnya dipanggil
                })
                var timer2;
                $("#searchbarpoint").on("input",function(){
                    console.log("bhaa");
                    clearTimeout(timer2);
                    timer2 = setTimeout(function(){
                        var search=$("#searchbarpoint").val();
                        console.log(search);
                        if(search==""){
                            //kosong
                            refreshDataPoint();
                        }
                        else{
                            searchDataPoint(search);
                        }
                    },200); //200ms kemudian baru functionnya dipanggil
                })
            })
            
        </script>       
    </body>
</html>