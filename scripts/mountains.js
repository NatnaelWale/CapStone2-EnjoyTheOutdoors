"use strict";


const mountainsListRow = document.getElementById("mountainsListRow");

window.onload = () => {

mountainsArray.forEach((mountain, index) => {
    let mountainColumnElement = createMountainColumnElement(mountain, index);
    mountainsListRow.appendChild(mountainColumnElement);

});
};



 function createMountainColumnElement(mountain, index) {
    // Create the column div for the mountain
    let mountainColumnDiv = document.createElement("div");
    mountainColumnDiv.className = "col-lg-3 mb-4";

    // Create a card element to display the mountains
    let mountainCardDiv = document.createElement("div");
    mountainCardDiv.className = "card shadow";

    // Append the card to the column div
    mountainColumnDiv.appendChild(mountainCardDiv);

    // Add the image to card
    let mountainImage = document.createElement("img");
    mountainImage.src = "images/" + mountain.img;
    mountainImage.className = "card-img-top";
    mountainImage.alt = mountain.name;
    mountainCardDiv.appendChild(mountainImage);

    // Create a card body div
    let cardBodyDiv = document.createElement("div");
    cardBodyDiv.className = "card-body";
    mountainCardDiv.appendChild(cardBodyDiv);

    // Add the name of the mountain to the card body
    let mountainHeading = document.createElement("h5");
    mountainHeading.className = "card-title";
    mountainHeading.innerText = mountain.name;
    cardBodyDiv.appendChild(mountainHeading);

    // Button to toggle collapse
    let infoButton = document.createElement("button");
    infoButton.className = "btn btn-primary w-100";
    infoButton.setAttribute("data-bs-toggle", "offcanvas");
    infoButton.setAttribute("data-bs-target", "#offcanvasDetails" + index);
    infoButton.innerText = "About " + mountain.name;
    cardBodyDiv.appendChild(infoButton);

    // Div to display descriptions and details (collapsible)
    let detailsDiv = document.createElement("div");
    detailsDiv.className = "offcanvas offcanvas-start text-bg-dark";
    detailsDiv.setAttribute("data-bs-scroll", "true")
    detailsDiv.setAttribute("tabindex", "-1")
    detailsDiv.id = "offcanvasDetails" + index;
    mountainColumnDiv.appendChild(detailsDiv);

    //Let's get the latitude and longitude values to display the sunrise and sunset time of each mountains
    // Used a javascript API found from https://drawne.com/javascript-sunset-times-api/

    const latitude = mountain.coords.lat;
    const longitude = mountain.coords.lng;
    const url = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        const sunRise = data.results.sunrise;
        const sunSet = data.results.sunset;

    // Display various details on the off canvas
    let detailsContent = `
        <h3 class="mx-3 mt-5">Name: ${mountain.name}</h3>
        <h6 class="mx-3 mt-2"><strong>Effort:</strong> ${mountain.effort}</h6>
        <h6 class="mx-3 mt-2"><strong>Elevation:</strong> ${mountain.elevation} feet</h6>
        <img src="images/${mountain.img}" class="card-img-top" alt="  ${mountain.name}">
        <p class="offcanvas-body"><strong>Description:</strong>  ${mountain.desc}</p>
        <p class="offcanvas-body"><strong>Sun Rise Time:</strong>  ${sunRise} UTC</p>
        <p class="offcanvas-body"><strong>Sun Set Time:</strong>  ${sunSet} UTC</p>
    `;
    detailsDiv.innerHTML = detailsContent;
    })
    .catch(error => console.error('Error:', error))


    return mountainColumnDiv;
}

