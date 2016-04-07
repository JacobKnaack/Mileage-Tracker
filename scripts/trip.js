var startPos;
var miles;
var meterToggle = false;

window.onload = function() {
  navigator.geolocation.getCurrentPosition (function (position) {
    startPos = position;
    document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    document.getElementById('startLon').innerHTML = startPos.coords.longitude;
  }, function (error) {
    alert('Error Occured: error code: ' + error.code);
  })
}

navigator.geolocation.watchPosition(function(position) {
  document.getElementById('currentLat').innerHTML = position.coords.latitude;
  document.getElementById('currentLon').innerHTML = position.coords.longitude;
  document.getElementById('distance').innerHTML =
    calculateDistance(startPos.coords.latitude, startPos.coords.longitude,
                      position.coords.latitude, position.coords.longitude);
})

function calculateDistance(lat1, lon1, lat2, lon2) {
  var R = 6371;
  var dLat = (lat2 - lat1).toRad();
  var dLon = (lon2 - lon1).toRad();
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}
Number.prototype.toRad = function () {
  return this * Math.PI / 180;
}

function showMeter() {
  if (meterToggle == false) {
    $('#tripmeter').fadeIn(500);
    meterToggle = true;
  } else {
    $('#tripmeter').fadeOut(500);
    meterToggle = false;
  }
}

function mileageInput() {
  //brings up an input form to submit odometer mileage
  $('#inputForm').fadeIn(1000);
  $('#inputForm').submit(function () {
    miles = $('#miles').val();
    $('#userInput').html(miles);
    $('#inputForm').fadeOut(1000);
    $('#start').hide();
    $('#end').show();
    count();
    return false;
  })
}

function count() {
  //counts miles as you drive
  console.log('count started');

}
