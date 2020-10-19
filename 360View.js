var addFormPlaceOpen = false;
var addFormPointOpen = false;
var navOpen = true;
var dataPlace;
var dataPoint;
var dataTempatPoint;
var nowIdTempat = 2;
var nowIdPoint;
var pointSelected = true;
var pointX,pointY;

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
    addChild(node,x,y,z){
            var infospot = new PANOLENS.Infospot(300,PANOLENS.DataImage.Info);
            infospot.position.set(x,y,z);
            infospot.addEventListener('click',function(){
            viewer.setPanorama(node.getPanorama());
        })
        this.panorama.add(infospot);
        this.child.push(node);
    }
    getChild(i){
        return this.child[i];
    }
    getId(){
        return this.id;
    }
}
for(var i = 1;i<=16;i++){
        var panoPath = "perpus/"+i+".jpg";
        panorama.push(new node(0,new PANOLENS.ImagePanorama(panoPath)));
        panorama[i-1].getPanorama().addEventListener('click',function(){
        var clickPosition = viewer.getPosition();
        console.log("X: " + clickPosition.x + " Y: " + clickPosition.y + " Z: " + clickPosition.z);
    });
}
panorama[0].addChild(panorama[1], -2605.23, -584.59, -4216.34);
panorama[1].addChild(panorama[0], 331.16, -297.56, -4970.95);




//ajax edit
$(".sideNavOpen").on("click",function(){
    $(".sideNav").css("width","300px");
    $(".canvas").css("left","300px");
    navOpen = true;
});
$(".sideNavClose").on("click",function(){
    $(".sideNav").css("width","0");
    $(".canvas").css("left","0");
    $(".addFormPlace").css({"height":"0"});
    addFormPlaceOpen = false;
    $(".addFormPoint").css({"height":"0"});
    addFormPointOpen = false;
    navOpen = false;
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

});
$(document).ready(function(){
    
    $(".tablink").eq(0).css("background-color","#444");
    $("#Place").css("display","block");

    $(".addPlace").on("click",function(){
        if(!addFormPlaceOpen){
            $(".addFormPlace").css({"height":"340px"});
            addFormPlaceOpen = true;
        }else{
            $(".addFormPlace").css({"height":"0"});
            addFormPlaceOpen = false;
        }
        
    }); 
    $(".addPoint").on("click",function(){
        if(!addFormPointOpen){
            $(".addFormPoint").css({"height":"340px"});
            addFormPointOpen = true;
        }else{
            $(".addFormPoint").css({"height":"0"});
            addFormPointOpen = false;
        }
    });
    $(".addLink").on("click",function(){
        
    });

    

    //ajax
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
                    getDataPlace()
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
                        addPanorama();
                        getDataPoint(nowIdTempat); 
                    }
                });
            }
        }else{
            alert("select point");
        }
    });
    addPanorama();
    getDataPlace();
    getDataPoint(nowIdTempat);
    
});

function addPanorama(){
    panorama = [];
    $.ajax({
        url:"getPoint.php",
        type:"GET",
        dataType:"json",
        success:function(data){
            for(var i = 0;i<data.length;i++){
                panorama.push(new node(data[i].id,new PANOLENS.ImagePanorama(data[i].panoImage)));
            }
        }
    })
}
function getDataPlace(){
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
                str += "<li id='"+temp.id+"' class='placeName'>"+temp.nama+"</li>";
            }
            listPlace.html(str);
            $(".placeName").on("click",function(){
                nowIdTempat = this.id;
                for(var i=0;i<dataPlace.length;i++){
                    if(dataPlace[i].id == nowIdTempat){
                        str = "";
                        str +='<h2 class="judulMap">'+dataPlace[i].nama+'</h2><img src="'+dataPlace[i].image+'" id="minimap" width="300px", height="300px">';
                        $(".minimap").html(str);
                        $("#minimap").on("click",function(){
                            if(!pointSelected){
                                var x = event.clientX;
                                var y = event.clientY;
                                console.log("X: " + x + ", Y: " + y);
                                addPlace(x,y);
                            }
                        })
                        getDataPoint(nowIdTempat);
                    }
                }
                getPointId();
                pointSelected = true;
                $("*").css("cursor","");
                window.removeEventListener("mousemove",cursor);
                $("#addPoint").prop("disabled",true);
                $(".minimap").children("#"+pointId).remove();
                $(".cursorPoint").css("display","none");
            });
        }
    });
}
function getDataPoint(nowIdTempat){
    $.ajax({
        url:"getPoint.php",
        type:"GET",
        dataType:"json",
        success: function(data){
            dataPoint = data;
            var str = "";
            for(var j = 0;j<dataPoint.length;j++){
                if(dataPoint[j].idTempat == nowIdTempat){
                    $(".minimap").append("<button id='"+dataPoint[j].id+"' class='mapPoint'></button>");
                    if(navOpen){
                        $(".minimap").children("#"+dataPoint[j].id).css({"left":(dataPoint[j].x-320)+"px","top":(dataPoint[j].y)+"px"});
                    }else{
                        $(".minimap").children("#"+dataPoint[j].id).css({"left":(dataPoint[j].x-20)+"px","top":(dataPoint[j].y)+"px"});
                    }
                    str += "<li id='"+dataPoint[j].id+"' class='pointName'>"+dataPoint[j].nama+"</li>";
                }
            }
            $("#ListPoint").html(str);
            $(".pointName").on("click",function(){
                nowIdPoint = this.id;
                for(var i = 0;i<panorama.length;i++){
                    if(panorama[i].getId() == nowIdPoint){
                        viewer.setPanorama(panorama[i].getPanorama());
                    }
                }
            });
            $(".mapPoint").on("click",function(){
                nowIdPoint = this.id;
                for(var i = 0;i<panorama.length;i++){
                    if(panorama[i].getId() == nowIdPoint){
                        viewer.setPanorama(panorama[i].getPanorama());
                    }
                }
            });
        }
        ,error:function(a){
            console.log(a);
        }
    });
}

var pointId;
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
    $(".minimap").append("<button id='"+pointId+"' class='mapPoint'></button>");
    if(navOpen){
        $(".minimap").children("#"+pointId).css({"left":(x-320)+"px","top":(y)+"px"});
    }else{
        $(".minimap").children("#"+pointId).css({"left":(x-20)+"px","top":(y)+"px"});
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



// untuk view 360




// Test repeated scenario
viewer.enableControl( PANOLENS.CONTROLS.DEVICEORIENTATION );
viewer.enableEffect( PANOLENS.MODES.CARDBOARD );
viewer.enableControl( PANOLENS.CONTROLS.ORBIT );
viewer.enableEffect( PANOLENS.MODES.NORMAL );