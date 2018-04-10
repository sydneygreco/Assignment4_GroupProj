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
      {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{color: '#263c3f'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{color: '#6b9a76'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{color: '#38414e'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{color: '#212a37'}]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{color: '#9ca5b3'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{color: '#746855'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{color: '#1f2835'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{color: '#f3d19c'}]
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{color: '#2f3948'}]
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{color: '#17263c'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{color: '#515c6d'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{color: '#17263c'}]
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
