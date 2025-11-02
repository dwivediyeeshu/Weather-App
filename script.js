document.addEventListener("DOMContentLoaded", () => {
  const inputCity = document.getElementById("city-input");
  const button = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const tempDisplay = document.getElementById("temperature");
  const feelsDisplay = document.getElementById("feels-like");
  const descDisplay = document.getElementById("description");
  const humidityDisplay = document.getElementById("humidity");
  const speedDisplay = document.getElementById("wind-speed");
  const errorDisplay = document.getElementById("error-message");
  const placeholder = document.getElementById('placeholder')

  const API_KEY = "cb11afbca99b59ad1357230ff5b0f44b"; // // NEED To have env variable to hide.. Sensitive info

  button.addEventListener("click", async () => {
    const City = inputCity.value.trim();
    if (!City) return;

    // Request calls may throw an error
    // server/database is always in another continent

    try {
      const weatherData = await fetchWeatherData(City);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
  });

  async function fetchWeatherData(city) {
    // gets the data
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await fetch(URL);

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    console.log(data);
    
    return data;
  }

  function displayWeatherData(data) {
    // display
    const {name, main, weather, wind} = data
    cityNameDisplay.textContent = name;
    tempDisplay.textContent = `Temperature: ${main.temp}°C`;
    feelsDisplay.textContent = `Feels Like: ${main.feels_like}°C`;
    descDisplay.textContent = `Weather: ${weather[0].description.toUpperCase()}`;
    humidityDisplay.textContent = `Humidity: ${main.humidity}%`
    speedDisplay.textContent = `Wind Speed: ${wind.speed} m/s`

    //unlock the display
    weatherInfo.classList.remove('hidden')
    errorDisplay.classList.add('hidden')
  }

  function showError() {
    weatherInfo.classList.add("hidden");
    errorDisplay.classList.remove("hidden");
  }
});
