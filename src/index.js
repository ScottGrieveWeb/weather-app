import "./style.css";
import { indexDomItems } from "./dom";

//TODO Move into a separate module
async function fetchData(input){
    try {
        const search = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input}?unitGroup=uk&iconSet=icons2&key=E5FCPUDSUFM7VMLG3AMJWYX48`);
        const searchData = await search.json();
        console.log(searchData);
        return searchData;
    } catch {
        return "error";
    }
    
}


//TODO Move into a separate module
async function processData(data){
    let searchData = await fetchData(data);
    
    if (searchData === "error"){
        searchBox.value = "";
        return "error";
    } else {
        //TODO Refactor into an object constructor
        let currentDay = {
            location: searchData.resolvedAddress,
            alerts: searchData.alerts,
            date: searchData.days[0].datetime,
            conditions: searchData.days[0].conditions,
            icon: searchData.days[0].icon,
            feelsLike: searchData.days[0].feelslike,
            precipProb: searchData.days[0].precipprob,
            snow: searchData.days[0].snow,
            sunrise: searchData.days[0].sunrise,
            sunset: searchData.days[0].sunset,
            temp: searchData.days[0].temp,
            tempmin: searchData.days[0].tempmin,
            tempmap: searchData.days[0].tempmax,
            windspeed: searchData.days[0].windspeed
        }

        let sevenDay = [];

        for (let i = 1; i < 8; i++){
            sevenDay[i] = {
                date: searchData.days[i].datetime,
                conditions: searchData.days[i].conditions,
                icon: searchData.days[i].icon,
                feelsLike: searchData.days[i].feelslike,
                precipProb: searchData.days[i].precipprob,
                snow: searchData.days[i].snow,
                sunrise: searchData.days[i].sunrise,
                sunset: searchData.days[i].sunset,
                temp: searchData.days[i].temp,
                tempmin: searchData.days[i].tempmin,
                tempmap: searchData.days[i].tempmax,
                windspeed: searchData.days[i].windspeed
            }
        }

        let obj = { currentDay, sevenDay };
        console.log(obj);
    
        return obj;
    }
}

const body = document.querySelector('#index-body')
const searchBox = document.querySelector('#search');
const searchSubmit = document.querySelector('#submit');

searchSubmit.addEventListener("click", processSearch, false);
searchBox.addEventListener("keydown", (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // prevent default behavior
        processSearch(); // submit the form
      }
})

async function processSearch(){
    if (searchBox.value === "" || searchBox.value === null) {
        // do nothing
    } else {
        indexDomItems.loader.setAttribute("class", "loader");
        let resultObj = await processData(searchBox.value);
        
        if ( resultObj === "error"){
            indexDomItems.loader.removeAttribute("class");

            setErrorMessage();
        } else {
            indexDomItems.loader.removeAttribute("class");
            localStorage.setItem("result", JSON.stringify(resultObj));
            searchBox.value = "";
            document.location.href = "result.html";
        }
    }
}

async function setErrorMessage(){
    searchBox.style.cssText = "border-color: #F00F4F";
    let errorMsg = document.createElement('p');
    let errorTxt = document.createTextNode(`We can't find that one, please try again`);
    errorMsg.appendChild(errorTxt);
    errorMsg.setAttribute("id", "error");
    body.appendChild(errorMsg);

    // waits for a few seconds then removes the error message
    setTimeout(removeErrorMessage, 3500);
}

function removeErrorMessage(){
    searchBox.style.cssText = "";

    let errorMsg = document.getElementById("error");
    errorMsg.remove();
}

// checks for a default search location and processes search if one is found
const delay = ms => new Promise(res => setTimeout(res, ms));
async function checkDefault(){
    if (localStorage.getItem("default") === null){
        // do nothing
    } else {
        await delay(300);
        let defaultSearch = JSON.parse(localStorage.getItem("default"));
        searchBox.value = defaultSearch;
        await delay(400);
        processSearch();
    }
}

function checkBackToggle(){
    if (localStorage.getItem("back") !== null){
        // do nothing
    } else {
        checkDefault();
    }
}

window.onload = checkBackToggle();