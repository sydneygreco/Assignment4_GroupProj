window.onload = init;

//function init() {
    function initMap() {
        var uluru = {lat: 49.69349, lng: -112.84184};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
      }
//}