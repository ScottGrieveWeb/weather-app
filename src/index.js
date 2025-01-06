import "./style.css";
import { indexDomItems } from "./dom";

//TODO Move into a separate module
async function fetchData(input){
    try {
        const search = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input}?unitGroup=uk&iconSet=icons2&key=E5FCPUDSUFM7VMLG3AMJWYX48`);
        const searchData = await search.json();

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

        let nextDay = {
            location: searchData.resolvedAddress,
            alerts: searchData.alerts,
            date: searchData.days[1].datetime,
            conditions: searchData.days[1].conditions,
            icon: searchData.days[0].icon,
            feelsLike: searchData.days[1].feelslike,
            precipProb: searchData.days[1].precipprob,
            snow: searchData.days[1].snow,
            sunrise: searchData.days[1].sunrise,
            sunset: searchData.days[1].sunset,
            temp: searchData.days[1].temp,
            tempmin: searchData.days[1].tempmin,
            tempmap: searchData.days[1].tempmax,
            windspeed: searchData.days[1].windspeed
        }

        let obj = { currentDay, nextDay };
    
        return obj;
    }
}

const searchBox = document.querySelector('#search');
const searchSubmit = document.querySelector('#submit');

searchSubmit.addEventListener("click", processSearch, false);

async function processSearch(){
    if (searchBox.value === "" || searchBox.value === null) {
        // do nothing
    } else {
        indexDomItems.loader.setAttribute("class", "loader");
        let resultObj = await processData(searchBox.value);
        
        if ( resultObj === "error"){
            indexDomItems.loader.removeAttribute("class");
            // TODO add visual q to inform user of invalid search
        } else {
            localStorage.setItem("result", JSON.stringify(resultObj));
            searchBox.value = "";
            document.location.href = "result.html";
        }
    }
}