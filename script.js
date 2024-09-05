document.getElementById("fetchDataBtn").addEventListener("click", getLocation);

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  document.getElementById("lat").innerText = `Lat: ${lat}`;
  document.getElementById("lon").innerText = `Long: ${lon}`;

  showMap(lat, lon);

  getWeatherData(lat, lon);

  document.getElementById("landing").classList.add("hidden");
  document.getElementById("weatherSection").classList.remove("hidden");
}

function showMap(lat, lon) {
  const mapIframe = document.getElementById("map");
  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=AIzaSyCYExHokJY24ZxkBHM8abBqczHdp8N6YhA&q=${lat},${lon}`;
  mapIframe.src = mapSrc;
}

function getWeatherData(lat, lon) {
  const apiKey = "d1845658f92b31c64bd94f06f7188c9c";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Populate weather data
      document.getElementById(
        "location"
      ).innerText = `Location: ${data.timezone}`;
      document.getElementById(
        "windSpeed"
      ).innerText = `Wind Speed: ${data.wind.speed} kmph`;
      document.getElementById(
        "humidity"
      ).innerText = `Humidity: ${data.main.humidity}%`;
      document.getElementById("timezone").innerText = `Time Zone: ${new Date(
        data.timezone * 1000
      ).toLocaleTimeString()}`;
      document.getElementById(
        "pressure"
      ).innerText = `Pressure: ${data.main.pressure} hPa`;
      document.getElementById(
        "windDirection"
      ).innerText = `Wind Direction: ${data.wind.deg}°`;
      document.getElementById(
        "uvIndex"
      ).innerText = `UV Index: ${data.current.uvi}`;
      document.getElementById(
        "feelsLike"
      ).innerText = `Feels like: ${data.main.feels_like}°C`;
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
  }
}
