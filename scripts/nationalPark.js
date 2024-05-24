"use strict";



// Let's define the radio buttons
const onSearchByLocationBtn = document.getElementById("location");
const onSearchByParkTypeBtn = document.getElementById("parkType");
const onDisplayAllBtn = document.getElementById("displayAll");

// Let's define the dropdown and result displaying divs
const dropdownDisplay1  = document.getElementById("dropdownDisplay1");
const dropdownDisplay2 = document.getElementById("dropdownDisplay2");
const dropdownDisplay3 = document.getElementById("dropdownDisplay3");
const resultDisplay = document.getElementById("resultDisplay");



window.onload = () => {
    onSearchByLocationBtn.addEventListener('change', populateOptions);
    onSearchByParkTypeBtn.addEventListener('change', populateOptions);
    onDisplayAllBtn.addEventListener('change', populateOptions);
};

const capitalizeText = text => text.toUpperCase();

function populateOptions() {
    
    //Let's start by clearing previous results
    dropdownDisplay1.innerHTML = "";
    dropdownDisplay2.innerHTML = "";
    dropdownDisplay3.innerHTML = "";
    resultDisplay.innerHTML = "";
    
    //Let's now decide which data to populate based on selected radio buttons
    if(onSearchByLocationBtn.checked){
        populateStateList();
    } 
     else if (onSearchByParkTypeBtn.checked){
        populateParkTypeList();
    }
     else if (onDisplayAllBtn.checked){
        populateAllParks();
    }
}

function populateStateList() {
    //Let's create a div that can hold select elements and options
    const selectState = document.createElement("select");
    selectState.className = "text-center form form-control mt-5 custom-select1";
    selectState.addEventListener('change', () => populateParksByState(selectState.value));
    
    // Create a default option
    const defaultOption = document.createElement("option");
    defaultOption.textContent = "Select a State";
    defaultOption.value = " ";
    selectState.appendChild(defaultOption);

    //Let's now create the options for state list
    locationsArray.forEach(state => {
        const stateOption = document.createElement("option");
        stateOption.textContent = state;
        stateOption.value = state;
        selectState.appendChild(stateOption);
    });
    dropdownDisplay1.appendChild(selectState);

}

function populateParkTypeList() {
       //Let's create a div that can hold select elements and options
       const selectParkType = document.createElement("select");
       selectParkType.className = "text-center form-control mt-5 custom-select2"
       selectParkType.addEventListener('change', () => populateParksByType(selectParkType.value));

        // Create a default option
        const defaultOption = document.createElement("option");
        defaultOption.textContent = "Select a Park Type";
        defaultOption.value = " ";
        selectParkType.appendChild(defaultOption);
       
       //Let's now create the options for park types
       parkTypesArray.forEach(parkType => {
        const parkTypeOption = document.createElement("option");
        parkTypeOption.textContent = parkType;
        parkTypeOption.value = parkType;
        selectParkType.appendChild(parkTypeOption);
    });
    dropdownDisplay2.appendChild(selectParkType);

}

function populateAllParks(){

        // Let's create a table to display the result
        const parkTable = document.createElement("table");
        parkTable.className = "table table-striped table-hover border mt-5";
        dropdownDisplay3.appendChild(parkTable);

        const parkTableHead = document.createElement("thead");
        parkTableHead.className = "table-dark";

        const parkTableBody = document.createElement("tbody");
        parkTableBody.className = "table-group-divider";

        // Let's create the header row
        const parkTableHeaderRow = document.createElement("tr");
        const headers = ["Location Name", "Location Address", "Visit"];
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

        //Creating the table data by using a function called createCell

            parkTableRow.appendChild(createCell(park.LocationName));
            parkTableRow.appendChild(createCell(park.Address));
            if(park.Visit){
                parkTableRow.appendChild(createVisitLink(park.Visit));
            } else {
                parkTableRow.appendChild(createCell(park.Visit));
            }
            parkTableBody.appendChild(parkTableRow);
        });

        parkTable.appendChild(parkTableBody);
        dropdownDisplay3.appendChild(parkTable);
}

function populateParksByState(selectedState){

    
    // Let's clear previous park listings
    const parkListings = document.getElementById('parkListings');
    if (parkListings) {
        parkListings.remove();
    }
    
    selectedState = capitalizeText(selectedState);

    //Let's first filter selected parks 
    const filteredParks = nationalParksArray.filter(park => capitalizeText(park.State) === selectedState);
    if (filteredParks.length > 0) {
        
        resultDisplay.innerHTML = "";
        const table = document.createElement("table");
        table.id = "parkListings";
        table.className = "table table-striped table-hover border mt-5";
        const thead = document.createElement("thead");
        thead.className = "table-dark";
        const tbody = document.createElement("tbody");
        tbody.className = "table-group-divider";

        const headerRow = document.createElement("tr");
        ["Location Name", "Address", "Visit"].forEach(text => {
            const header = document.createElement("th");
            header.textContent = text;
            headerRow.appendChild(header);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        filteredParks.forEach(park => {
            const row = document.createElement("tr");
            row.appendChild(createCell(park.LocationName));
            row.appendChild(createCell(park.Address));
            if(park.Visit){
            row.appendChild(createVisitLink(park.Visit));
        } else {
            row.appendChild(createCell(park.Visit));
        }
            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        resultDisplay.appendChild(table);
    } else {
        resultDisplay.innerHTML = `<p class = "mt-5">No parks found in ${selectedState}.</p>`;
    }
}

function populateParksByType(selectedParkType) {
    
    // Let's clear previous park type listings
    const parkTypeListings = document.getElementById('parkTypeListings');
    if (parkTypeListings) {
        parkTypeListings.remove();
    }

    selectedParkType = capitalizeText(selectedParkType);

    //Let's first filter selected park types
    const filteredParkTypes = nationalParksArray.filter(park => capitalizeText(park.LocationName).includes(selectedParkType));           
    if (filteredParkTypes.length > 0) {
        
        resultDisplay.innerHTML = "";
        const table = document.createElement("table");
        table.id = "parkTypeListings";
        table.className = "table table-striped table-hover border mt-5";
        const thead = document.createElement("thead");
        thead.className = "table-dark";
        const tbody = document.createElement("tbody");
        tbody.className = "table-group-divider";

        const headerRow = document.createElement("tr");
        ["Location Name", "Address", "Visit"].forEach(text => {
            const header = document.createElement("th");
            header.textContent = text;
            headerRow.appendChild(header);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        filteredParkTypes.forEach(park => {
            const row = document.createElement("tr");
            row.appendChild(createCell(park.LocationName));
            row.appendChild(createCell(park.Address));
            if(park.Visit){
                row.appendChild(createVisitLink(park.Visit));
            } else {
                row.appendChild(createCell(park.Visit));
            }
            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        resultDisplay.appendChild(table);
    } else {
        resultDisplay.innerHTML = `<p class = "mt-5">No parks found in the selected type of ${selectedParkType}.</p>`;
    }
}

function createCell(text) {
    const cell = document.createElement("td");
    cell.textContent = text;
    cell.className = "w-25"
    return cell;
}

function createVisitLink(text){
     // Create a cell for the visit link
     const visitLinkTd = document.createElement('td');
     visitLinkTd.className = "w-25";
 
     // Create an anchor element for the visit link
     const visitLink = document.createElement('a');
     visitLink.textContent = "Click to see more";
     visitLink.href = text; 
     visitLink.target = "_blank";
 
     visitLinkTd.appendChild(visitLink);
     return visitLinkTd;
}