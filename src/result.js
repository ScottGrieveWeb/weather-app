import "./style.css"

const resultsDiv = document.querySelector('#results');

function displayResult(){
    let userResults = JSON.parse(localStorage.getItem("result"));
    localStorage.removeItem("result");
    console.log(userResults);

    let resultLocation = document.createElement("h1");
    let resultLocationText = document.createTextNode(userResults.currentDay.location);
    resultLocation.appendChild(resultLocationText);

    resultsDiv.appendChild(resultLocation);
}

 window.onload = displayResult();