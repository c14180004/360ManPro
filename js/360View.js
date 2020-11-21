var addFormGedungOpen = false;
var addFormPlaceOpen = false;
var addFormPointOpen = false;
var addFormLinkOpen = false;

var navOpen = false;
var isMinimize = false;

var isGedungDeleting = false;
var isPlaceDeleting = false;
var isPointDeleting = false;
var isLinkDeleting = false;

var dataGedung;
var dataPlace;
var dataPoint;
var dataTempatPoint;
var dataLink;

var nowIdGedung;
var nowIdTempat;
var nowIdPoint;

var pointGedungSelecting = false;
var gedungSelected = true;
var pointSelected = true;
var linkSelected = true;
var gedungX,gedungY;
var pointX,pointY;

var gedungId;
var pointId;
var linkId;

var pointGedungOption;
var clickPosition;
var selectedLinkId=-1;
var ParentLink;
var ChildLink;
var infoSpotTemp;

var deleteGedungId = [];
var deletePlaceId = [];
var deletePointId = [];
var deleteLinkId = [];

var panorama, viewer;
panorama = [];
var panoImage = document.getElementById("panorama");
//360
// Main panorama
viewer = new PANOLENS.Viewer({
    container: panoImage,
    output: 'console', 
    autoHideInfospot: false 
});

const logEvent = ( { type } ) => console.log( type );
viewer.reticle.addEventListener('reticle-start', logEvent );
viewer.reticle.addEventListener('reticle-update', logEvent );
viewer.reticle.addEventListener('reticle-end', logEvent );
viewer.reticle.addEventListener('reticle-ripple-start', logEvent );
viewer.reticle.addEventListener('reticle-ripple-end', logEvent );


// //map

dragElement($(".map"));
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0, navWidth = 0;
  if ($(".mapPetra")) {
    /* if present, the header is where you move the DIV from:*/
    $(".mapPetra").on("mousedown",dragMouseDown);
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.on("mousedown", dragMouseDown);
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    $(document).on("mouseup",closeDragElement);
    // call a function whenever the cursor moves:
    $(document).on("mousemove", elementDrag);
  }

  function elementDrag(e) {
    if(navOpen){
        navWidth =300;
    }else{
        navWidth = 0;
    }

    //console.log(elmnt.offset());
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:    
    $(".map").css("top",(elmnt.offset().top - pos2) + "px");
    $('.map').css("left",(elmnt.offset().left - pos1) + "px");
    //restric element's movement:
    if(elmnt.offset().top < ($(".mapContainer").height() - $(".mapPetra").height())){
        $('.map').css("top",($(".mapContainer").height() - $(".mapPetra").height()) + "px");
    }
    if(elmnt.offset().left < ($(".mapContainer").width() - $(".mapPetra").width())){
        $('.map').css("left",($(".mapContainer").width() - $(".mapPetra").width()) + "px");
    }
    if(elmnt.offset().top >0){
        $(".map").css("top","0px");   
    }
    if(elmnt.offset().left>(0 + navWidth)){
        $('.map').css("left",(0 + navWidth) + "px");
    }
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    $(document).off("mouseup");
    $(document).off("mousemove");
  }
}



class node{
    constructor(id,panorama){
            this.id = id;
            this.panorama = panorama;
            this.panorama.addEventListener('progress',function(e){
            console.log(e.progress);
        });
        viewer.add(this.panorama);
        this.child=[];
    }
    getPanorama(){
        return this.panorama;
    }
    addChild(j,x,y,z){
        this.child.push(panorama[j]);
        var infospot = new PANOLENS.Infospot(300,"assets/arrowUp.png");
        infospot.position.set(x,y,z);
        infospot.addEventListener('click',function(){
            viewer.setPanorama(panorama[j].getPanorama()); 
            nowIdPoint=panorama[j].getId();
            for(var i = 0;i<$(".mapPoint").length;i++){
                var tempMapPointId = $(".mapPoint").eq(i).attr("id");
                if( parseInt(tempMapPointId.substring(5,tempMapPointId.length))== panorama[j].getId()){
                    $(".mapPoint").eq(i).css("background-color","green");
                }else{
                    $(".mapPoint").eq(i).css("background-color","red");
                }
            }
            addPanoramaListener(j);
            getLinkPoint();
        });
        this.panorama.add(infospot);
        this.panorama.toggleInfospotVisibility(true);
        //this.panorama.link(node,new THREE.Vector3(x,y,z));
        
    }
    getChild(i){
        return this.child[i];
    }
    getId(){
        return this.id;
    }
    countChild(){
        return this.child.length;
    }
}

$(".sideNavOpen").on("click",function(){
    $(".sideNav").css("width","300px");
    $(".canvas").css("left","300px");
    $(".map").css("left","300px");
    navOpen = true;
});
$(".sideNavClose").on("click",function(){
    $(".sideNav").css("width","0");
    $(".canvas").css("left","0");
    $(".map").css("left","0");
    $(".addFormPlace").css({"height":"0"});
    addFormPlaceOpen = false;
    $(".addFormPoint").css({"height":"0"});
    addFormPointOpen = false;
    navOpen = false;

    //remove cursor;
    gedungSelected = true;
    $("*").css("cursor","");
    window.removeEventListener("mousemove",cursorGedung);
    $("#addGedung").prop("disabled",false);
    $(".mapPetra").children("#gedung"+gedungId).remove();
    $(".cursorGedung").css("display","none");
    pointSelected = true;
    $("*").css("cursor","");
    window.removeEventListener("mousemove",cursor);
    $("#addPoint").prop("disabled",true);
    $(".minimap").children("#point"+pointId).remove();
    $(".cursorPoint").css("display","none");
    linkSelected = true;
    window.removeEventListener("mousemove",cursorLink);
    $("#addLink").prop("disabled",true);
    $(".cursorLink").css("display","none");
    for(var i = 0;i<panorama.length;i++){
        if(panorama[i].getId() == nowIdPoint){
            panorama[i].getPanorama().remove(infoSpotTemp);
        }
    }
});
$(".tablink").on("click",function(){
    var name = $(this).text();
    var tab = this;
    var tabcontent = document.getElementsByClassName("tabContent");
    for(var i = 0;i<tabcontent.length;i++){
        tabcontent[i].style.display = "none";
    }
    var tablinks = document.getElementsByClassName("tablink");
    for(var i = 0;i<tablinks.length;i++){
        tablinks[i].style.backgroundColor = "";
    }
    $("#"+name).css("display","block");
    $(this).css("background-color","#444");
    if(name == "Gedung"){
        $(".canvas").css("display","none");
        $(".mapContainer").css("display","block");

    }else{
        $(".canvas").css("display","block");
        $(".mapContainer").css("display","none");
    }
    updateLocation(name);
    updatePath(name);
    //remove cursor;
    gedungSelected = true;
    $("*").css("cursor","");
    window.removeEventListener("mousemove",cursorGedung);
    $("#addGedung").prop("disabled",false);
    $(".mapPetra").children("#gedung"+gedungId).remove();
    $(".cursorGedung").css("display","none");
    pointSelected = true;
    $("*").css("cursor","");
    window.removeEventListener("mousemove",cursor);
    $("#addPoint").prop("disabled",true);
    $(".minimap").children("#point"+pointId).remove();
    console.log(pointId);
    $(".cursorPoint").css("display","none");
    linkSelected = true;
    window.removeEventListener("mousemove",cursorLink);
    $("#addLink").prop("disabled",true);
    $(".cursorLink").css("display","none");
    $("#linkDest").val("");
    for(var i = 0;i<panorama.length;i++){
        if(panorama[i].getId() == nowIdPoint){
            panorama[i].getPanorama().remove(infoSpotTemp);
        }
    }
});
$(document).ready(function(){
    $(".tablink").eq(0).css("background-color","#444");
    $("#Gedung").css("display","block");
    $(".canvas").css("display","none");
    $(".map").css("display","block");
    

    $(".addGedung").on("click",function(){
        if(!addFormGedungOpen){
            if(!pointGedungSelecting){
                $(".addFormGedung").css({"height":"270px"});
            }else{
                $(".addFormGedung").css({"height":"420px"});
            }
            addFormGedungOpen = true;
        }else{
            $(".addFormGedung").css({"height":"0"});
            addFormGedungOpen = false;
        }
    });
    $(".addPlace").on("click",function(){
        if(!addFormPlaceOpen){
            $(".addFormPlace").css({"height":"360px"});
            addFormPlaceOpen = true;
        }else{
            $(".addFormPlace").css({"height":"0"});
            addFormPlaceOpen = false;
        }
        
    }); 
    $(".addPoint").on("click",function(){
        if(!addFormPointOpen){
            $(".addFormPoint").css({"height":"360px"});
            addFormPointOpen = true;
        }else{
            $(".addFormPoint").css({"height":"0"});
            addFormPointOpen = false;
        }
    });
    $(".addLink").on("click",function(){
        if(!addFormLinkOpen){
            $(".addFormLink").css({"height":"400px"});
            addFormLinkOpen = true;
        }else{
            $(".addFormLink").css({"height":"0"});
            addFormLinkOpen = false;
        }
    });


    //delete 
    $(".deleteGedung").on("click",function(){
        if(isGedungDeleting){
            if(deleteGedungId.length > 0){
                var fd = new FormData();
                fd.append("deleteGedungId",deleteGedungId);
                $.ajax({
                    url:"deleteGedung.php",
                    type:'post',
                    processData:false,
                    contentType:false,
                    data:fd,
                    success:function(response){
                        alert(response);
                        isGedungDeleting = false;
                        $(".gedungCB").css("display","none");
                        deleteGedungId = [];
                        location.reload();
                        
                    }
                });
            }else{
                alert("Choose gedung name to delete");
            }
            
        }else{
            deleteGedungId = [];
            $(".gedungCB").css("display","inline");
            isGedungDeleting = true;
        }
    });
    $(".deletePlace").on("click",function(){
        if(isPlaceDeleting){
            if(deletePlaceId.length > 0){
                var fd = new FormData();
                fd.append("deletePlaceId",deletePlaceId);
                $.ajax({
                    url:"deleteTempat.php",
                    type:'post',
                    processData:false,
                    contentType:false,
                    data:fd,
                    success:function(response){
                        alert(response);
                        deletePlaceId = [];
                        $(".placeCB").css("display","none");
                        isPlaceDeleting = false;
                        location.reload();
                    }
                });
            }else{
                alert("Choose Place name to delete");
            }
            
        }else{
            deletePlaceId = [];
            $(".placeCB").css("display","inline");
            isPlaceDeleting = true;
        }
    });
    $(".deletePoint").on("click",function(){
        if(isPointDeleting){
            if(deletePointId.length > 0){
                var fd = new FormData();
                fd.append("deletePointId",deletePointId);
                $.ajax({
                    url:"deletePoint.php",
                    type:'post',
                    processData:false,
                    contentType:false,
                    data:fd,
                    success:function(response){
                        alert(response);
                        deletePointId = [];
                        $(".pointCB").css("display","none");
                        isPointDeleting = false;
                        location.reload();
                    }
                });
            }else{
                alert("Choose Point name to delete");
            }
            
        }else{
            deletePointId = [];
            $(".pointCB").css("display","inline");
            isPointDeleting = true;
        }
    });
    $(".deleteLink").on("click",function(){
        if(isLinkDeleting){
            if(deleteLinkId.length > 0){
                var fd = new FormData();
                fd.append("deleteLinkId",deleteLinkId);
                $.ajax({
                    url:"deleteLink.php",
                    type:'post',
                    processData:false,
                    contentType:false,
                    data:fd,
                    success:function(response){
                        alert(response);
                        deleteLinkId = [];
                        $(".linkCB").css("display","none");
                        isLinkDeleting = false;
                        location.reload();
                    }
                });
            }else{
                alert("Choose link name to delete");
            }
            
        }else{
            deleteLinkId = [];
            $(".linkCB").css("display","inline");
            isLinkDeleting = true;
        }
    });

    //ajax
    $("#addGedung").on("click",function(){
        if(gedungSelected){
            var fd= new FormData();
            var namaGedung = $("#namaGedung").val();
            if(namaGedung != ""){
                fd.append('namaGedung',namaGedung);
            }else{
                alert("nama: " + namaGedung);
            }
            var detailGedung = $("#detailGedung").val();
            if(detailGedung != ""){
                fd.append('detailGedung',detailGedung);
            }else{
                alert("detail: " + detailGedung);
            }
            fd.append("point",pointGedungOption); 
            fd.append('gedungX',gedungX);
            fd.append('gedungY',gedungY);
            for(var x of fd.entries()){
                console.log(x[0] + ',' + x[1]);
            }
            $.ajax({
                url: "addGedung.php",
                type: 'post',
                processData: false,
                contentType: false,
                data: fd,
                success:function(response){
                    alert(response);
                    $("#namaGedung").val("");
                    $("#detailGedung").val("");
                    $("#addGedung").prop("disabled","true");
                    $(".pointOption").css("height","0px");
                    $(".addFormGedung").css({"height":"270px"});
                    pointGedungSelecting = false;
                    getGedungId();
                    getDataGedung(); 
                }
            });
        }else{
            alert("select point");
        }
    });
    $("#addPlace").on("click",function(){
        var fd= new FormData();
        var namaTempat = $("#namaTempat").val();
        if(namaTempat != ""){
            fd.append('namaTempat',namaTempat);
        }else{
            alert("nama: " + namaTempat);
        }
        var detailTempat = $("#detailTempat").val();
        if(detailTempat != ""){
            fd.append('detailTempat',detailTempat);
        }else{
            alert("detail: " + detailTempat);
        } 
        fd.append("idGedung",nowIdGedung);
        var imageTempat = $('#imageTempat')[0].files;
        if(imageTempat.length > 0){
            fd.append('file',imageTempat[0]);
            for(var x of fd.entries()){
                console.log(x[0] + ',' + x[1]);
            }
            $.ajax({
                url: "addTempat.php",
                type: 'post',
                processData: false,
                contentType: false,
                data: fd,
                success:function(response){
                    alert(response);
                    $("#namaTempat").val("");
                    $("#detailTempat").val("");
                    $("#imageTempat").val("");
                    getDataPlace(nowIdGedung);
                }
            });
        }
    });
    $("#addPoint").on("click",function(){
        if(pointSelected){
            var fd= new FormData();
            var namaPoint = $("#namaPoint").val();
            if(namaPoint != ""){
                fd.append('namaPoint',namaPoint);
            }else{
                alert("nama: " + namaPoint);
            }
            var detailPoint = $("#detailPoint").val();
            if(detailPoint != ""){
                fd.append('detailPoint',detailPoint);
            }else{
                alert("detail: " + detailPoint);
            } 
            var imagePoint = $('#imagePoint')[0].files;
            if(imagePoint.length > 0){
                fd.append('file',imagePoint[0]);
                fd.append('idTempat',nowIdTempat);
                fd.append('pointX',pointX);
                fd.append('pointY',pointY);
                for(var x of fd.entries()){
                    console.log(x[0] + ',' + x[1]);
                }
                $.ajax({
                    url: "addPoint.php",
                    type: 'post',
                    processData: false,
                    contentType: false,
                    data: fd,
                    success:function(response){
                        alert(response);
                        $("#namaPoint").val("");
                        $("#detailPoint").val("");
                        $("#imagePoint").val("");
                        $("#addPoint").prop("disabled","true");
                        getPointId();
                        addPanorama();
                        getDataPoint(nowIdTempat);
                    }
                });
            }
        }else{
            alert("select point");
        }
    });
    
    $("#addLink").on("click",function(){
        var namaLink = $("#namaLink").val();
        if(namaLink == ""){
            alert("nama: " + namaLink);
        }
        if(selectedLinkId == -1){
            alert("Select link destination");
        }else{
            $.ajax({
                url:"addLink.php",
                type:'post',
                data:{
                    x:clickPosition.x,
                    y:clickPosition.y,
                    z:clickPosition.z,
                    parent:nowIdPoint,
                    child:selectedLinkId,
                    nama:namaLink
                },success:function(response){
                    alert(response);
                    var tempJ;
                    for(var i = 0;i<panorama.length;i++){
                        if(panorama[i].getId() == selectedLinkId){
                            tempJ = i;
                        }
                    }
                    for(var i = 0;i<panorama.length;i++){
                        if(panorama[i].getId() == nowIdPoint){
                            panorama[i].addChild(tempJ, clickPosition.x, clickPosition.y, clickPosition.z);
                        }
                    }
                    selectedLinkId = -1;
                    // var tablinks = document.getElementsByClassName("tablink");
                    // for(var i = 0;i<tablinks.length;i++){
                    //     tablinks[i].style.backgroundColor = "";
                    // } 
                    $("#linkDest").val("");
                    $("#addLink").prop("disabled","true");
                    for(var i = 0;i<panorama.length;i++){
                        if(panorama[i].getId() == nowIdPoint){
                            panorama[i].getPanorama().remove(infoSpotTemp);
                        }
                    }
                    getDataLink(nowIdPoint);
                },error:function(e){
                    alert(e);
                }
            })
        }
        
    });

    addGedung();
    getDataGedung();
    getDataPlace();
    getDataPoint(nowIdTempat);
    getDataLink(nowIdPoint);
    hideMiniMap();
    panorama=[];
    $.ajax({
        url:"getPoint.php",
        type:"GET",
        dataType:"json",
        success:function(data){
            for(var i = 0;i<data.length;i++){
                var tempPano = new PANOLENS.ImagePanorama(data[i].panoImage);
                tempPano.setLinkingImage("assets/arrowUp.png",300);
                tempPano.addEventListener('progresss',function(){
                    console.log(e.progress);
                })
                panorama.push(new node(data[i].id,tempPano));
                addPanoramaListener(i)
            }
            viewer.setPanorama(panorama[0].getPanorama());
            nowIdTempat=panorama[0].getId();
            $(".gedungName").eq(0).click();
            // Test repeated scenario
            viewer.enableControl( PANOLENS.CONTROLS.DEVICEORIENTATION );
            viewer.enableEffect( PANOLENS.MODES.CARDBOARD );
            viewer.enableControl( PANOLENS.CONTROLS.ORBIT );
            viewer.enableEffect( PANOLENS.MODES.NORMAL );
            $(".tablink").eq(0).click();
        }
    });

    //searchgedung

    
});
function updateLocation(tab){
    var str="";
    if(tab == "Link"){
        str="Form: -"
        for(i = 0;i<dataPoint.length;i++){
            if(dataPoint[i].id == nowIdPoint){
                str = "From: "+ dataPoint[i].nama;
                break;
            }else{
                str = "From: -";
            }
        }
        $("#forPoint").html(str);
    }
    if(tab == "Point"){
        for(i = 0;i<dataPlace.length;i++){
            if(dataPlace[i].id == nowIdTempat){
                str = "At: "+dataPlace[i].nama;
                break;
            }else{
                str = "At: -";
            }
        }
        $("#forPlace").html(str);
    }
    if(tab == "Place"){
        for(i = 0;i<dataGedung.length;i++){
            if(dataGedung[i].id == nowIdGedung){
                str = "At: "+dataGedung[i].nama;
                break;
            }else{
                str = "At: -";
            }
        }
        $("#forGedung").html(str);
    }
}
function updatePath(tab){
    var str="";
    if(tab == "Link" || tab == "Point" || tab == "Place"){
        for(i = 0;i<dataGedung.length;i++){
            if(dataGedung[i].id == nowIdGedung){
                str = str + dataGedung[i].nama ;
                break;
            }
        }
        $("#pathPlace").html(str);
    }
    if(tab == "Point" || tab == "Link"){
        for(i = 0;i<dataPlace.length;i++){
            if(dataPlace[i].id == nowIdTempat){
                str = str + " > " + dataPlace[i].nama;
                break;
            }
        }
        $("#pathPoint").html(str);
    }
    if(tab == "Link"){
        for(i = 0;i<dataPoint.length;i++){
            if(dataPoint[i].id == nowIdPoint){
                str = str + " > " + dataPoint[i].nama;
                break;
            }
        }
        $("#pathLink").html(str);
    }
}
function addPanorama(){
    panorama = [];
    $.ajax({
        url:"getPoint.php",
        type:"GET",
        dataType:"json",
        success:function(data){
            for(var i = 0;i<data.length;i++){
                var tempPano = new PANOLENS.ImagePanorama(data[i].panoImage);
                tempPano.setLinkingImage("assets/arrowUp.png",300);
                tempPano.addEventListener('progresss',function(){
                    console.log(e.progress);
                })
                var tempNode = new node(data[i].id,tempPano);
                panorama.push(tempNode);
                addPanoramaListener(i);
            }
            // Test repeated scenario
            viewer.enableControl( PANOLENS.CONTROLS.DEVICEORIENTATION );
            viewer.enableEffect( PANOLENS.MODES.CARDBOARD );
            viewer.enableControl( PANOLENS.CONTROLS.ORBIT );
            viewer.enableEffect( PANOLENS.MODES.NORMAL );
        }
    })
}
function addPanoramaListener(j){
    panorama[j].getPanorama().addEventListener('click',function(){
        if(!linkSelected){
            clickPosition = viewer.getPosition();
            console.log("X: " + clickPosition.x + " Y: " + clickPosition.y + " Z: " + clickPosition.z);
            
            infoSpotTemp = new PANOLENS.Infospot(300,"assets/arrowUp.png");
            infoSpotTemp.position.set(clickPosition.x,clickPosition.y,clickPosition.z);
            panorama[j].getPanorama().add(infoSpotTemp);
            panorama[j].getPanorama().toggleInfospotVisibility(true);

            linkSelected = true;
            $("*").css("cursor","");
            window.removeEventListener("mousemove",cursorLink);
            $("#addLink").prop("disabled",false);
            $(".cursorLink").css("display","none");
        }
    });
}
function hideMiniMap(){
    $(".closeMap").on("click",function(){
        if(isMinimize){
            $(this).children(".fa").addClass("fa-chevron-down");
            $(this).children(".fa").removeClass("fa-chevron-up");
            isMinimize = false;
            $("#minimap").css("height","0");
            $(".mapPoint").css("display","none");

        }else{
            $(this).children(".fa").addClass("fa-chevron-up");
            $(this).children(".fa").removeClass("fa-chevron-down");
            isMinimize = true;
            $("#minimap").css("height","300px");
            $(".mapPoint").css("display","block");
        }
    })
}


//getData
function getDataGedung(){
    $.ajax({
        url:"getGedung.php",
        type:"GET",
        dataType:"json",
        success: function(data){
            //console.log(data);
            dataGedung = data;
            var listGedung = $("#ListGedung");
            var str = "";
            for(var i=0;i<data.length;i++){
                var temp = data[i];
                str +="<li id='gedungName"+temp.id+"' class='gedungName'><div class='gedungHeader'>"+temp.nama+"</div><div class='checkbox gedungCB'></div><div class='gedungInfo'>"+temp.detail+"</div></li>"
                $(".mapPetra").append("<img class='gedungPoint' id='gedung"+temp.id+"'src='assets/icon/"+temp.icon+".png'>");
                if(navOpen){
                    $(".mapPetra").children("#gedung"+temp.id).css({"left":(temp.x - $(".map").offset().left + 300)+"px","top":(temp.y - $(".map").offset().top)+"px"});
                }else{
                    $(".mapPetra").children("#gedung"+temp.id).css({"left":(temp.x - $(".map").offset().left)+"px","top":(temp.y - $(".map").offset().top)+"px"});
                }   
                
            }
            listGedung.html(str);
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
        },error:function(e){
            console.log(e.responseText);
        }
    });
}
function getDataPlace(nowIdGedung){
    $.ajax({
        url:"getTempat.php",
        type:"GET",
        dataType:"json",
        success: function(data){
            dataPlace = data;
            var listPlace = $("#ListPlace");
            var str = "";
            for(var i=0;i<data.length;i++){
                var temp = data[i];
                if(temp.id_gedung == nowIdGedung){
                    // str += "<li id='tempat"+temp.id+"' class='placeName'>"+temp.nama+"</li>";
                    str +="<li id='tempat"+temp.id+"' class='placeName'><div class='placeHeader'>"+temp.nama+"</div><div class='checkbox placeCB'></div><div class='placeInfo'>"+temp.detail+"</div></li>"
                
                }
            }
            if(str == ""){
                getDataPoint(-1);
            }
            listPlace.html(str);
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
    });
    
}

function getDataPoint(nowIdTempat){
    var pertama = false;;
    $.ajax({
        url:"getPoint.php",
        type:"GET",
        dataType:"json",
        success: function(data){
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
        }
        ,error:function(a){
            console.log(a);
        }
    });
}
function getDataLink(nowIdPoint){
    $.ajax({
        url:"getLink.php",
        type:"GET",
        dataType:"json",
        success:function(data){
            dataLink = data;
            str = "";
            for(var i = 0;i<dataLink.length;i++){
                if(dataLink[i].id_parent == nowIdPoint){
                    str +="<li id='linkName"+dataLink[i].id+"' class='linkName'><div class='linkHeader'>"+dataLink[i].nama+"</div><div class='checkbox linkCB'></div></li>";
                }
            }
            $("#ListLink").html(str);
            linkDeleteListener();
        }
    })
}
function getLinkPoint(){
    var tempParent;
    for(var k=0;k<panorama.length;k++){
        if(panorama[k].getId() == nowIdPoint){
            tempParent = panorama[k];  
        }
    }
    if(tempParent){
        if(tempParent.countChild()==0){
            $.ajax({
                url:"getLink.php",
                type:"GET",
                dataType:"json",
                data:{
                    id:nowIdPoint
                },success:function(data){
                    for(var i = 0;i<data.length;i++){
                        for(var j=0;j<panorama.length;j++){
                            if(data[i].id_child == panorama[j].getId()){
                                tempParent.addChild(j,data[i].x,data[i].y,data[i].z);
                            }
                        }
                    }
                },error:function(e){
                    console.log(e);
                }
            });
        }
    }else{

    }
}

//untuk cursor map
var mouseCursorGedung = document.querySelector(".cursorGedung");
$("#chooseGedung").on("click",function(){
    if(!pointGedungSelecting){
        $(".pointOption").css("height","140px");
        $(".addFormGedung").css({"height":"420px"});
        pointGedungSelecting = true;
    }else{
        $(".pointOption").css("height","0px");
        $(".addFormGedung").css({"height":"270px"});
        pointGedungSelecting = false;
        gedungSelected = true;
        $("*").css("cursor","");
        window.removeEventListener("mousemove",cursorGedung);
        $("#addGedung").prop("disabled",false);
        $(".mapPetra").children("#gedung"+gedungId).remove();
        $(".cursorGedung").css("display","none");
    }
});
$(".pointOptionIcon").on("click",function(){
    pointGedungOption=$(this).attr("id");
    for(var i = 0;i<panorama.length;i++){
        if(panorama[i].getId() == nowIdPoint){
            panorama[i].getPanorama().remove(infoSpotTemp);
        }
    }
    $(".cursorGedung").attr("src","assets/icon/"+pointGedungOption+".png")
    $(".cursorGedung").css("display","block");
    window.addEventListener("mousemove",cursorGedung); 
    $("*").css("cursor","none");
    getGedungId();
    gedungSelected = false;
});
function cursorGedung(e){
    mouseCursorGedung.style.top = e.pageY + "px";
    mouseCursorGedung.style.left = e.pageX + "px";
}
function addGedung(){
    $(".map").on("click",function(e){
        // console.log("x:"+e.clientX+", y:"+e.clientY);
        // console.log($(".mapPetra").offset());
        if(!gedungSelected){
            var x = e.clientX - $(".map").offset().left;
            var y = e.clientY - $(".map").offset().top;
            gedungX = x;
            gedungY = y;
            console.log("X: " + x + ", Y: " + y);
            $(".mapPetra").children("#gedung"+gedungId).remove();
            $(".mapPetra").append("<img class='gedungPoint' id='gedung"+gedungId+"'src='assets/icon/"+pointGedungOption+".png'>");
            $(".mapPetra").children("#gedung"+gedungId).css({"left":(x)+"px","top":(y)+"px"});
            gedungSelected = true;
            $("*").css("cursor","");
            window.removeEventListener("mousemove",cursorGedung);
            $("#addGedung").prop("disabled",false);
            $(".cursorGedung").css("display","none");
        }
    })
    
}
function getGedungId(){
    $.ajax({
        url:"getGedungId.php",
        type:"GET",
        dataType:"json",
        success:function(data){
            //console.log(data);
            if(data.length>0){
                gedungId = (parseInt(data[data.length-1].id) + 1).toString();
            }else{
                gedungId = 1;
            }
        },error:function(e){
            console.log(e.responseText);
        }
    })
}

//untuk cursor point
var mouseCursor = document.querySelector(".cursorPoint");

$("#choosePoint").on("click",function(){
    $(".cursorPoint").css("display","block");
    window.addEventListener("mousemove",cursor); 
    $("*").css("cursor","none");
    getPointId();
    pointSelected = false;
});
function cursor(e){
    mouseCursor.style.top = e.pageY + "px";
    mouseCursor.style.left = e.pageX + "px";
}
function addPlace(x,y){
    pointX = x;
    pointY = y;
    $(".minimap").children("#"+pointId).remove();
    $(".minimap").append("<button id='point"+pointId+"' class='mapPoint'></button>");
    if(navOpen){
        $(".minimap").children("#point"+pointId).css({"left":(x-320)+"px","top":(y)+"px"});
    }else{
        $(".minimap").children("#point"+pointId).css({"left":(x-20)+"px","top":(y)+"px"});
    }
    pointSelected = true;
    $("*").css("cursor","");
    window.removeEventListener("mousemove",cursor);
    $("#addPoint").prop("disabled",false);
    $(".cursorPoint").css("display","none");
}
function getPointId(){
    $.ajax({
        url:"getPointId.php",
        type:"GET",
        dataType:"json",
        success:function(data){
            if(data.length>0){
                pointId = (parseInt(data[data.length-1].id) + 1).toString();
            }else{
                pointId = 1;
            }
        }
    })
}


//untuk cursor Link
var mouseCursorLink = document.querySelector(".cursorLink");
$("#choosePointLink").on("click",function(){
    var panoramaTemp;
    for(var i = 0;i<panorama.length;i++){
        if(panorama[i].getId() == nowIdPoint){
            panorama[i].getPanorama().remove(infoSpotTemp);
        }
    }
    
    $(".cursorLink").css("display","block");
    window.addEventListener("mousemove",cursorLink); 
    $("*").css("cursor","none");
    getLinkId();
    linkSelected = false;
});
function cursorLink(e){
    mouseCursorLink.style.top = e.pageY + "px";
    mouseCursorLink.style.left = e.pageX + "px";
}
function getLinkId(){
    $.ajax({
        url:"getLinkId.php",
        type:"GET",
        dataType:"json",
        success:function(data){
            if(data.length>0){
                linkId = (parseInt(data[data.length-1].id) + 1).toString();
            }else{
                linkId = 1;
            }
        }
    })
}
function gedungInfoListener(){
    $(".gedungName").hover(function(){
        if(!isGedungDeleting){
            $(this).children(".gedungInfo").css({"height":"200px","overflow-y":"scroll","padding":"10px"});
        }
    },function(){
        if(!isGedungDeleting){
            $(this).children(".gedungInfo").css({"height":"","overflow":"hidden","padding":"0px"});
        }
    });
}
function placeInfoListener(){
    $(".placeName").hover(function(){
        if(!isPlaceDeleting){
            $(this).children(".placeInfo").css({"height":"200px","overflow-y":"scroll","padding":"10px"});
        }
    },function(){
        if(!isPlaceDeleting){
            $(this).children(".placeInfo").css({"height":"","overflow":"hidden","padding":"0px"});
        }
    });
}
function pointInfoListener(){
    $(".pointName").hover(function(){
        if(!isPointDeleting){
            $(this).children(".pointInfo").css({"height":"200px","overflow-y":"scroll","padding":"10px"});
        }
    },function(){
        if(!isPointDeleting){
            $(this).children(".pointInfo").css({"height":"","overflow":"hidden","padding":"0px"});
        }
    });
}

function gedungDeleteListener(){
    $(".gedungCB").on("click",function(){
        var tempGedungId = $(this).parent().attr("id");
        var tempoGedungId = parseInt(tempGedungId.substring(10,tempGedungId.length));
        if(!deleteGedungId.includes(tempoGedungId)){
            deleteGedungId.push(tempoGedungId);
            //console.log(deleteGedungId);
            $(this).html('<i class="fa fa-check" aria-hidden="true"></i>');
        }else{
            deleteGedungId.splice(deleteGedungId.indexOf(tempoGedungId),1);
            //console.log(deleteGedungId);
            $(this).html("");
        }
    })
}
function placeDeleteListener(){
    $(".placeCB").on("click",function(){
        var tempPlaceId = $(this).parent().attr("id");
        var tempoPlaceId = parseInt(tempPlaceId.substring(6,tempPlaceId.length));
        if(!deletePlaceId.includes(tempoPlaceId)){
            deletePlaceId.push(tempoPlaceId);
            //console.log(deletePlaceId);
            $(this).html('<i class="fa fa-check" aria-hidden="true"></i>');
        }else{
            deletePlaceId.splice(deletePlaceId.indexOf(tempoPlaceId),1);
            //console.log(deletePlaceId);
            $(this).html("");
        }
    })
}
function pointDeleteListener(){
    $(".pointCB").on("click",function(){
        var tempPointId = $(this).parent().attr("id");
        var tempoPointId = parseInt(tempPointId.substring(9,tempPointId.length));
        if(!deletePointId.includes(tempoPointId)){
            deletePointId.push(tempoPointId);
            //console.log(deletePointId);
            $(this).html('<i class="fa fa-check" aria-hidden="true"></i>');
        }else{
            deletePointId.splice(deletePointId.indexOf(tempoPointId),1);
            //console.log(deletePointId);
            $(this).html("");
        }
    })
}

function linkDeleteListener(){
    $(".linkCB").on("click",function(){
        var tempLinkId = $(this).parent().attr("id");
        var tempoLinkId = parseInt(tempLinkId.substring(8,tempLinkId.length));
        if(!deleteLinkId.includes(tempoLinkId)){
            deleteLinkId.push(tempoLinkId);
            //console.log(deleteLinkId);
            $(this).html('<i class="fa fa-check" aria-hidden="true"></i>');
        }else{
            deleteLinkId.splice(deleteLinkId.indexOf(tempoLinkId),1);
            //console.log(deleteLinkId);
            $(this).html("");
        }
    })
}


//test sek

// $(document).on("input", '#searchbargedung', function(){

// });

