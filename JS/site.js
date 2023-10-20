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

}

//the function that grabs the events from the global array or elsewhere to use later in other functions
function getEvents() {
    //TODO: get events from local storage

    return events;
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
        eventAttendance.innerText = event.attendance;
        eventRow.appendChild(eventAttendance);

        let eventDate = document.createElement('td');
        eventDate.innerText = event.date;
        eventRow.appendChild(eventDate);

        //then append the row to the <tbody>
        eventTable.appendChild(eventRow); //<--putting all the elements of the row for the table we just created into the table itself on the page. now, you have to call the function in the appropriate area of the HTML
    }
}

//calculating the sum of the attendance at the events
function sumAttendance(events) {
    let sum = 0; //<--sum is zero starting out, as we have not looked at any events yet

    for (let i = 0; i < events.length; i++) { //<-- for() loop to calculate the attendance for each event
        let event = events[i];

        sum = sum + event.attendance;
    }

    return sum; //<-- must be out of the for() loop so that it doesn't turn just the first 'attendance' and runs for each
}

//calc the avg number of attendants to the events
function avgAttendance(events) {
    let sum = 0;

    for (let i = 0; i < events.length; i++) {
        let event = events[i];

        sum = sum + event.attendance;//you still need the sum before you can divide
    }

    let avg = sum / events.length; //outside of the for() loop, divide the sum by the event.length, and then ake sure to return your avg

    return avg;

}

function minAttendance(events) {
    let eventAttendance = events.map(event => event.attendance); 

    let min = Math.min(...eventAttendance); //<-- using the same logic in the maxAttandance() function, we just change the value to Math.min() to instead find the smallest number

    return min;
}

function maxAttendance(events) {


    let eventAttendance = events.map(event => event.attendance); //<--maps the array with only the attendance numbers

    let max = Math.max(...eventAttendance); //<--Math.max() takes the array and picks out the largest number among the set of numbers in the array

    return max;
}

//responsible for calculating the total, avg, min, and max attendance
function displayStats(events) {
    //calc total attendance
    let total = sumAttendance(events);
    document.getElementById('totalAttend').innerHTML = total.toLocaleString();

    //calc avg attendance
    let avg = avgAttendance(events);
    document.getElementById('averageAttend').innerHTML = Math.round(avg).toLocaleString(); //the Math.round() just rounds the number from a decimal to a whole number

    //calc max attendance
    let maxAttend = maxAttendance(events);
    document.getElementById('mostAttend').innerHTML = maxAttend.toLocaleString();

    //calc min attendance
    let minAttend = minAttendance(events);
    document.getElementById('leastAttend').innerHTML = minAttend.toLocaleString();
}