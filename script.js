
const key = "e0f617c85e16eef01836c6071e7928f1";
let result = document.getElementById("result");

const getWeather = (latitude, longitude) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log("Weather data:", data); 
      if (data.cod === 200) {
        result.innerHTML = `
          <h2>${data.name}</h2>
          <h4 class="weather">${data.weather[0].main}</h4>
          <h4 class="desc">${data.weather[0].description}</h4>
          <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
          <h1>${data.main.temp} &#176;C</h1>
          <div class="temp-container">
            <div>
              <h4 class="title">min</h4>
              <h4 class="temp">${data.main.temp_min}&#176;C</h4>
            </div>
            <div>
              <h4 class="title">max</h4>
              <h4 class="temp">${data.main.temp_max}&#176;C</h4>
            </div>
          </div>
        `;
      } else {
        result.innerHTML = `<h3 class="msg">City not found</h3>`;
      }
    })
    .catch(error => {
      console.error("Error fetching weather data:", error); 
      result.innerHTML = `<h3 class="msg">An error occurred</h3>`;
    });
};

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log("Geolocation position:", position); 
        const { latitude, longitude } = position.coords;
        getWeather(latitude, longitude);
      },
      error => {
        console.error("Geolocation error:", error);
        result.innerHTML = `<h3 class="msg">Unable to retrieve location</h3>`;
      }
    );
  } else {
    result.innerHTML = `<h3 class="msg">Geolocation is not supported by this browser</h3>`;
  }
};

window.addEventListener("load", getLocation);
