import "./style.css"

const resultsDiv = document.querySelector('#results');

function displayResult(){
    let userResults = JSON.parse(localStorage.getItem("result"));
    localStorage.removeItem("result");
    console.log(userResults);

}

 window.onload = displayResult();