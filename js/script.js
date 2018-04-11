window.onload = init();

function init() {
  
  var lat = 49.728668;
  var long = -112.804588;
  var radius = 20;

	fetchGeoImgs(lat,long,radius);
	
}

function fetchGeoImgs(lat,long,radius)
{
  var xhr = new XMLHttpRequest();
  var flickrQuery = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=97a809604245249b8d364eb1c158851b&lat="+lat+"&lon="+long+"&radius="+radius+"&format=json&nojsoncallback=1&auth_token=72157667636404748-8289eb56641d6f93&api_sig=72bc015493007168ccd534625a8eeb44";
	xhr.open("GET", flickrQuery, true);
	xhr.send(null);
	xhr.onload = function() {
		if(xhr.status == 200){ //Checks to make sure response is okay 

      console.log(JSON.parse(xhr.responseText)) //JSON.parse allows the data that was sent back to be understood as a JSON object
      
      /*
			for( i=0; i<2; i++)
			{
				var para = document.createElement("P");                       // Create a <p> element
				var t = document.createTextNode(array[i]);   
				para.appendChild(t);     
				document.body.appendChild(para);  
      }
      */
		}
	}
}

function initMap() {
  var uluru = {lat: -25.363, lng: 131.044};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: uluru,
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

  //----- In this example code, the map zooms when clicked
  map.addListener('click', function() {
    map.setZoom(8);
  });

  map.addListener('idle', function() {
    var loc = new google.maps.LatLng;
    loc = (map.getCenter()).toJSON();
    //loc = loc.toJSON();
    console.log("location",loc);
  });



 
  //https://developers.google.com/maps/documentation/javascript/examples/infowindow-simple note to self, look into info windows.
  //https://developers.google.com/maps/documentation/javascript/reference?hl=es

}
