// user long and lat 
var x = document.getElementById("demo");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude;
}
getLocation();



// directions
function initMap() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 20,
      center: {lat: 28.5241711, lng: -81.4640975}
    });
    directionsDisplay.setMap(map);

    document.getElementById('submit').addEventListener('click', function() {
      calculateAndDisplayRoute(directionsService, directionsDisplay);
    });
  }

  function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    var waypts = [];
    var checkboxArray = document.getElementById('waypoints');
    for (var i = 0; i < checkboxArray.length; i++) {
      if (checkboxArray.options[i].selected) {
        waypts.push({
          location: checkboxArray[i].value,
          stopover: true
        });
      }
    }

    directionsService.route({
      origin: document.getElementById('start').value,
      destination: document.getElementById('waypoints').value,
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
        var route = response.routes[0];
        var summaryPanel = document.getElementById('directions-panel');
        summaryPanel.innerHTML = '';
        // For each route, display summary information.
        for (var i = 0; i < route.legs.length; i++) {
          var routeSegment = i + 1;
          summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
              '</b><br>';
          summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
        //   summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
          summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
        }
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }