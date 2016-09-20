function initMap() { //creates the google map using the google maps js API
  var pos;
  var mapDiv = document.getElementById('map');
  var map = new google.maps.Map(mapDiv, {
    center: pos,
    zoom: 15,
    disableDefaultUI: true
  });

  var marker = new google.maps.Marker({
    map: map,
    title: 'Current Position'
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition( function (position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      marker.setPosition(pos);
      map.setCenter(pos);
    }, function () {
      handleLocationError(true, marker, map.getCenter());
    });
  } else {
    handleLocationError(false, marker, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, marker, pos) {
  console.log(marker);
  marker.setPosition(pos);
  marker.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service has failed.' :
                        'Error: Your browser does\'t support geolocation.');
}

function centerMap(pos) {
  map.panTo(pos); //handles map centering
}
