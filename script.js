document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "6f565a50399aa39e97325584ff029956"; 
    const searchForm = document.getElementById("searchForm");
    const cityInput = document.getElementById("cityInput");
    const currentWeatherSection = document.getElementById("currentWeather");
    const forecastSection = document.getElementById("forecast");
    const searchHistorySection = document.getElementById("searchHistory");
    

    // Function to fetch weather data from the OpenWeatherMap API
    const fetchWeatherData = async (city) => {
        // Use the API endpoint to fetch data
        const apiUrl = `api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`;
        
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    // Function to display current weather information
    const displayCurrentWeather = (weatherData) => {
        const currentWeatherInfo = document.getElementById("currentWeatherInfo");
        // Extract relevant information from the weatherData object
    const cityName = weatherData.city.name;
    const date = dayjs().format("MMMM D, YYYY");
    const iconUrl = `https://openweathermap.org/img/w/${weatherData.list[0].weather[0].icon}.png`;
    const temperature = Math.round(weatherData.list[0].main.temp - 273.15); // Convert temperature to Celsius
    const humidity = weatherData.list[0].main.humidity;
    const windSpeed = weatherData.list[0].wind.speed;
    // Create HTML content to display current weather information
    const htmlContent = `
        <h2>${cityName} - ${date}</h2>
        <img src="${iconUrl}" alt="Weather Icon">
        <p>Temperature: ${temperature} °C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
    `;

    // Update the content of the currentWeatherInfo div
    currentWeatherInfo.innerHTML = htmlContent;
};
        // Update the HTML to display current weather information
        // You can access data like weatherData.city.name, weatherData.list[0].main.temp, etc.
        // Update the HTML content accordingly


    // Function to display 5-day forecast
    const displayForecast = (weatherData) => {
        // Update the HTML to display 5-day forecast
        // You can iterate through weatherData.list to get forecast information for each day
        // Update the HTML content accordingly
    };

    // Function to display search history
    const displaySearchHistory = (searchHistory) => {
        // Update the HTML to display search history
        // You can use localStorage to store and retrieve search history
        // Update the HTML content accordingly
    };

    // Event listener for the form submission
    searchForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        
        const city = cityInput.value.trim();
        
        if (city !== "") {
            // Fetch weather data
            const weatherData = await fetchWeatherData(city);

            // Display current weather
            displayCurrentWeather(weatherData);

            // Display 5-day forecast
            displayForecast(weatherData);

            // Update search history
            // You can use localStorage to store and retrieve search history
            displaySearchHistory(searchHistory);
        }
    });
});
