import "./style.css";
import { domItems } from "./dom";
import moment from "moment";
//TODO explore a better method for importing icon library
import clearDay from "./icons/clear-day.svg";
import clearNight from"./icons/clear-night.svg";
import cloudy from "./icons/cloudy.svg";
import cloudDayRain from"./icons/partly-cloudy-day-rain.svg";
import cloudyDay from "./icons/partly-cloudy-day.svg";
import cloudyNightRain from "./icons/partly-cloudy-night-rain.svg";
import partlyCloudyNight from "./icons/partly-cloudy-night.svg";
import rain from "./icons/rain.svg";
import showersDay from "./icons/showers-day.svg";
import showersNight from "./icons/showers-night.svg";
import sleet from"./icons/sleet.svg";
import snowShowersDay from "./icons/snow-showers-day.svg";
import snowShowersNight from"./icons/snow-showers-night.svg";
import snow from "./icons/snow.svg";
import sunset from "./icons/sunset.svg";
import thunderRain from "./icons/thunder-rain.svg";
import thunderShowersDay from "./icons/thunder-showers-day.svg";
import thunderShowersNight from "./icons/thunder-showers-night.svg";
import wind from"./icons/wind.svg";



function displayResult(){
    // removes back button toggle on page load
    localStorage.removeItem("back"); 

    // if there's no result item, take user back to homepage
    if(localStorage.getItem("result") === null){
        document.location.href = "/weather-app";
    } 

    let userResults = JSON.parse(localStorage.getItem("result"));
    
    //displays the user's searched location
    domItems.resultLocation.innerHTML = userResults.currentDay.location;
    
    // applies the respective weather icon for each day
    let currentIconSrc = iconChecker(userResults.currentDay.icon);
    domItems.current.icon.src = currentIconSrc;
    for (let i = 1; i < 8; i++){
        let iconSrc = iconChecker(userResults.sevenDay[i].icon);
        domItems[i].icon.src = iconSrc;
    }

    //displays the temp and feelslike temp for each day
    domItems.current.temp.innerHTML = `${userResults.currentDay.temp}°`;
    domItems.current.feelsLike.innerHTML = `${userResults.currentDay.feelsLike}°`;
    for (let i = 1; i < 8; i++){
        domItems[i].temp.innerHTML = `${userResults.sevenDay[i].temp}°`;
        domItems[i].feelsLike.innerHTML = `${userResults.sevenDay[i].feelsLike}°`;
    }

    //displays conditions for each day
    domItems.current.condition.innerHTML = userResults.currentDay.conditions;
    for (let i = 1; i < 8; i++){
        domItems[i].condition.innerHTML = userResults.sevenDay[i].conditions;
    }

    //displays dates
    for (let i = 2; i < 8; i++){
        domItems[i].day.innerHTML = moment(userResults.sevenDay[i].date).format('ddd, Do MMM');
    }

    localStorage.removeItem("result");
}

 window.onload = displayResult();
 

 function iconChecker(input){
    switch (input){
        case 'clear-day':
            return clearDay;
            break;
        case 'clear-night':
            return clearNight;
            break;
        case 'cloudy':
            return cloudy;
            break;
        case 'partly-cloudy-rain-day':
            return cloudDayRain;
            break;
        case 'partly-cloudy-day':
            return cloudyDay;
            break;
        case 'partly-cloudy-night-rain':
            return cloudyNightRain;
            break;
        case 'partly-cloudy-night':
            return partlyCloudyNight;
            break;
        case 'rain':
            return rain;
            break;
        case 'showers-day':
            return showersDay;
            break;
        case 'showers-night':
            return showersNight;
            break;
        case 'sleet':
            return sleet;
            break;
        case 'snow-showers-day':
            return snowShowersDay;
            break;
        case 'snow-showers-night':
            return snowShowersNight;
            break;
        case 'snow':
            return snow;
            break;
        case 'thunder-rain':
            return thunderRain;
            break;
        case 'thunder-showers-day':
            return thunderShowersDay;
            break;
        case 'thunder-showers-night':
            return thunderShowersNight;
            break;
        case 'wind':
            return wind;
            break;
    }
 }

 //toggles current search as default
 const defaultBtn = document.getElementById('default');

 defaultBtn.addEventListener("click", () => {
    let currentSearch = document.getElementById("location-result");
    if (JSON.parse(localStorage.getItem("default")) === currentSearch.innerText){
        localStorage.removeItem("default");
    } else {
        localStorage.setItem("default", JSON.stringify(currentSearch.innerText));
    }
 });

 // lets homepage know that user is going back to input a new search
 const backBtn = document.getElementById('back');

 backBtn.addEventListener('click', ()=>{
    localStorage.setItem('back', true);
 })

