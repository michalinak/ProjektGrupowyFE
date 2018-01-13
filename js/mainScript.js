var childX;
var childY;
var childId = 1;
var childSource = new ol.source.Vector();

var currentPositionStyle = new ol.style.Style({
    image: new ol.style.Icon({
        color: [255, 0, 0],
        crossOrigin: 'anonymous',
        src: 'https://openlayers.org/en/v4.1.1/examples/data/dot.png'
    })
});

function init() {
    getCurrentPosition();
    var osmMap = new ol.layer.Tile({
        source: new ol.source.OSM()
    });

    var childLayer = new ol.layer.Vector({source: childSource});

    var map = new ol.Map({
        target: 'map',
        layers: [osmMap, childLayer],
        view: new ol.View({
            center: ol.proj.fromLonLat([parseFloat(childX), parseFloat(childY)]),
            zoom: 13
        })
    });

    openNav();
    closeNav();
    setChildId();
}

function getCurrentPosition() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/coordinates/child/"+childId,
        dataType: "json",
        async: false,
        success: function (response) {
            console.log("Connected");
            var json = JSON.parse(JSON.stringify(response));
            var coordinates = json;
            var coordinatesLength = coordinates.length;
            //wyswietlanie ostatniej koordynaty
            //console.log("ostatnie koordynaty: "+coordinates[coordinatesLength-1].width+" "+coordinates[coordinatesLength-1].length);

            childX = coordinates[coordinatesLength - 1].width; //szerokosc latitude
            childY = coordinates[coordinatesLength - 1].length; //dlugosc longitude


            console.log(childX, childY);

            var childFeature = new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.fromLonLat([parseFloat(childX), parseFloat(childY)]))
            });

            childFeature.setStyle(currentPositionStyle);
            childSource.clear();
            childSource.addFeature(childFeature);

            var time = coordinates[coordinatesLength - 1].time;
            var date = coordinates[coordinatesLength - 1].date;
            $("p").text('Location time: ' + time +' date: '+ date);
        },
        error: function (e) {
            console.log("getCurrentPosition request error " + e);
            console.log("Not connected");
        }
    });
}

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
function setChildId() {
    $('#mySidenav').children('a').not('.closebtn').click(function () {
        childId = this.id;
        console.log(childId);
    });
}