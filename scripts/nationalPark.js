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

// function populateAllParks(){
//     nationalParksArray.forEach(park => {
//         const parkName = document.createElement("table");
//         parkName.className = "table table-striped table-hover";
//         dropdownDisplay.appendChild(parkName);
//     })
// }