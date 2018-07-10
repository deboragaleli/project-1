$(document).ready(function() {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD2FF3DfcY7m9OWWe0pON3c7QUg3CDFEwo",
    authDomain: "project-1-889d0.firebaseapp.com",
    databaseURL: "https://project-1-889d0.firebaseio.com",
    projectId: "project-1-889d0",
    storageBucket: "",
    messagingSenderId: "624996998738"
  };
  firebase.initializeApp(config);

  // Create variable to push data to firebase
  var database = firebase.database();

  // Add on.click method to buttons
  $("#quit-game").on("click", function() {
  // $("#add-train-btn").on("click", function(){}

  // Variables from user input

  });

  // Get users geolocation
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  getLocation();

  function showPosition(position) {
    // Just got the geolocation, initialize Google Maps
    initializeMap(position.coords.latitude, position.coords.longitude);
  }

  // Embed Google Maps
  var geocoder;
	var map;	
	
	// setup initial map
	function initializeMap(lat, lng) {
    $('.loader').hide();

		geocoder = new google.maps.Geocoder();						// create geocoder object
		var latlng = new google.maps.LatLng(lat, lng);		// set default lat/long (new york city)
		var mapOptions	= {													// options for map
			zoom: 20, // increase zoom to get closer
			center: latlng
		};
    map = new google.maps.Map(document.getElementById('map'), mapOptions);	// create new map in the map-canvas div
    
    var marker = new google.maps.Marker({						// place a marker on the map at the address
      map: map,
      position: { lat: lat, lng: lng }
    });

    // Get weather based on my location
    getWeather(lat, lng);
  }

  // function to get weather for an address
	function getWeather(latitude,longitude) {
		if(latitude != '' && longitude != '') {
			$("#weather").val("Retrieving weather...");										// write temporary response while we get the weather
			$.getJSON( "http://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&units=imperial&APPID=67746f8fab56a43094592085e1ce2feb", function(data) {	// add '&units=imperial' to get U.S. measurements
				var currWeather					= new Array();								// create array to hold our weather response data
				currWeather['currTemp']			= Math.round(data.main.temp);				// current temperature
				currWeather['description']		= data.weather[0].description;				// short text description (ie. rain, sunny, etc.)
				currWeather['icon']				= "http://openweathermap.org/img/w/"+data.weather[0].icon+".png";	// 50x50 pixel png icon

				var response 		= "<img src='"+currWeather['icon']+"' /> Current Weather: "+currWeather['currTemp']+"\xB0 and "+currWeather['description'];
				var spokenResponse	= "It is currently "+currWeather['currTemp']+" degrees and "+currWeather['description'];
				
				$("#weather").html(response);									// write current weather to textarea
        speakText(spokenResponse);
			});
		} else {
			return false;														// respond w/error if no address entered
		}
  }
  
  // function to speak a response
	function speakText(response) {
		
		// setup synthesis
		var msg = new SpeechSynthesisUtterance();
		var voices = window.speechSynthesis.getVoices();
		msg.voice = voices[1];					// Note: some voices don't support altering params
		msg.voiceURI = 'native';
		msg.volume = 1;							// 0 to 1
		msg.rate = 1;							// 0.1 to 10
		msg.pitch = 0;							// 0 to 2
		msg.text = response;
		msg.lang = 'en-US';
		
		speechSynthesis.speak(msg);
	}

});