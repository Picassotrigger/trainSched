//============================  DATABASE  ============================//
var config = {
  apiKey: "AIzaSyB7q3UodEF8d3fO79FHNk2PzNfgDeEv6RA",
  authDomain: "trainsched-256e1.firebaseapp.com",
  databaseURL: "https://trainsched-256e1.firebaseio.com",
  projectId: "trainsched-256e1",
  storageBucket: "trainsched-256e1.appspot.com",
  messagingSenderId: "353997524504"
};
firebase.initializeApp(config);



//============================  VARIABLES  ============================//
var database = firebase.database();

var name = "";
var destination = "";
var startTime = 0;
var frequency = 0;

var currentTime = moment();
var minutesAway = 0;
var nextArrival = 0;

var data = [];





//============================  FUNCTIONS ============================//
function nextTrainMinutes(startTime, frequency) {
  // var currentTime = moment();
  var startTimeConverted = moment(startTime, "hh:mm").subtract(1, "day");
  var diffTime = moment().diff(moment(startTimeConverted), "minutes");
  var remainder = diffTime % frequency;

  minutesAway = frequency - remainder;

  return minutesAway;
}






//============================  MAIN  ============================//


//-------------  Open Input Form -------------//
$("#add-train").on("click", function() {
  $("#add-train-form").toggle(1000);
  $("#add-train").toggle();
  $("#close-train").toggle();
});

$("#close-train").on("click", function() {
  $("#add-train-form").toggle(1000);
  $("#add-train").toggle();
  $("#close-train").toggle();
});



//-------------  Capture Button Click / New Entry -------------//
$("#submit-train").on("click", function() {
  event.preventDefault();

  name = $("#name").val().trim();
  destination = $("#destination").val().trim();
  startTime = $("#start-time").val().trim();
  frequency = $("#frequency").val().trim();


  database.ref().push({
    name: name,
    destination: destination,
    startTime: startTime,
    frequency: frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });


  console.log(name);
  console.log(destination);
  console.log(startTime);
  console.log(frequency);


  $("#name").val("");
  $("#destination").val("");
  $("#start-time").val("");
  $("#frequency").val("");

});



//-------------  Update Screen -------------//
database.ref().on("child_added", function(childSnapshot) {

  var temp= [];
  temp.push(childSnapshot.val().name);
  temp.push(childSnapshot.val().destination);
  temp.push(childSnapshot.val().startTime);
  temp.push(childSnapshot.val().frequency);

  data.push(temp);

  $("#schedOutput").append(
      "<tr><td>" + childSnapshot.val().name
      + "</td><td>" + childSnapshot.val().destination
      + "</td><td>" + childSnapshot.val().frequency
      + "</td><td>" + moment().add(nextTrainMinutes(childSnapshot.val().startTime, childSnapshot.val().frequency),
    "minutes").format("hh:mm")
      + "</td><td>" + nextTrainMinutes(childSnapshot.val().startTime, childSnapshot.val().frequency)
      + "</td></tr>"
    );
});






























//============================  END OF PAGE  ============================//
