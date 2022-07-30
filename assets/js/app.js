// VARIABLES
// https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&c16416fa1720113ce4b015709f047825
// http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={API key}

var button = document.getElementsByName("button");
var inputValue = document.getElementsByName("inputValue");
var date = document.querySelector(".date");
var icon = document.querySelector(".icon");
var temp = document.querySelector(".temp");
var wind = document.querySelector(".wind");
var humidity = document.querySelector(".humidity");
var apiKey = "c16416fa1720113ce4b015709f047825";
var city;
var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
// var the API for Weather
var apiUrl =
  "api.openweathermap.org/data/2.5/forecast?q={city name}&appid=c16416fa1720113ce4b015709f047825";

button.addEventListener("click", function () {
  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
});

fetch(queryUrl)

// FUNCTIONS
// Create function to search a City
// Create function to display todays weather information in the "todays-weather" class ((Include City & Date & Icon.img; Temp; Wind; Humidity; UV Index(changes to Green, Yellow, or Red)))
// Create function to display the next five days weather information in the "five-day-forecast" container ((Include Date; Icon.img; Temp; Wind; Humidity))
// Create function to log last search (searches)
// Create function to display the search histories
// Create function to click on search histories to pull up the current and five day forecast

// LOGIC
