// VARIABLES
var button = document.getElementById("searchBtn");
var cityInputEl = document.getElementById("cityInput");
var date = document.querySelector(".date");
var icon = document.querySelector(".icon");
var temp = document.querySelector(".temp");
var wind = document.querySelector(".wind");
var humidity = document.querySelector(".humidity");
var city;
var apiKey = "c16416fa1720113ce4b015709f047825";
var baseUrl = "https://api.openweathermap.org/";

button.addEventListener("click", function () {
  getGeoLocation(cityInputEl.value);
});

function getGeoLocation(city) {
  var queryUrl = `${baseUrl}geo/1.0/direct?q=${city}&limit=5&appId=${apiKey}`;
  fetch(queryUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data && data[0]) {
        var lat = data[0].lat;
        var lon = data[0].lon; //(api) data/2.5/
      }
    });
}

function displayWeather(data) {
  const { name } = data.name;
  const { icon, description } = data.weather;
  const { speed } = data.wind;
  console.log(name, icon, description, temp, humidity, speed);
}

// FUNCTIONS
// Create function to search a City
// Create function to display todays weather information in the "todays-weather" class ((Include City & Date & Icon.img; Temp; Wind; Humidity; UV Index(changes to Green, Yellow, or Red)))
// Create function to display the next five days weather information in the "five-day-forecast" container ((Include Date; Icon.img; Temp; Wind; Humidity))
// Create function to log last search (searches)
// Create function to display the search histories
// Create function to click on search histories to pull up the current and five day forecast

// LOGIC
