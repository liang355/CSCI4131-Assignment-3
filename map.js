/**
 * Created by yingbinliang on 10/11/15.
 */

var building = [];
building[0] = {
    name: "Armory",
    architect: "Charles Aldrich",
    description: "Built for athletics and military drill, as well as performing arts and social activities. Memorial" +
    " plaques at the front entrance honor students, faculty, and alumni who fought in the Spanish-American War.",
    year: 1896,
    imgSrc: "Assignment3-Datafiles/building_images/armory.jpg",
    latLng: {lat: 44.977276, lng: -93.232266}
};
building[1] = {
    name: "Pillsbury Hall",
    architect: "Leroy Buffington with Harvey Ellis",
    description: "Built as Science Hall. Named for Governor John S. Pillsbury.",
    year: 1889,
    imgSrc: "Assignment3-Datafiles/building_images/pillsbury.jpg",
    latLng: {lat: 44.977018, lng: -93.234444}
};
building[2] = {
    name: "Folwell Hall",
    architect: "Clarence H. Johnston, Sr.",
    description: "When Old Main burned in 1904, Folwell Hall was built to house displaced departments. Named for " +
    "William Watts Folwell, first president of the University, 1869-84.",
    year: 1907,
    imgSrc: "Assignment3-Datafiles/building_images/folwell.jpg",
    latLng: {lat: 44.978354, lng: -93.234409}
};
building[3] = {
    name: "Jones Hall",
    architect: "Charles Aldrich",
    description: "Built as Physics Building. Named for Frederick S. Jones, professor of physics and dean of " +
    "the College of Engineering.",
    year: 1901,
    imgSrc: "Assignment3-Datafiles/building_images/jones.jpg",
    latLng: {lat: 44.977995, lng: -93.235415}
};
building[4] = {
    name: "Pillsbury Statue",
    architect: "Daniel C. French, sculptor",
    description: "Pillsbury statue located across the street from Burton Hall.",
    year: 1900,
    imgSrc: "Assignment3-Datafiles/building_images/statue.jpg",
    latLng: {lat: 44.978239, lng: -93.236964}
};
building[5] = {
    name: "Wesbrook Hall",
    architect: "Frederick Corser",
    description: "Built as Laboratory of Medical Science. In 1912, dentistry moved here. Named for Frank Wesbrook, " +
    "professor of pathology and bacteriology and dean of the College of Medicine and Surgery.",
    year: 1898,
    imgSrc: "Assignment3-Datafiles/building_images/wesbrook.jpg",
    latLng: {lat: 44.976662, lng: -93.236310}
};
building[6] = {
    name: "Nicholson Hall",
    architect: "LeRoy Buffington with Harvey Ellis",
    description: "Built as chemical laboratory. In 1914, chemistry moved to the mall area and Nicholson was " +
    "remodeled for the men's union until Coffman Memorial Union was built as a coed student union. Named for " +
    "Edward E. Nicholson, professor of chemistry and later dean of Student Affairs.",
    year: 1890,
    imgSrc: "Assignment3-Datafiles/building_images/nicholson.jpg",
    latLng: {lat: 44.977197, lng: -93.235973}
};
building[7] = {
    name: "Eddy Hall",
    architect: "LeRoy Buffington",
    description: "Built as Mechanic Arts. It is the oldest existing building on campus. Named for Henry Turner Eddy, " +
    "professor of engineering and mathematics and dean of the Graduate School.",
    year: 1886,
    imgSrc: "Assignment3-Datafiles/building_images/eddy.jpg",
    latLng: {lat: 44.977679, lng: -93.236707}
};
building[8] = {
    name: "Music Education",
    architect: "Warren H. Hayes",
    description: "Built as Student Christian Association building. Acquired by the University, it housed Child " +
    "Welfare and Music Education.",
    year: 1888,
    imgSrc: "Assignment3-Datafiles/building_images/music.jpg",
    latLng: {lat: 44.971201, lng: -93.241777}
};
building[9] = {
    name: "Wulling Hall",
    architect: "Allen Stem and Charles Reed",
    description: "Built as Medical Hall; named Millard Hall in 1906. Fire damaged the building. It later became " +
    "the site for the pharmacy building. Named for Frederick J. Wulling, first dean and founder of the College of Pharmacy.",
    year: 1892,
    imgSrc: "Assignment3-Datafiles/building_images/wulling.jpg",
    latLng: {lat: 44.976306, lng: -93.237437}
};

var myIcon = "Assignment3-Datafiles/icon.png";
var markers = [];
var infoWindows = [];

//initialize a map--------------------------------------------------------------------------------------------------
function initMap() {
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var directionsService = new google.maps.DirectionsService;

    var i;
    var img = document.getElementById("image");
    var rapsonHall = {lat: 44.977271, lng: -93.234933};
    var originLatLng;

    var myMap = new google.maps.Map(document.getElementById('map'), {
        center: rapsonHall,
        zoom: 16
    });
    directionsDisplay.setMap(myMap);
    document.getElementById('mode').addEventListener('change', function() {
        calculateAndDisplayRoute(directionsService, directionsDisplay, originLatLng);
    });
    document.getElementById('building').addEventListener('change', function() {
        calculateAndDisplayRoute(directionsService, directionsDisplay, originLatLng);
    });

    //create marker and corresponding info window for each building-----------------------------------------------------
    for(i=0; i<building.length; i++){
        var myMarker = new google.maps.Marker({
            map: myMap,
            icon: myIcon,
            position: building[i].latLng,
            title: building[i].name
        });
        var infoWindow = new google.maps.InfoWindow({
            content: "<h1 id = \"buildingText\">" + building[i].name + "</h1>" + "<br>" +
                "<img id = \'image\' src=" + building[i].imgSrc + ">" +
                "<p id = \'architectText\'>" + "<b>" + "Architect: " + "</b>" + building[i].architect + "</p>" +
                "<p id = \'descriptionText\'>" + building[i].description + "</p>"
        });

        infoWindows.push(infoWindow);
        clickMarker(myMarker, infoWindow);
    }

    //Drop Marker by listening to onClick event on map object----------------------------------------------------------
    google.maps.event.addListener(myMap, 'click', function(event) {
        var newMarker = new google.maps.Marker({
            map: myMap,
            position: event.latLng,
            title: "coordinates: " + event.latLng.toString()
        });

        var newInfoWindow = new google.maps.InfoWindow({
            content: newMarker.title
        });

        var clickInfoWindow = new google.maps.InfoWindow({
            content: "Hello"
        });

        removeMarkers();
        markers.push(newMarker);
        originLatLng = newMarker.position;

        clickMarker(newMarker, clickInfoWindow);
        mouseoutMarker(newMarker, newInfoWindow);
        mouseoverMarker(newMarker, newInfoWindow);
    });

    myMap.addListener('click', function(){
        calculateAndDisplayRoute(directionsService, directionsDisplay, originLatLng);
    });
}

//Mouse event listeners-------------------------------------------------------------------------------------------------
function mouseoutMarker(newMarker, newInfoWindow){
    newMarker.addListener('mouseout', function(){
        newInfoWindow.close();
    })
}

function mouseoverMarker(newMarker, newInfoWindow){
    newMarker.addListener('mouseover', function(){
        newInfoWindow.open(newMarker.get("map"), newMarker);
    })
}

function clickMarker(myMarker, infoWindow){
    removeInfoWindows();
    myMarker.addListener('click', function(){
        infoWindow.open(myMarker.get("map"), myMarker);
    })
}

function removeMarkers(){
    var i;
    if(markers !== []){
        for(i=0; i < markers.length; i++){
            markers[i].setMap(null);
        }
    }
}

function removeInfoWindows(){
    var i;
    for(i=0; i < infoWindows.length; i++){
        infoWindows[i].close();
    }
}

//Calculate and display route-------------------------------------------------------------------------------------------
function calculateAndDisplayRoute(directionsService, directionsDisplay, originLocation) {
    var selectedMode = document.getElementById('mode').value;
    var index = document.getElementById('building').value;
    directionsService.route({
        origin: originLocation,
        destination: building[index].latLng,
        travelMode: google.maps.TravelMode[selectedMode]
    }, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}






