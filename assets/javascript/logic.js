$(document).ready(function () {
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

  $('#container-page2').hide();

  // Create variable to push data to firebase
  var database = firebase.database();

  // recognizes value of email and password inputgit branch
  $("#login").click(function () {
    var emailInput = $("#email").val();
    var passwordInput = $("#password").val();

    //prevents inputs from being empty
    if (emailInput == 0) {
      $(".loginErrorp").text("Please provide a valid email!");
      return;
    } else {
      $(".loginErrorp").text();
    }

    if (passwordInput == 0) {
      $(".loginErrore").text("Please provide a valid password!");
      return;
    } else {
      $(".loginErrore").text();
    }

    var isEmailValid = false;
    var isPasswordValid = false;

    // Check if user exists in the database
    database.ref('users')
      .orderByChild("user").equalTo(emailInput)
      .on("child_added", function(snapshot) {
        isEmailValid = true;
      });

      console.log('isEmailValid', isEmailValid);

    // Check if password is valid if email is valid
    if (isEmailValid) {
      database.ref('users')
        .orderByChild("password").equalTo(passwordInput)
        .on("child_added", function(snapshot) {
          isPasswordValid = true;
        });

        console.log('isPasswordValid', isPasswordValid);

      if (isEmailValid && !isPasswordValid) {
        $(".loginErrorp").text("Wrong password!");
      }
    }

    // User Logged, let's save the user on the activeUsers key
    if (isEmailValid && isPasswordValid) {
      addUserToActiveUser(emailInput);
    }
  });

  function addUserToActiveUser(user) {
    // close container 1
    $('#container-page1').hide();

    // open container 2
    $('#container-page2').show();

    var newActiveUser = {
      user: user
    }

    database.ref('activeUsers').push(newActiveUser);
  }

  //validates email
  function validateEmail(email) {
    console.log('validateEmail1!!');
    var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var is_email = re.test(email);
    console.log('is_email', is_email);
    return is_email;
  }

  $("#register").on("click", function () {
    // Grabs user input and assign to variables
    var emailRegister = $("#email").val().trim();
    var passwordRegister = $("#password").val().trim();

    // Run function with regular expression to validate email
    if (!validateEmail(emailRegister)) {
      $(".loginErrorp").text("Please provide a valid email!");
      return;
    } else {
      $(".loginErrorp").text("");
    }

     // passwordRegister.length is 0 which is FALSY in JavaScript, we are using the NOT operator (!) in order to satisfy this conditional and display the error message
    if (!passwordRegister.length) {
      $(".loginErrore").text("Please provide a valid password!");
      return;
    } else {
      $(".loginErrore").text("");
    }

    // Will push this to firebase
    var newUser = {
      user: emailRegister,
      password: passwordRegister,

    }

    database.ref('users').push(newUser);
    addUserToActiveUser(emailRegister);

    // clear text-boxes
    $("#email").val("");
    $("#password").val("");


    // Prevents page from refreshing
    return false;
  });

  database.ref('users').on("child_added", function (childSnapshot, prevChildKey) {

    // assign firebase variables to snapshots.
    var firebaseName = childSnapshot.val().user;

    // Append opponent info to table on page  //
    // $("#user-locations").append("3" + "/5");
    $("#player-stats > tbody").append("<tr><td>" + firebaseName + "</td><td>" + "4/5" + "</td></tr>");

  });


  $('#play-game').on('click', function () {
    $('#container-page2').hide();
    $('#container-page3').show();

    getLocation();
  });

  $('#how-to-play').on('click', function () {
    $('#container-page2').hide();
    $('#how-to-play-container').show();
  });

  $('#go-back-button').on('click', function () {
    $('#container-page2').show();
    $('#how-to-play-container').hide();
  });

  // Get users geolocation
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

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
    var latlng = new google.maps.LatLng(lat, lng);		// set default lat/long
    var mapOptions = {													// options for map
      zoom: 20, // increase zoom to get closer
      center: latlng
    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);	// create new map in the map-canvas div

    var marker = new google.maps.Marker({						// place a marker on the map at the location
      map: map,
      position: { lat: lat, lng: lng }
    });

    // Get weather based on my location
    getWeather(lat, lng);
  }

  // function to get weather for an address
  function getWeather(latitude, longitude) {
    if (latitude != '' && longitude != '') {
      $("#weather").val("Retrieving weather...");										// write temporary response while we get the weather
      $.getJSON("https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&units=imperial&APPID=67746f8fab56a43094592085e1ce2feb", function (data) {	// add '&units=imperial' to get U.S. measurements
        var currWeather = new Array();								// create array to hold our weather response data
        currWeather['currTemp'] = Math.round(data.main.temp);				// current temperature
        currWeather['description'] = data.weather[0].description;				// short text description (ie. rain, sunny, etc.)
        currWeather['icon'] = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";	// 50x50 pixel png icon

        var response = "<img src='" + currWeather['icon'] + "' /> Current Weather: " + currWeather['currTemp'] + "\xB0 and " + currWeather['description'];
        var spokenResponse = "It is currently " + currWeather['currTemp'] + " degrees and " + currWeather['description'];

        $("#weather").html(response);									// write current weather to textarea
        speakText(spokenResponse);
      });
    } else {
      return false;
    }
  }

  // function to speak a response
  function speakText(response) {

    // setup synthesis
    var msg = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
    msg.voice = voices[1];
    msg.voiceURI = 'native';
    msg.volume = 1;							// 0 to 1
    msg.rate = 1;							// 0.1 to 10
    msg.pitch = 0;							// 0 to 2
    msg.text = response;
    msg.lang = 'en-US';

    speechSynthesis.speak(msg);
  }

});

