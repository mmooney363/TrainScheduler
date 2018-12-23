var config = {
    apiKey: "AIzaSyDn6aybSb8Fd9QZJAcWNX4ayRbPBWhZJN8",
    authDomain: "train-schedule-be33f.firebaseapp.com",
    databaseURL: "https://train-schedule-be33f.firebaseio.com",
    projectId: "train-schedule-be33f",
    storageBucket: "train-schedule-be33f.appspot.com",
    messagingSenderId: "726675221232"
  };
  firebase.initializeApp(config);

var dataRef = firebase.database();


var trainName = "";
var destination = "";
var trainTime = "";
var freq = 0;

$("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
  
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var trainTime = $("#first-time-input").val().trim();
    var freq = $("#frequency-input").val().trim();
  
    var newTrain = {
        name: trainName,
        destination: destination,
        start: trainTime,
        frequency: freq,
    };
   

    database.ref().push(newTrain);
  
  
    alert("Train successfully added");
  
   
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-time-input").val("");
    $("#frequency-input").val("");
  });
  
 
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  

    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().start;
    var freq = childSnapshot.val().frequency;
  
    var firstTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % tFrequency;
    var tMinutesTillTrain = tFrequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var formatNextTrain = nextTrain.format("HH:mm");
  

    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(freq),
      $("<td>").text(formatNextTrain),
      $("<td>").text(tMinutesTillTrain)
    );
  

    $("#train-table > tbody").append(newRow);
  });
  