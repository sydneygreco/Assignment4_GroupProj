window.onload = init();

var map;
var markers = [];
var xhr;


function init() {
  
  var lat = 49.728668;
  var long = -112.804588;
  var radius = 5;

	//fetchGeoImgs(lat,long,radius);
	
}

function fetchGeoImgs(lat,long,radius)
{
  var xhr = new XMLHttpRequest();
  var flickrQuery = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=d3f2a78f874a236b04846f0422b43e20&has_geo=1&lat="+lat+"&lon="+long+"&radius="+radius+"&per_page=8&page=1&format=json&nojsoncallback=1"; 
  //"https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=5c13c64075f89a68cebb8609bd8852a1&lat="+lat+"&lon="+long+"&radius="+radius+"&format=json&nojsoncallback=1&auth_token=72157689749217830-736010859c60003a&api_sig=43f2e8a80e2f0358d4c0988122452c8a";
	xhr.open("GET", flickrQuery, true);
  xhr.send(null);
  

	xhr.onload = function() {
		if(xhr.status == 200){ //Checks to make sure response is okay 
      var jsonObj = JSON.parse(xhr.responseText);
      console.log(jsonObj); //JSON.parse allows the data that was sent back to be understood as a JSON object
      var photoArr = jsonObj.photos.photo;

      console.log("LEN:",photoArr.length);
			for( i=0; i<photoArr.length; i++)
			{
          (function(){
            var ii = i;
            setTimeout(function(){
              //var LoCa = getImageLocation(photoArr[i].id);
              var ID = photoArr[ii].id;
              console.log("OPENING NEW REQUEST FOR ",i);

              
              var locationRequest = new XMLHttpRequest();
              var locationQuery = "https://api.flickr.com/services/rest/?method=flickr.photos.geo.getLocation&api_key=d3f2a78f874a236b04846f0422b43e20&photo_id="+ID+"&format=json&nojsoncallback=1";
              locationRequest.open("GET", locationQuery, true);
              locationRequest.send(null);
              locationRequest.onload = function()
              {
                if(locationRequest.status == 200)
                {
                  var jsonObj2 = JSON.parse(locationRequest.responseText);
                  var lat1 = parseFloat(jsonObj2.photo.location.latitude);
                  var lng1 = parseFloat(jsonObj2.photo.location.longitude);
                  addMarker(lat1,lng1); console.log("marker added for ",i);
                  //var coordinates = new google.maps.LatLng(lat,lng);
                  //console.log("LAT&LONG  ", [lat,lng]);
                } 
              }
            },1000);
          })();
      }
		}
  }
}

/*
function getImageLocation(ID){
  var lat1;
  var lng;

  var locationRequest = new XMLHttpRequest();
  var locationQuery = "https://api.flickr.com/services/rest/?method=flickr.photos.geo.getLocation&api_key=d3f2a78f874a236b04846f0422b43e20&photo_id="+ID+"&format=json&nojsoncallback=1";
  locationRequest.open("GET", locationQuery, true);
  locationRequest.send(null);
  locationRequest.onload = function()
  {
    if(locationRequest.status == 200)
    {
      var jsonObj2 = JSON.parse(locationRequest.responseText);
      //lat1 = parseFloat(jsonObj2.photo.location.latitude);
      //lng = parseFloat(jsonObj2.photo.location.longitude);
      lat1 = jsonObj2.photo.location.latitude;
      //var coordinates = new google.maps.LatLng(lat,lng);
      //return [lat,lng];
    } 
  }
  return lat1;
}
*/

function initMap() {
  var uluru = {lat: -25.363, lng: 131.044};
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: {lat: 51.0486, lng: -114.0708},
    disableDefaultUI: true, //disables default UI, streetview doesn't make sense within this app.
    styles: [
      {elementType: 'geometry', stylers: [{color: '#9B454B'}]},
      {elementType: 'labels.text.stroke', stylers: [{color: '#000000'}]},
      {elementType: 'labels.text.fill', stylers: [{color: '#F7EBEC'}]},
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{color: '#F7EBEC'}]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{color: '#F7EBEC'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{color: '#BF5725'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{color: '#F7EBEC'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{color: '#F2A97B'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{color: '#000000'}]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{color: '#F7EBEC'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{color: '#220901'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{color: '#000000'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{color: '#F7EBEC'}]
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{color: '#6D2E2F'}]
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{color: '#F7EBEC'}]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{color: '#5E7393'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{color: '#F7EBEC'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{color: '#000000'}]
      }
    ]

  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });

  var marker = new google.maps.Marker({
    position: {lat: 0, lng: 0},
    map: map
  });

  //----- In this example code, the map zooms when clicked
  map.addListener('click', function() {

    var loc = new google.maps.LatLng;
    loc = (map.getCenter()).toJSON();

    //map.setZoom(8);
    //addMarker(new google.maps.LatLng(37.7699298, -122.4469157));
    //deleteMarkers();


    fetchGeoImgs(loc.lat ,loc.lng ,2);
  });

  map.addListener('idle', function() {
    //var loc = new google.maps.LatLng;
    //loc = (map.getCenter()).toJSON();
    //loc = loc.toJSON();
    //console.log("location",loc);
    //fetchGeoImgs(loc.lat ,loc.lng ,1);
  });

  //https://developers.google.com/maps/documentation/javascript/examples/infowindow-simple note to self, look into info windows.
  //https://developers.google.com/maps/documentation/javascript/reference?hl=es
}


function addMarker(lat1,lng1) {
  var marker = new google.maps.Marker({
    position: {lat: lat1, lng: lng1},
    map: map
  });

  markers.push(marker);
}

function deleteMarkers() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  } 
  markers = [];

  console.log("DELETED");
}









// handy functions to build the url of an image according to its size
function getImageUrl (photo, format) {
	return "https://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + format + ".jpg";
}

// handy function to retrieve the original photo if available
function getOriginalImageUrl (photo) {
	return "https://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" + photo.id + "_" + photo.originalsecret + "_" + "o."+photo.originalformat;
}

// Compute precision and size according to the zoom level
function calc_precision (zoom) {
	var fixedAmount = -1;
	var size = 40;

	if (zoom > 4)
		fixedAmount = 0;

	if (zoom >= 8) {
		fixedAmount = 1;
	}

	if (zoom >= 10) {
		fixedAmount = 2;
	}

	if (zoom >= 11) {
		fixedAmount = 8;
	}

	return [fixedAmount, size];
}