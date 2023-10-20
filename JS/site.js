const events = [  //global array that exits outside of the functions and their scopes
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 240000,
        date: "06/01/2017",
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 250000,
        date: "06/01/2018",
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 257000,
        date: "06/01/2019",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 130000,
        date: "06/01/2017",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 140000,
        date: "06/01/2018",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 150000,
        date: "06/01/2019",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 40000,
        date: "06/01/2017",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 45000,
        date: "06/01/2018",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 50000,
        date: "06/01/2019",
    },
];

//building the dropdown items for the stats table dropdown
function buildDropdown() {
    //STEPS:
    //Get all the known events
    let currentEvents = getEvents(); //<--since the getEvents() function is returning all events, not just the global array, we can call this function to give us all the known events

    //get a list of unique city names from the events in the global array
    let eventCities = currentEvents.map(event => event.city); //<--lambda expression. it takes the array of objects, pulls only the city properties, and puts their values into a new array, using the .map element
    let uniqueCities = new Set(eventCities);  //<--uses the 'Set' class constructor that takes the new array with cities and only holds the unique values, not keeping the duplicates. 'new' is used to build new classes in Javascript
    let dropdownChoices = ['All', ...uniqueCities]; //<-- the [] in this situation is similar to the expression 'yada, yada', spreads the cities into individual elements for later use, basically putting the Set() with the unique non-duplicated city names back into array
    //^^^ the 'All' above is for the dropdown menu item 'All' on the page and in the HTML, and is just as a placeholder, whereas the other options in the dropdown will the be unique cities of our array

    const dropdownTemplate = document.getElementById('dropMenuTemplate'); //<--setting the item as a constant since it will not change and will be used multiple times
    const dropdownMenu = document.getElementById('cityDropdownMenu');  //<--same as above, but for a different ID, which is one div above the previous
    dropdownMenu.innerHTML = ''; //<--keeps the dropdown from continually adding the dropdown menu items

    //for each of those city names:
    for (let i = 0; i < dropdownChoices.length; i++) {   //<-- the for() loop to go throught the elements to add them to the dropdown menu

        let cityName = dropdownChoices[i];

        //-make a dropdown item HTML element
        let dropdownItem = dropdownTemplate.content.cloneNode(true);
        //^^^same as--->  let dropdownItem = <li><a class="dropdown-item" href="#"></a></li> in the HTML
        dropdownItem.querySelector('a').innerText = cityName; //<--changes the a tag to the text created from the cityName string, defined above. '.innerText' is the same as '.textContent'.

        //-add that element to the dropdown menu
        dropdownMenu.appendChild(dropdownItem); //<--adds a new child (dropdownItem)-->to the parent (drop down menu)
    }

    displayEvents(currentEvents); //calls the function to this function so that the onload in the HTML also calls this function at the same time
    displayStats(currentEvents); //calls the functon of displayStats for also display on the load of the page
    document.getElementById('statsLoc').textContent = 'All';

}

//the function that grabs the events from the global array or elsewhere to use later in other functions
function getEvents() {
    //TODO: get events from local storage
    let eventsJson = localStorage.getItem('nal-events'); //<--gets the item from the saveEvents function array we created below, using the key

    let storedEvents = events;

    if (eventsJson == null) { //<--- null is the absence of a value, if there is nothing there
        saveEvents(events);
    } else {
        storedEvents = JSON.parse(eventsJson); //<-- contradicting stringify, parse turns the JSON into an object instead of a string
    }

    return storedEvents;
}

//saving the added events from our page, specifically our modal, and storing them into our local storage, pushing them into an array
function saveEvents(events) {

    let eventsJson = JSON.stringify(events); //<--letting eventsJson take the information, make it into a string, to be stored in local storage

    localStorage.setItem('nal-events', eventsJson); //<--sets the items, using the key ('nal-events') and the string eventsJson

}

//display the information we've gathered for the events in the events table
function displayEvents(events) {
    //TODO:
    //get the table to put the events in
    const eventTable = document.getElementById('eventsTable');

    //clear the table
    eventTable.innerHTML = '';

    //loop through the events and fill the table with rows of the information
    for (let i = 0; i < events.length; i++) {
        let event = events[i];

        //make a <tr></tr>
        let eventRow = document.createElement('tr');

        //then make a <td> for each property and put the data into each <td>
        let eventName = document.createElement('td'); //<--pulling each object from the array and making it a string of text so that it goes into the elements of the table in the HTML
        eventName.innerText = event.event;
        eventRow.appendChild(eventName);

        let eventCity = document.createElement('td');
        eventCity.innerText = event.city;
        eventRow.appendChild(eventCity);

        let eventState = document.createElement('td');
        eventState.innerText = event.state;
        eventRow.appendChild(eventState);

        let eventAttendance = document.createElement('td');
        eventAttendance.innerText = event.attendance.toLocaleString(); //<--use toLocaleString to format the numbers with commas or periods where neccessary
        eventRow.appendChild(eventAttendance);

        let eventDate = document.createElement('td');
        let date = new Date(event.date);  //<--making a new object with the class of Date
        eventDate.innerText = date.toLocaleDateString(); //<-- using toLocaleDateString() to format the date much like the numbers, but only the date and not adding the time, like toLocaleString() on its own would do in this situation
        eventRow.appendChild(eventDate);

        //then append the row to the <tbody>
        eventTable.appendChild(eventRow); //<--putting all the elements of the row for the table we just created into the table itself on the page. now, you have to call the function in the appropriate area of the HTML
    }
}

//calculating the sum of the attendance at the events
function sumAttendance(events) {  //<--not needed because of the below function calculateStats(events). left in code for reference
    let sum = 0; //<--sum is zero starting out, as we have not looked at any events yet

    for (let i = 0; i < events.length; i++) { //<-- for() loop to calculate the attendance for each event
        let event = events[i];

        sum = sum + event.attendance;
    }

    return sum; //<-- must be out of the for() loop so that it doesn't turn just the first 'attendance' and runs for each
}

//calc the avg number of attendants to the events
function avgAttendance(events) {  //<--not needed because of the below function calculateStats(events). left in code for reference
    let sum = 0;

    for (let i = 0; i < events.length; i++) {
        let event = events[i];

        sum = sum + event.attendance;//you still need the sum before you can divide
    }

    let avg = sum / events.length; //outside of the for() loop, divide the sum by the event.length, and then ake sure to return your avg

    return avg;

}

function minAttendance(events) {  //<--not needed because of the below function calculateStats(events). left in code for reference

    let eventAttendance = events.map(event => event.attendance);

    let min = Math.min(...eventAttendance); //<-- using the same logic in the maxAttandance() function, we just change the value to Math.min() to instead find the smallest number

    return min;

    /*
    for() loop vesion of finding the answer:
    let min = events[0].attendance;   <--can also give the value as  '= Infinity', if for some reason you could not look into the array
    for( let i = 1; i < events.length; i++) {      <--making i=1 instead of 0 will skip the first attendance number, since our code already knows that number, from min = events[0].attendance
        if (events[i].attendance < min) {
            min = events[i].attendance;
        }
    }
    return min;
    */
}

function maxAttendance(events) { //<--not needed because of the below function calculateStats(events). left in code for reference

    let eventAttendance = events.map(event => event.attendance); //<--takes the existing array, pulls only the attendance numbers from the objects, and maps it as a new array to use in the equation

    let max = Math.max(...eventAttendance); //<--Math.max() takes the array and picks out the largest number among the set of numbers in the array

    return max;

    /*
    could also be done as a for() loop:

    let max = 0;
    for( let i = 0; i < events.length; i++){
        if (events[i].attendance > max) {
            max = events[i].attendance;
        }
    }
    return max;
    */
}

//make a function using one for() loop to calculate all the values(sum, avg, max, min)
function calculateStats(events) {
    let sum = 0;
    let min = events[0].attendance;
    let max = 0;

    for (let i = 0; i < events.length; i++) {  //<--for() to lopp through the event attendance
        let event = events[i];

        sum += event.attendance; //<--finding the sum

        if (event.attendance < min) {  //<--finding the smallest attendance number
            min = event.attendance;
        }

        if (event.attendance > max) {  //<--finding the highest attendance number
            max = event.attendance;
        }
    }

    let avg = sum / events.length;  //<--finding the average of all of the attendance numbers

    let stats = {  //<--giving the stats names by turning them into an object, because you can't return multiple elements
        sum: sum,
        avg: avg,
        min: min,
        max: max
    }

    return stats; //<--returning the full range of objects, on which to be called in the below function by stats.(whichever object)
}

//responsible for calculating the total, avg, min, and max attendance
function displayStats(events) {
    let stats = calculateStats(events);

    //calc total attendance
    document.getElementById('totalAttend').innerHTML = stats.sum.toLocaleString();//<--grabs the totalAttend ID from the HTML, and then puts the 'sum' in the text content within the element witht he totalAttend ID, with toLocaleString formatting it to match the correct format of whatever region your browser says you are, such as commas or periods between numbers, etc

    //calc avg attendance
    document.getElementById('averageAttend').innerHTML = Math.round(stats.avg).toLocaleString();

    //calc max attendance
    document.getElementById('mostAttend').innerHTML = stats.max.toLocaleString();

    //calc min attendance
    document.getElementById('leastAttend').innerHTML = stats.min.toLocaleString();
}

//filter the table to only display selected city in the dropdown
function filterByCity(element) {
    //pick a city to display
    let cityName = element.textContent;  //<--the name of the city in the dropdown, can be checked by alert(cityName) when the city is clicked. --have confirmed, it works

    document.getElementById('statsLoc').innerHTML = cityName;  //<--changes the 'All' in the dropdown table on the table header to change with the city you select in the dropdown

    //get all the events
    let allEvents = getEvents(); //<--calls the getEvents() function to this function

    //filter those events to just one city
    let filteredEvents = []; //<--make an array for the events that holds the filtered events for a specific city

    for (let i = 0; i < allEvents.length; i++) { //<-- for() loop to filter throught the events
        let event = allEvents[i];

        if (event.city == cityName || cityName == 'All') {  //<-- an if() statement saying that if the city within the event matches the cityName, we push the event into out filteredEvents array. the two vertical lines (||) make a 'or' statement within that if statement, so that the 'All' option of the dropdown works to display all city data.
            filteredEvents.push(event);  //<--pushing the events into the array created above the loop
        }

    }

    /*  --this statement is the same as the if statement above, just written differently in a more advanced way--
    if (cityName == 'All') {
        filteredEvents = allEvents;
    } else {
        filteredEvents = allEvents.filter(event => event.city == cityName);
    */

    //call displayStats with the events for just that city
    displayStats(filteredEvents);

    //call displayEvents with the events for just that city
    displayEvents(filteredEvents);

}

//saves the new event from the form and converts the inputs from the form into data that can be stored in local storage
function saveNewEvent() {
    //get the HTML form element
    let newEventForm = document.getElementById('newEventForm');

    //create an object from the input
    let formData = new FormData(newEventForm); //<--uses a class to get and value the input from the submitted form on the modal page
    let newEvent = Object.fromEntries(formData.entries()); //<--goes through the form data that has been collected and creates a new object where the property is named after the input in the form
    
    //fix the formats of the data
    newEvent.attendance = parseInt(newEvent.attendance); //<--parses the attendance input from the form to make it an object instead of a string
    newEvent.date = new Date(newEvent.date).toLocaleDateString(); //<--transforms the date into a javascript-readable format from the input from the form

    //save all the events we now know about
    let allEvents = getEvents(); //<--get the current events
    allEvents.push(newEvent); //<--add the new event
    saveEvents(allEvents); //<--save all the elements with the new event

    newEventForm.reset(); //<--resets the form to how it was when the page was first loaded

    //hide the bootstrap modal
    let modalElement = document.getElementById('formModal');
    let bsModal = bootstrap.Modal.getInstance(modalElement);
    bsModal.hide();

    //display all events
    buildDropdown();
}