// Ensure DOM content is loaded before executing JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Define API key
  const APIKey = "6f565a50399aa39e97325584ff029956";

  // Define variables to read HTML elements
  const searchForm = document.getElementById("search-form");
  const cityInput = document.getElementById("search-input");
  const currentWeatherInfoContainer = document.getElementById("currentWeatherInfo");
  const forecastContainer = document.getElementById("forecast");
  const history = document.getElementById("history");

  // When the user submits the form, capture the value entered in the city input
  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const userInput = cityInput.value;
    getData(userInput);
  });

  // Fetch weather data from the API
  function getData(city) {
    getCurrentWeather(city);
    getForecast(city);
  }

  // Fetch current weather data
  function getCurrentWeather(city) {
    const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`;
    fetchWeather(queryURL, displayCurrentWeather);
  }

  // Fetch forecasted weather data
  function getForecast(city) {
    const queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${APIKey}`;
    fetchWeather(queryURL, displayForecast);
  }

  // Fetch weather data from the API
  function fetchWeather(queryURL, callback) {
    fetch(queryURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        callback(data);
      })
      .catch(function (error) {
        console.log("Error fetching weather data:", error);
      });
  }

  // Display current weather information
  function displayCurrentWeather(data) {
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const humidity = data.main.humidity;

    currentWeatherInfoContainer.innerHTML = `
      <h2>Current Weather in ${data.name}</h2>
      <p>Temperature: ${temperature}°C</p>
      <p>Description: ${description}</p>
      <p>Humidity: ${humidity}%</p>
    `;
  }

  // Display forecasted weather information
  function displayForecast(data) {
    forecastContainer.innerHTML = "";
    for (let i = 0; i < data.list.length; i++) {
      const forecast = data.list[i];
      const forecastDate = forecast.dt_txt.split(" ")[0];
      const forecastTime = forecast.dt_txt.split(" ")[1].slice(0, 5);
      const temperature = forecast.main.temp;
      const description = forecast.weather[0].description;

      const forecastElement = `
        <div class="forecast-card col-md-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${forecastDate}</h5>
              <p class="card-text">Time: ${forecastTime}</p>
              <p class="card-text">Temperature: ${temperature}°C</p>
              <p class="card-text">Description: ${description}</p>
            </div>
          </div>
        </div>
      `;

      forecastContainer.innerHTML += forecastElement;
    }
  }
});



