import "./style.css";
import { domItems } from "./dom";
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
    let userResults = JSON.parse(localStorage.getItem("result"));
    localStorage.removeItem("result");
    console.log(userResults);
    
    //displays the user's searched location
    domItems.resultLocation.innerHTML = userResults.currentDay.location;
    
    // applies the respective weather icon for each day
    let currentIconSrc = iconChecker(userResults.currentDay.icon);
    domItems.currentIcon.src = currentIconSrc;
    let nextIconSrc = iconChecker(userResults.nextDay.icon);
    domItems.nextIcon.src = nextIconSrc;

    //displays the temp and feelslike temp for each day
    domItems.currentTemp.innerHTML = `${userResults.currentDay.temp}°`;
    domItems.currentFeelslike.innerHTML = `${userResults.currentDay.feelsLike}°`;
    domItems.nextTemp.innerHTML = `${userResults.nextDay.temp}°`;
    domItems.nextFeelslike.innerHTML = `${userResults.nextDay.feelsLike}°`;
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

