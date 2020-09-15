moment().format();

// document ready function
$(document).ready(function(){

// variables
var eventStorage = window.localStorage;
var currentTime = moment.hour();

//timeblock generation

function displayTimeblocks(){
    for (var h = 9; h < 18; h++){
        let newTimeBlock = document.createElement("div"); // create row in container
        newTimeBlock.setAttribute("class", "row"); 
        $(".container").appendChild(newTimeBlock);
        
        let newHourTitle = document.createElement("aside"); //create hour display
        newHourTitle.setAttribute("class", "hour col-1");
        newHourTitle.textContent = `${h}:00`;
        newTimeBlock.appendChild(newHourTitle);
    }
}

displayTimeblocks();


// local storage retrieval

//local storage saving

// event creation or editing


/* FLOW:
- retrieve existing entries from storage
- create timeblocks and fill
- get current time and compare hout
    - if past, .past. if present, .present. if future, .future
- allow user to edit text of new or existing events and save to storage
*/

}) // end of document.ready()