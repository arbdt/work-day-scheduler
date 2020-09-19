// document ready function
$(document).ready(function(){

    // variables
    var scheduleStorage = window.localStorage;
    let currentDayDisplay = $("#currentDay");
    let scheduleContainer = $(".container");
    
    // display current day
    function updateCurrentDay(){
      // use Moment to generate the current day at time of page loading
      let currentDayString = moment().format("dddd, MMMM Do YYYY");
      // set current day page text to current day data from Moment
      currentDayDisplay.text(currentDayString);
    }
    
    updateCurrentDay(); // run function to determine and display the current day
    
    //timeblock generation
    function displayTimeblocks(){
        for (var h = 9; h < 18; h++){
            let newTimeBlock = document.createElement("div"); // create row in container
            newTimeBlock.setAttribute("class", "row");
            newTimeBlock.setAttribute("id", `${h}00_block`); 
            scheduleContainer.append(newTimeBlock);
            
            let newHourTitle = document.createElement("aside"); // create hour display
            newHourTitle.setAttribute("class", "hour col-sm-1 col-3");
            newHourTitle.setAttribute("id", `${h}00_time`);
            newHourTitle.textContent = `${h}:00`;
            newTimeBlock.appendChild(newHourTitle);
    
            let newEditableEventArea = document.createElement("textarea"); // create event display
            newEditableEventArea.setAttribute("class", "description col-sm-10 col-7");
            newEditableEventArea.setAttribute("id", `${h}00_event`);
            newEditableEventArea.value = "Nothing Set";
            newTimeBlock.appendChild(newEditableEventArea);
    
            let newSaveButton = document.createElement("button"); // create save button
            newSaveButton.setAttribute("class", "saveBtn col-sm-1 col-2");
            newSaveButton.setAttribute("id", `${h}00_save`);
            newSaveButton.innerHTML = "\<i class\=\"fas fa-save\"\>\<\/i\>"; // save icon
            newTimeBlock.appendChild(newSaveButton);
    
            colorByHour(h, newEditableEventArea); // apply color-coding to each row
        }
    }
    
    displayTimeblocks(); // write time blocks to screen
    
    // color time blocks according to past/present/future
    function colorByHour(hour, eventSlot){
      let currentHour = moment().hour(); // get current hour from Moment
      if (hour < currentHour){
        eventSlot.setAttribute("class", "past description col-sm-10 col-7"); // time block is before current hour
      } else if (hour == currentHour){
        eventSlot.setAttribute("class", "present description col-sm-10 col-7"); // time block is at current hour
      } else if (hour > currentHour){
        eventSlot.setAttribute("class", "future description col-sm-10 col-7"); // time block is after current hour
      }
    }
    
    // local storage retrieval
    function getScheduledEvents(){
      for (var i = 0; i < scheduleContainer.children().length; i++){// for each hour row in container 
        var hourToExtract = scheduleContainer.children().get(i).children[0].textContent; // get hour identifier
        var entryToSet = scheduleContainer.children().get(i).children[1]; // reference the textarea to fill
        if (scheduleStorage.getItem(hourToExtract) != undefined){  // if if an entry in local storage matches the row hour
          entryToSet.value = (scheduleStorage.getItem(hourToExtract)); // set textarea value to eventData
        }
      }
    }
    
    getScheduledEvents(); // fill time blocks with existing entries from local storage
    
    
    //local storage saving
    function saveSchedule(){
      event.preventDefault;
      var target=  $(event.target);
      // reference the hour associated with the save button;
      let eventHour = target.siblings(".hour").text();
      // reference the scheduled event text associated with the save button
      let eventData = target.siblings("textarea").val();
      // send this info to local storage as a Key:Value pair
      scheduleStorage.setItem(eventHour, eventData);
    }
    
    //associate save buttons with save function
    let saveEventBtn = $(".saveBtn");
    saveEventBtn.click(saveSchedule);
    
    
    /* FLOW:
    - retrieve existing entries from storage
    - create timeblocks and fill
    - get current time and compare hour
        - if past, .past. if present, .present. if future, .future
    - allow user to edit text of new or existing events and save to storage
    */
    
    }) // end of document.ready()