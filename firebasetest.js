$(document).ready(function () {
	// 1. Link to Firebase
	var userData = firebase.userData();

	// 2. Button for adding Trains
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
		userData.ref().push(newUser);

		// clear text-boxes
		$("#email").val("");
		$("#password").val("");


		// Prevents page from refreshing
		return false;
	});

	userData.ref().on("child_added", function (childSnapshot, prevChildKey) {

		console.log(childSnapshot.val());

		// assign firebase variables to snapshots.
		var firebaseName = childSnapshot.val().user;
		var firebasePassword = childSnapshot.val().password;


		// Append opponent info to table on page  //
		$("#user-name").append("firebaseName");
		$("#user-locations").append("3" + "/5");
		$("#player-stats > tbody").append("<tr><td>" + "firbase.data" + "</td><td>" + "4/5" + "</td></tr>");
		$("#player-stats > tbody").append("<tr><td>" + "Friend" + "</td><td>" + "3/5" + "</td></tr>");
		$("#player-stats > tbody").append("<tr><td>" + "Princess T" + "</td><td>" + "1/5" + "</td></tr>");


	});
});
