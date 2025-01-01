import "./style.css"

async function searchWeather(input){
    const search = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input}?key=E5FCPUDSUFM7VMLG3AMJWYX48`);
    const searchData = await search.json();

    console.log(searchData);
    console.log(`It's going to be ${searchData.days[1].temp} degrees tomorrow!`);
}

searchWeather('glasgow');