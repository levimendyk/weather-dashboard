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
var fiveDay = document.querySelector(".five-day-forecast");
var searchDiv = document.querySelector(".history");

var city;
var cityNames = JSON.parse(localStorage.getItem("city")) || [];
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
  var queryUrl = `${baseUrl}data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  fetch(queryUrl)
    .then((response) => response.json())
    .then((data) => {
      // saves to local storage
      var city = data.name;
      if (!cityNames.includes(city)) {
        cityNames.push(city);
        localStorage.setItem("city", JSON.stringify(cityNames));
      }

      displayWeather(data);
      displaySearches();
      getFiveDay(lat, lon);
    });
}

function displayWeather(data) {
  const { name } = data;
  const { temp, humidity } = data.main;
  const { icon, description } = data.weather[0];
  const { speed } = data.wind;
  console.log(name, icon, description, temp, humidity, speed);
  currentCity.textContent = name;
  currentTemp.textContent = "Temp: " + temp + " F";
  currentWind.textContent = "Wind Speed: " + speed + " MPH";
  currentHumidity.textContent = "Humidity: " + humidity + " %";
  currentUV.textContent = "UV Index: " + "";
}

// calls five day api
function getFiveDay(lat, lon) {
  var queryUrl = `${baseUrl}data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  fetch(queryUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      displayFiveDay(data);
    });
}

// displays five day forecast
function displayFiveDay(data) {
  fiveDay.innerHTML = "";
  for (let index = 4; index < data.list.length; index += 8) {
    var currentDay = data.list[index];
    var containerEl = document.createElement("div");
    var dateEl = document.createElement("p");
    var iconEl = document.createElement("img");
    var tempEl = document.createElement("p");
    var windEl = document.createElement("p");
    var humidityEl = document.createElement("p");

    dateEl.textContent = currentDay.dt_txt.split(" ")[0];
    iconEl.src = `http://openweathermap.org/img/wn/${currentDay.weather[0].icon}@2x.png`;
    tempEl.textContent = "Temp: " + currentDay.main.temp + " F";
    windEl.textContent = "Wind Speed: " + currentDay.wind.speed + " MPH";
    humidityEl.textContent = "Humidity: " + currentDay.main.humidity + " %";

    containerEl.setAttribute("class", "future");
    containerEl.appendChild(dateEl);
    containerEl.appendChild(iconEl);
    containerEl.appendChild(tempEl);
    containerEl.appendChild(windEl);
    containerEl.appendChild(humidityEl);

    fiveDay.appendChild(containerEl);
  }
}

// displays recent city searches/search history

function displaySearches() {
  var getCityAry = JSON.parse(localStorage.getItem("city"));
  searchDiv.innerHTML = "";
  console.log(getCityAry);
  for (let index = 0; index < getCityAry.length; index++) {
    var citySearchBtn = document.createElement("button");
    citySearchBtn.innerHTML = getCityAry[index];
    citySearchBtn.className = "searchbtn";
    searchDiv.append(citySearchBtn);
  }
}
displaySearches();

searchDiv.addEventListener("click", function (event) {
  if (event.target.className === "searchbtn") {
    console.log(event); // extract name from buttons
    var city = event.target.innerText;
    getGeoLocation(city);
  } else {
    console.log("Didn't click the button");
  }
});
