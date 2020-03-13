//This function waits for everything in the document to load before it runs the JavaScript code
$(document).ready(function() {
  // listen for save button clicks
  $(".saveBtn").on("click", function() {
    // This captures the event that you write in the hour block - for example if you write "Meeting" in the 
    //10 am slot, it will capture "Meeting"
    var value = $(this).siblings(".description").val();
    
    console.log(value);


  //ADDED FEATURES:
  //For this project I added features to change the color of the top of the box depending on the value to 
  //help show important items
  //Meetings will show a dark red line, lunch will show a dark green line, and appointments will show a dark 
  //purple line on top
  var meeting = value.includes("meeting");
  var Meeting = value.includes("Meeting");
  console.log(meeting)
  if(meeting ==true||Meeting==true){
     $(this).parent().addClass("colorchange");
   }
   var lunch = value.includes("lunch");
   var Lunch = value.includes("Lunch");
   console.log(lunch)
   if(lunch==true||Lunch==true){
    $(this).parent().addClass("lunch");

    }
    var appointment = value.includes("appointment")
    var Appointment = value.includes("Appointment")
    if(appointment==true||Appointment==true){
      $(this).parent().addClass("appointment");
  
      }
  
    
   
   // console.log(value)
    // The time variable captures the time of the event example if you write "meeting" in at 10am
    //it will capture "hour-10" and attributes it to the id
    var time = $(this).parent().attr("id");
   // console.log(time);

   

    // This saves the variables time and value in the localStorage
    // the time will be when you entered the event like in the example above it will save "hour-10"
    //the value is the event that is captured, in the example above "Meeting" will be saved
    localStorage.setItem(time, value);
  });

  function hourUpdater() {
    // get current number of hours - for example if it is 7 pm the hours would be 19
    var currentHour = moment().hours();

   // console.log(currentHour)

    // loop over time blocks
    //This selects the time blcok class and iterates the funciton into each block
    $(".time-block").each(function() {
    // This variable is set to the id in the time block class which then splits the string into an array, grabs 
    //the value in index 1 and converts it to an integer
      var blockHour = parseInt($(this).attr("id").split("-")[1]);
    
      console.log(blockHour)

      // check if we've moved past this time
      //takes the current hour, and if it is larger than the blockhour then it will add a class called "pass" 
      // to the hour block - this will change the background color from red to white
      if (blockHour < currentHour) {
        $(this).addClass("past");
      } 
      else if (blockHour === currentHour) {
          //If the block hour equals the current hour, then it will remove the class called pass (which
          //sets the background color to white) and adds the class present, which sets the background
          //color to red
        $(this).removeClass("past");
        $(this).addClass("present");
      } 
      else {
          //if the blockhour is larger than the currenthour (indicating that it is a future hour)
          //and this "future" class changes the background color to green
        $(this).removeClass("past");
         //then the "past" class is removed from the blockhour id which removes the gray background
        $(this).removeClass("present");
        //above removes the "present" class from the block hour id which removes the red background
        //below adds a class called "future" which changes the background color to green
        $(this).addClass("future");
      }
      
    });
    
  }

  hourUpdater();
  

  // set up interval to check if current time needs to be updated
  var interval = setInterval(hourUpdater, 15000);
  //This sets an interval which ever 15000 milliseconds or 15 seconds
  console.log(interval)

  // load any saved data from localStorage - This means that if you have added an event such as "Meeting" to 
  //the hour 10am, upon refreshing the page "Meeting" will still be displayed in the 10am block
  $("#hour-9 .description").val(localStorage.getItem("hour-9"));
  $("#hour-10 .description").val(localStorage.getItem("hour-10"));
  $("#hour-11 .description").val(localStorage.getItem("hour-11"));
  $("#hour-12 .description").val(localStorage.getItem("hour-12"));
  $("#hour-13 .description").val(localStorage.getItem("hour-13"));
  $("#hour-14 .description").val(localStorage.getItem("hour-14"));
  $("#hour-15 .description").val(localStorage.getItem("hour-15"));
  $("#hour-16 .description").val(localStorage.getItem("hour-16"));
  $("#hour-17 .description").val(localStorage.getItem("hour-17"));

  // displays current day on page in the foramt Day, Month in the id currentDay which is in the paragraph
  //tag in the jumbotron header class 
  $("#currentDay").text(moment().format("dddd, MMMM Do"));
});
