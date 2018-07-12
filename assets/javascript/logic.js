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

  // Create variable to push data to firebase
  var database = firebase.database();

  // recognizes value of email and password inputgit branch
  $("#login").click(function () {
    var emailInput = $("#email").val();
    var passwordInput = $("#password").val();

    //prevents inputs from being empty
    console.log('emailInput');
    if (emailInput == 0) {
      $(".loginErrorp").text("Please provide a valid email!");

    } else {
      $(".loginErrorp").text();
    }

    if (passwordInput == 0) {
      $(".loginErrore").text("Please provide a valid password!");
    }
  });

  $("#register").click(function () {
    var emailInput = $("#email").val();
    var passwordInput = $("#password").val();

    console.log('emailInput');
    if (emailInput == 0) {
      $(".loginErrorp").text("Please provide a valid email!");
    }

    if (passwordInput == 0) {
      $(".loginErrore").text("Please provide a valid password!");
    }
  });

  // Validates email
  $('#email').on('input', function () {
    var input = $(this);
    var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var is_email = re.test(input.val());
    if (is_email) {;
    } else {
      $(".loginErrorp").text("Please provide a valid email!");
    }
  });

  /* var ref = new Firebase('https://project-1-889d0.firebaseio.com/');
   ref.authWithPassword({
     email    : emailInput,
     password : passwordInput
   }, function(error, authData) {
     if (error) {
       console.log("Login Failed!", error);
     } else {
       console.log("Authenticated successfully with payload:", authData);
     }
   });*/
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });

  firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });

  firebase.auth().signOut().then(function () {
    // Sign-out successful.
  }).catch(function (error) {
    // An error happened.
  });


  // 2. Button for adding user info
  $("#register").on("click", function () {

    // Grabs user input and assign to variables
    var emailRegister = $("#email").val().trim();
    var passwordRegister = $("#login").val().trim();

    // Test for variables entered
    console.log(emailRegister);
    console.log(passwordRegister);

    // Creates local "temporary" object for holding train data
    // Will push this to firebase
    var newUser = {
      user: emailRegister,
      password: passwordRegister,
    }

    // pushing trainInfo to Firebase
    database.ref().push(newUser);

    // clear text-boxes
    $("#email").val("");
    $("#password").val("");

    // Prevents page from refreshing
    return false;
  });


  database.ref().on("child_added", function (childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());

    // assign firebase variables to snapshots.
    var firebaseName = childSnapshot.val().user;
    var firebasePassword = childSnapshot.val().password;
  });


  // // Logic for 1st screen when firebase is ready - Debora
  // $("#container").on("click", function() {
  //   $("#container").hide();
  //   $("container-page2").show();
  // });

  // Logic for the 2nd screen
  $('#container-page2').on('click', function () {
    $('#container-page2').hide();
    $('#container-page3').show();
    getLocation();
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

    geocoder = new google.maps.Geocoder(); // create geocoder object
    var latlng = new google.maps.LatLng(lat, lng); // set default lat/long 
    var mapOptions = { // options for map
      zoom: 20, // increase zoom to get closer
      center: latlng
    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions); // create new map in the map-canvas div

    var marker = new google.maps.Marker({ // place a marker on the map at the location
      map: map,
      position: {
        lat: lat,
        lng: lng
      }
    });

    // Get weather based on my location
    getWeather(lat, lng);
  }

  // function to get weather for an address
  function getWeather(latitude, longitude) {
    if (latitude != '' && longitude != '') {
      $("#weather").val("Retrieving weather..."); // write temporary response while we get the weather
      $.getJSON("https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&units=imperial&APPID=67746f8fab56a43094592085e1ce2feb", function (data) { // add '&units=imperial' to get U.S. measurements
        var currWeather = new Array(); // create array to hold our weather response data
        currWeather['currTemp'] = Math.round(data.main.temp); // current temperature
        currWeather['description'] = data.weather[0].description; // short text description (ie. rain, sunny, etc.)
        currWeather['icon'] = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png"; // 50x50 pixel png icon

        var response = "<img src='" + currWeather['icon'] + "' /> Current Weather: " + currWeather['currTemp'] + "\xB0 and " + currWeather['description'];
        var spokenResponse = "It is currently " + currWeather['currTemp'] + " degrees and " + currWeather['description'];

        $("#weather").html(response); // write current weather to textarea
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
    msg.volume = 1; // 0 to 1
    msg.rate = 1; // 0.1 to 10
    msg.pitch = 0; // 0 to 2
    msg.text = response;
    msg.lang = 'en-US';

    speechSynthesis.speak(msg);
  }
  // Append opponent info to table on page  //
  $("#user-name").append("firebaseName");
  $("#user-locations").append("3" + "/5");
  $("#player-stats > tbody").append("<tr><td>" + "firbase.data" + "</td><td>" + "4/5" + "</td></tr>");
  $("#player-stats > tbody").append("<tr><td>" + "Friend" + "</td><td>" + "3/5" + "</td></tr>");
  $("#player-stats > tbody").append("<tr><td>" + "Princess T" + "</td><td>" + "1/5" + "</td></tr>");

})

// $( function() {
//   $( "#speed" ).selectmenu();

//   $( "#files" ).selectmenu();

//   $( "#number" )
//     .selectmenu()
//     .selectmenu( "menuWidget" )
//       .addClass( "overflow" );

//   $( "#salutation" ).selectmenu();
// });