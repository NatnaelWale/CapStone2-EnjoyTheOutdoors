"use strict";




const onSearchByLocationBtn = document.getElementById("location");
const onSearchByParkTypeBtn = document.getElementById("parkType");
const onDisplayAllBtn = document.getElementById("displayAll");
const dropdownDisplay  =document.getElementById("dropdownDisplay");
const resultDisplay = document.getElementById("resultDisplay");




window.onload = () => {
    onSearchByLocationBtn.addEventListener('change', populateOptions);
    onSearchByParkTypeBtn.addEventListener('change', populateOptions);
    onDisplayAllBtn.addEventListener('change', populateOptions);
};


function populateOptions() {

    //Let's start by clearing previous results
    dropdownDisplay.innerHTML = "";
    resultDisplay.innerHTML = "";

    //Let's now decide which data to populate based on selected radio buttons
    if(onSearchByLocationBtn.checked){
        populateStateList();
    } else if(onSearchByParkTypeBtn.checked) {
        populateParkTypeList();
    } else if (onDisplayAllBtn.checked){
        populateAllParks();
    }

}

function populateStateList() {
    //Let's create a div that can hold select elements and options
    const selectState = document.createElement("select");
    selectState.className = "text-center form-control mt-5"
    
    //Let's now create the options for state list
    locationsArray.forEach(state => {
        const stateOption = document.createElement("option");
        stateOption.textContent = state;
        stateOption.value = state;
        selectState.appendChild(stateOption);
    });
    dropdownDisplay.appendChild(selectState);

}

function populateParkTypeList() {
       //Let's create a div that can hold select elements and options
       const selectParkType = document.createElement("select");
       selectParkType.className = "text-center form-control mt-5"
       
       //Let's now create the options for park types
       parkTypesArray.forEach(parkType => {
        const parkTypeOption = document.createElement("option");
        parkTypeOption.textContent = parkType;
        parkTypeOption.value = parkType;
        selectParkType.appendChild(parkTypeOption);
    });
    dropdownDisplay.appendChild(selectParkType);

}

function populateAllParks(){

        // Let's create a table to display the result
        const parkTable = document.createElement("table");
        parkTable.className = "table table-striped table-hover border mt-5";
        dropdownDisplay.appendChild(parkTable);

        const parkTableHead = document.createElement("thead");
        parkTableHead.className = "table-dark";

        const parkTableBody = document.createElement("tbody");
        parkTableBody.className = "table-group-divider";

        // Let's create the header row
        const parkTableHeaderRow = document.createElement("tr");
        const headers = ["Location Name", "Location ID", "Location Address"];
        headers.forEach(text => {
            const header = document.createElement("th");
            header.textContent = text;
            parkTableHeaderRow.appendChild(header);
        });
        parkTableHead.appendChild(parkTableHeaderRow);
        parkTable.appendChild(parkTableHead);

        //Let's now fill in the data into the table
        nationalParksArray.forEach(park => {
            const parkTableRow = document.createElement("tr");
            const nameCell = document.createElement("td");
            nameCell.className = "w-50"
            nameCell.textContent = park.LocationName;
            const idCell = document.createElement("td");
            idCell.className = "w-25"
            idCell.textContent = park.LocationID;
            const addressCell = document.createElement("td");
            addressCell.textContent = park.Address;

            parkTableRow.appendChild(nameCell);
            parkTableRow.appendChild(idCell);
            parkTableRow.appendChild(addressCell);
            parkTableBody.appendChild(parkTableRow);
        });

        parkTable.appendChild(parkTableBody);
        dropdownDisplay.appendChild(parkTable);
}