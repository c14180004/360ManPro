var addFormPlaceOpen = false;
var addFormPointOpen = false;
var addFormLinkOpen = false;
var navOpen = true;
var dataPlace;
var dataPoint;
var dataTempatPoint;
var nowIdTempat = 2;
var nowIdPoint;
var pointSelected = true;
var linkSelected = true;
var pointX,pointY;
var isMinimize = false;
var pointId;
var linkId;
var clickPosition;
var selectedLinkId=-1;
var ParentLink;
var ChildLink;
var infoSpotTemp;

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

// class untuk menyimpan panorama
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
        var infospot = new PANOLENS.Infospot(300,"arrowUp.png");
        infospot.position.set(x,y,z);
        infospot.addEventListener('click',function(){
            viewer.setPanorama(panorama[j].getPanorama());
            nowIdPoint=panorama[j].getId();
            for(var i = 0;i<$(".mapPoint").length;i++){
                if($(".mapPoint").eq(i).attr("id") == panorama[j].getId()){
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




// untu side nav
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

    //remove cursor;
    pointSelected = true;
    $("*").css("cursor","");
    window.removeEventListener("mousemove",cursor);
    $("#addPoint").prop("disabled",true);
    $(".minimap").children("#"+pointId).remove();
    $(".cursorPoint").css("display","none");
    linkSelected = true;
    window.removeEventListener("mousemove",cursorLink);
    $("#addLink").prop("disabled",true);
    $(".cursorLink").css("display","none");
});

//untuk ganti tab
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

    //remove cursor;
    pointSelected = true;
    $("*").css("cursor","");
    window.removeEventListener("mousemove",cursor);
    $("#addPoint").prop("disabled",true);
    $(".minimap").children("#"+pointId).remove();
    $(".cursorPoint").css("display","none");
    linkSelected = true;
    window.removeEventListener("mousemove",cursorLink);
    $("#addLink").prop("disabled",true);
    $(".cursorLink").css("display","none");
    $("#linkDest").val("");
});



$(document).ready(function(){
    //listener untuk tab
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

    

    //fungsi untuk menambahkan tempat
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


    //fungsi untuk menambahkan point
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

    
    // fungsi untuk menambahkan link
    $("#addLink").on("click",function(){
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
                    child:selectedLinkId
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
                    var tablinks = document.getElementsByClassName("tablink");
                    for(var i = 0;i<tablinks.length;i++){
                        tablinks[i].style.backgroundColor = "";
                    } 
                    $("#linkDest").val("");
                },error:function(e){
                    alert(e);
                }
            })
        }
        
    });


    // menjalankan ini saat pertama kali load website
    getDataPlace();
    getDataPoint(nowIdTempat);
    hideMiniMap();
    panorama=[];
    $.ajax({
        url:"getPoint.php",
        type:"GET",
        dataType:"json",
        success:function(data){
            for(var i = 0;i<data.length;i++){
                var tempPano = new PANOLENS.ImagePanorama(data[i].panoImage);
                tempPano.setLinkingImage("arrowUp.png",300);
                tempPano.addEventListener('progresss',function(){
                    console.log(e.progress);
                })
                panorama.push(new node(data[i].id,tempPano));
                addPanoramaListener(i)
            }
            viewer.setPanorama(panorama[0].getPanorama());
            nowIdTempat=panorama[0].getId();
            $(".placeName").eq(0).click();
            // Test repeated scenario
            viewer.enableControl( PANOLENS.CONTROLS.DEVICEORIENTATION );
            viewer.enableEffect( PANOLENS.MODES.CARDBOARD );
            viewer.enableControl( PANOLENS.CONTROLS.ORBIT );
            viewer.enableEffect( PANOLENS.MODES.NORMAL );

        }
    });
});
//add panorama ke list panorama
function addPanorama(){
    panorama = [];
    $.ajax({
        url:"getPoint.php",
        type:"GET",
        dataType:"json",
        success:function(data){
            alert("hello1");
            for(var i = 0;i<data.length;i++){
                var tempPano = new PANOLENS.ImagePanorama(data[i].panoImage);
                tempPano.setLinkingImage("arrowUp.png",300);
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
//listener jika panorama di tekan
function addPanoramaListener(j){
    panorama[j].getPanorama().addEventListener('click',function(){
        if(!linkSelected){
            clickPosition = viewer.getPosition();
            console.log("X: " + clickPosition.x + " Y: " + clickPosition.y + " Z: " + clickPosition.z);
            
            infoSpotTemp = new PANOLENS.Infospot(300,"arrowUp.png");
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
//mengambil data tempat dan memberi event listener
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
                        getDataPoint(nowIdTempat);
                    }
                }
                getPointId();
            });
        }
    });
}
//toggle hide and show minimap
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
// mendapatkan data point di minimap dan memberi event listener
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
                    $(".minimap").append("<button id='"+dataPoint[j].id+"' class='mapPoint'></button>");
                    if(navOpen){
                        $(".minimap").children("#"+dataPoint[j].id).css({"left":(dataPoint[j].x-320)+"px","top":(dataPoint[j].y)+"px"});
                    }else{
                        $(".minimap").children("#"+dataPoint[j].id).css({"left":(dataPoint[j].x-20)+"px","top":(dataPoint[j].y)+"px"});
                    }
                    str += "<li id='"+dataPoint[j].id+"' class='pointName'>"+dataPoint[j].nama+"</li>";
                    str1 +="<li id='"+dataPoint[j].id+"' class='pointLinkName'>"+dataPoint[j].nama+"</li>";
                }
            }
            $("#ListPoint").html(str);
            $("#ListPointLink").html(str1);
            $(".mapPoint").eq(0).css("background-color","green");
            for(var i = 0;i<panorama.length;i++){
                if(panorama[i].getId() == nowIdPoint){
                    viewer.setPanorama(panorama[i].getPanorama());
                    addPanoramaListener(i);
                }
            }
            getLinkPoint();
            $(".pointName").on("click",function(){
                nowIdPoint = this.id;
                for(var i = 0;i<$(".mapPoint").length;i++){
                    if($(".mapPoint").eq(i).attr("id") == this.id){
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
            });
            $(".mapPoint").on("click",function(){
                nowIdPoint = this.id;
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
                selectedLinkId=this.id;
                $("#linkDest").val($(this).text());
            });
            getLinkPoint();
        }
        ,error:function(a){
            console.log(a);
        }
    });
}
// mendapatkan data arrow di panorama
function getLinkPoint(){
    var tempParent;
    for(var k=0;k<panorama.length;k++){
        if(panorama[k].getId() == nowIdPoint){
            tempParent = panorama[k];  
        }
    }
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



// untuk view 360



