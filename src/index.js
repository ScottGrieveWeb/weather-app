import "./style.css"

//TODO Move into a separate module
async function fetchData(input){
    try {
        const search = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input}?unitGroup=uk&key=E5FCPUDSUFM7VMLG3AMJWYX48`);
        const searchData = await search.json();

        return searchData;
    } catch {
        return "error";
    }
    
}


//TODO Move into a separate module
async function processSearch(data){
    let searchData = await fetchData(data);
    
    if (searchData === "error"){
        console.log("We can't find that location, please try a different search");
        searchBox.value = "";
    } else {
        //TODO Refactor into an object constructor
        let currentDay = {
            location: searchData.resolvedAddress,
            alerts: searchData.alerts,
            date: searchData.days[0].datetime,
            conditions: searchData.days[0].conditions,
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
    
        console.log(obj);
    }
}

processSearch('glasgow');

const searchBox = document.querySelector('#search');
const searchSubmit = document.querySelector('#submit');

searchSubmit.addEventListener("click", () => {
    if (searchBox.value === "" || searchBox.value === null) {
        // do nothing
    } else {
        processSearch(searchBox.value);
    }
});
