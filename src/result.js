import "./style.css"

const resultsDiv = document.querySelector('#results');

function displayResult(){
    let userResults = JSON.parse(localStorage.getItem("result"));
    localStorage.removeItem("result");
    console.log(userResults);
    
    let resultLocation = document.querySelector('#location-result');
    resultLocation.innerHTML = userResults.currentDay.location;
}

 window.onload = displayResult();