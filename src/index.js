import "./style.css"
import { toCelcius } from "./farenheit-to-celsius";

async function fetchData(input){
    const search = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input}?key=E5FCPUDSUFM7VMLG3AMJWYX48`);
    const searchData = await search.json();

    let currentDay = {
        conditions: searchData.currentConditions.conditions,
        humidity: searchData.currentConditions.humidity,
        feelsLike: searchData.currentConditions.feelslike,
        temp: searchData.currentConditions.temp,
        precipProb: searchData.currentConditions.precipprob,
        snow: searchData.currentConditions.snow,
        windSpeed: searchData.currentConditions.windspeed
    }
    return searchData;
}




async function processSearch(data){
    let searchData = await fetchData(data);
    
    //TODO Refactor into an object constructor
    let currentDay = {
        date: searchData.days[0].datetime,
        conditions: searchData.days[0].conditions,
        feelsLike: searchData.days[0].feelslike,
        precipProb: searchData.days[0].precipprob,
        snow: searchData.days[0].snow,
        sunrise: searchData.days[0].sunrise,
        sunset: searchData.days[0].sunset,
        temp: toCelcius(searchData.days[0].temp),
        tempmin: toCelcius(searchData.days[0].tempmin),
        tempmap: toCelcius(searchData.days[0].tempmax),
        windspeed: searchData.days[0].windspeed
    }

    let nextDay = {
        date: searchData.days[1].datetime,
        conditions: searchData.days[1].conditions,
        feelsLike: searchData.days[1].feelslike,
        precipProb: searchData.days[1].precipprob,
        snow: searchData.days[1].snow,
        sunrise: searchData.days[1].sunrise,
        sunset: searchData.days[1].sunset,
        temp: toCelcius(searchData.days[1].temp),
        tempmin: toCelcius(searchData.days[1].tempmin),
        tempmap: toCelcius(searchData.days[1].tempmax),
        windspeed: searchData.days[1].windspeed
    }

    let obj = { currentDay, nextDay };
    
    return obj;
}

processSearch('glasgow');
