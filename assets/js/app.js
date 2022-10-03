// VARIABLES
var button = document.getElementById("searchBtn");
var cityInputEl = document.getElementById("cityInput");
var date = document.querySelector(".date");
var icon = document.querySelector(".icon");
var temp = document.querySelector(".temp");
var wind = document.querySelector(".wind");
var humidity = document.querySelector(".humidity");
var currentCity = document.querySelector("#city-date");
var currentTemp = document.querySelector("#current-temp");
var currentWind = document.querySelector("#current-wind");
var currentHumidity = document.querySelector("#current-humidity");
var currentUV = document.querySelector("#uv-index");
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
        getCurrentWeather(lat, lon);
        getFiveDay(lat, lon);
      }
    });
}

function getCurrentWeather(lat, lon) {
  var queryUrl = `${baseUrl}data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  fetch(queryUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      displayWeather(data);
      displayFiveDay(data); // 
    });
}

function displayWeather(data) {
  const { name } = data;
  const { temp, humidity } = data.main;
  const { icon, description } = data.weather[0];
  const { speed } = data.wind;
  console.log(name, icon, description, temp, humidity, speed);
  currentCity.textContent = name;
  currentTemp.textContent = "Temp: " + temp;
  currentWind.textContent = "Wind Speed: " + speed;
  currentHumidity.textContent = "Humidity: " + humidity;
  currentUV.textContent = "UV Index: " + "";
}

function

// FUNCTIONS
// Create function to search a City
// Create function to display todays weather information in the "todays-weather" class ((Include City & Date & Icon.img; Temp; Wind; Humidity; UV Index(changes to Green, Yellow, or Red)))
// Create function to display the next five days weather information in the "five-day-forecast" container ((Include Date; Icon.img; Temp; Wind; Humidity))
// Create function to log last search (searches)
// Create function to display the search histories
// Create function to click on search histories to pull up the current and five day forecast

// LOGIC
