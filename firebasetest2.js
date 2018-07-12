var database = firebase.database();

  var name = "";
  var role = "";
  

    $("#run-search").on("click", function(event) {
        event.preventDefault();
// storing data from recent user
        username = $("#email").val().trim();
        password = $("#password").val().trim();
        

    // intitial data to firebase
    database.ref().push({
        name: name,
        role: role,
        startDate: startDate,
        monthlyRate: monthlyRate,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    })

    });
 
    database.ref().on("child_added", function(childSnapshot) {

        console.log(childSnapshot.val());
        console.log(childSnapshot.val().name);
        console.log(childSnapshot.val().role);
        console.log(childSnapshot.val().startDate);
        console.log(childSnapshot.val().monthlyRate);
        console.log(childSnapshot.val().dateAdded);

        // $("#").text(snapshot.val().);
        // $("#").text(snapshot.val().);
        // $("#").text(snapshot.val().);
        // $("#").text(snapshot.val().);
        // $("#").text(snapshot.val().);
        // $("#").text(snapshot.val().);
         $("#employee").text(childSnapshot.val().name);
         $("#role").text(childSnapshot.val().role);
         $("#start").text(snapshot.val().startDate);
         $("#monthly-rate").text(snapshot.val().monthlyRate);



    }, function(errorObjects) {
        console.log("Errors handled: " + errorObject.code);
    
    });