// document ready function
$(document).ready(function(){

    // variables
    var scheduleStorage = window.localStorage;
    let currentDayDisplay = $("#currentDay");
    let scheduleContainer = $(".container");
    
    // display current day
    function updateCurrentDay(){
      //for the element $("#currentDay")
      console.log(currentDayDisplay);
      let currentDayString = moment().format("dddd, MMMM Do YYYY");
      console.log(currentDayString);
      currentDayDisplay.text(currentDayString);
    }
    
    updateCurrentDay();
    
    
    
    //timeblock generation
    function displayTimeblocks(){
        for (var h = 9; h < 18; h++){
            let newTimeBlock = document.createElement("div"); // create row in container
            newTimeBlock.setAttribute("class", "row");
            newTimeBlock.setAttribute("id", `${h}00_block`); 
            scheduleContainer.append(newTimeBlock);
            
            let newHourTitle = document.createElement("aside"); //create hour display
            newHourTitle.setAttribute("class", "hour col-1");
            newHourTitle.setAttribute("id", `${h}00_time`);
            newHourTitle.textContent = `${h}:00`;
            newTimeBlock.appendChild(newHourTitle);
    
            let newEditableEventArea = document.createElement("textarea"); //create event display
            newEditableEventArea.setAttribute("class", "description col-10");
            newEditableEventArea.setAttribute("id", `${h}00_event`);
            newEditableEventArea.value = "Nothing Set";
            newTimeBlock.appendChild(newEditableEventArea);
    
            let newSaveButton = document.createElement("button");
            newSaveButton.setAttribute("class", "saveBtn col-1");
            newSaveButton.setAttribute("id", `${h}00_save`);
            newSaveButton.innerHTML = "\<i class\=\"fas fa-save\"\>\<\/i\>";
            newTimeBlock.appendChild(newSaveButton);
    
            colorByHour(h, newEditableEventArea);
        }
    }
    
    displayTimeblocks();
    
    // color time blocks according to past/present/future
    function colorByHour(hour, eventSlot){
      let currentHour = moment().hour();
      console.log(`Current hour is ${currentHour}`);
      if (hour < currentHour){
        eventSlot.setAttribute("class", "past description col-10");
      } else if (hour == currentHour){
        eventSlot.setAttribute("class", "present description col-10");
      } else if (hour > currentHour){
        eventSlot.setAttribute("class", "future description col-10");
      }
    }
    
    // local storage retrieval
    function getScheduledEvents(){
      console.log(scheduleContainer.children().length);
      for (var i = 0; i < scheduleContainer.children().length; i++){// for each hour row in container 
        var hourToExtract = scheduleContainer.children().get(i).children[0].textContent; // get hour identifier
        console.log(`extracting hour ${hourToExtract}`);
        var entryToSet = scheduleContainer.children().get(i).children[1]; // reference the textarea to fill
        console.log(entryToSet);
        if (scheduleStorage.getItem(hourToExtract) != undefined){  // if $(".hour").text() == eventHour
          console.log(scheduleStorage.getItem(hourToExtract));
          entryToSet.value = (scheduleStorage.getItem(hourToExtract)); // set textarea value to eventData
          console.log(entryToSet.value);
        }
      }
    }
    getScheduledEvents();
    
    
    //local storage saving
    function saveSchedule(){
      event.preventDefault;
      var target=  $(event.target);
      console.log(`saving event`);
      //console.log(target);
      let eventHour = target.siblings(".hour").text();
      //console.log(target.siblings(".hour"));
      console.log(eventHour);
      let eventData = target.siblings("textarea").val();
      //console.log(target.siblings("textarea"));
      console.log(eventData);
      var eventObject = {
        hour: eventHour,
        data: eventData,
      }
      console.log(eventObject);
      scheduleStorage.setItem(eventHour, eventData);
    }
    
    // event creation or editing
    let saveEventBtn = $(".saveBtn");
    saveEventBtn.click(saveSchedule);
    
    
    /* FLOW:
    - retrieve existing entries from storage
    - create timeblocks and fill
    - get current time and compare hout
        - if past, .past. if present, .present. if future, .future
    - allow user to edit text of new or existing events and save to storage
    */
    
    }) // end of document.ready()