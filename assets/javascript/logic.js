// $(document).ready(function () {

//       // Initialize Firebase
//       var config = {
//         apiKey: "AIzaSyD2FF3DfcY7m9OWWe0pON3c7QUg3CDFEwo",
//         authDomain: "project-1-889d0.firebaseapp.com",
//         databaseURL: "https://project-1-889d0.firebaseio.com",
//         projectId: "project-1-889d0",
//         storageBucket: "",
//         messagingSenderId: "624996998738"
//       };
//       firebase.initializeApp(config);

//       // Create variable to push data to firebase
//       var database = firebase.database();

//       // Variables

//       // Array for predetermined game locations
//       var gpsLocation = [];


//       // Loop for radomly generating locations for random routes
//       for (var i = 0; i < gpsLocation; i++) {
//         console.log(gpsLocation.length);
//       }

//       // Add on.click method to buttons
//       $("#quit-game").on("click", function () {
//           // $("#add-train-btn").on("click", function(){}

//           // Variables from user input

//       }
//   })



  // User object array.  Each user object info is pushed into array.
//   var = playersList [ {
    
//     userName: "Nemesis",
//     locationsVisited: "4" ,
//     gpsLocation: "",
//     weather: "",
    
//   }, {
//     userName: "",
//     locationsVisited:  ,
//     gpsLocation: "",
//   }


// ]

// Append opponent info to table on page  //
$("#user-name").append("Me");
$("#user-locations").append("3" + "/5");
$("#player-stats > tbody").append("<tr><td>" + "Nemesis" + "</td><td>" + "4/5" + "</td></tr>");
$("#player-stats > tbody").append("<tr><td>" + "Friend" + "</td><td>" + "3/5" + "</td></tr>");
$("#player-stats > tbody").append("<tr><td>" + "Princess T" + "</td><td>" + "1/5" + "</td></tr>");