var addFormPlaceOpen = false;
var addFormPointOpen = false;
var navOpen = false;
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
});

// untuk view 360
var pointId = 0;
$(".minimap").on("click",function(){
    var x = event.clientX;
    var y = event.clientY;
    console.log("X: " + x + ", Y: " + y);
    addPlace(x,y);
})
function addPlace(x,y){
    $(".minimap").append("<button id='"+pointId+"' class='mapPoint'></button>");
    if(navOpen){
        $(".minimap").children("#"+pointId).css({"left":(x-325)+"px","top":(y-6)+"px"});
    }else{
        $(".minimap").children("#"+pointId).css({"left":(x-25)+"px","top":(y-6)+"px"});
    }

    pointId++;

}
var panorama, viewer;
panorama = [];
var panoImage = document.getElementById("panorama");

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
    constructor(panorama,x,y){
            this.panorama = panorama;
            this.panorama.addEventListener('progress',function(e){
            console.log(e.progress);
        });
        viewer.add(this.panorama);
        this.child=[];
        this.miniMapPoint = THREE.Vector2(x,y);
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
}
for(var i = 1;i<=16;i++){
        var panoPath = "perpus/"+i+".jpg";
        panorama.push(new node(new PANOLENS.ImagePanorama(panoPath)));
        panorama[i-1].getPanorama().addEventListener('click',function(){
        var clickPosition = viewer.getPosition();
        console.log("X: " + clickPosition.x + " Y: " + clickPosition.y + " Z: " + clickPosition.z);
    });
}
panorama[0].addChild(panorama[1], -2605.23, -584.59, -4216.34);
panorama[1].addChild(panorama[0], 331.16, -297.56, -4970.95);
viewer.setPanorama(panorama[0].getPanorama());

// Test repeated scenario
viewer.enableControl( PANOLENS.CONTROLS.DEVICEORIENTATION );
viewer.enableEffect( PANOLENS.MODES.CARDBOARD );
viewer.enableControl( PANOLENS.CONTROLS.ORBIT );
viewer.enableEffect( PANOLENS.MODES.NORMAL );