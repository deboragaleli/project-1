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
    console.log("Latitude: " + position.coords.latitude + "Longitude: " + position.coords.longitude); 
  }

});