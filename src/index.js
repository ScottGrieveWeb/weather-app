import "./style.css"
import { toCelcius } from "./farenheit-to-celsius";

async function searchWeather(input){
    const search = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input}?key=E5FCPUDSUFM7VMLG3AMJWYX48`);
    const searchData = await search.json();

    console.log(searchData);
    let tempF = searchData.days[1].temp;
    let tempC = toCelcius(tempF);

    console.log(`It's going to be ${tempC} degrees tomorrow!`);
}

searchWeather('glasgow');