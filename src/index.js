const searchInput = document.querySelector("#search-bar-input");
const searchBtn = document.querySelector("#search-bar-button");
const loadingScreen = document.querySelector(".loading-screen");
const searchResults = document.querySelector(".city-options");
const searchResultsList = document.querySelector(".city-options-card-body");

const apiKey = "729134e5477f7d492bfaa4f690bb46ac";

searchBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const cityInput = searchInput.value.replace(/\s/g, "%20");
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=5&appid=${apiKey}`;

  // display loading screen
  loadingScreen.style.display = "block";
  // fetch ciudades
  const citiesResponse = await fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw res.json();
      }
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      err.then((msg) => console.log(msg.message));
    });

  loadingScreen.style.display = "none";
  // mostrar lista de ciudades

  if (citiesResponse.length === 0) {
    alert("No cities found");
  } else if (citiesResponse.length === 1) {
    console.log("una sola ciudad");
  } else {
    let docFrag = document.createDocumentFragment();
    citiesResponse.forEach((city) => {
      let cityOption = document.createElement("div");
      cityOption.classList.add("city");
      cityOption.setAttribute("data-lat", Math.round(city.lat * 100) / 100);
      cityOption.setAttribute("data-lon", Math.round(city.lon * 100) / 100);
      cityOption.setAttribute("data-city", city.name);
      cityOption.setAttribute("data-state", city.state ? city.state : "");
      cityOption.setAttribute("data-country", city.country);
      cityOption.innerHTML = `${city.name}, ${city.state}, ${city.country}`;
      docFrag.appendChild(cityOption);
    });
    document.querySelector(".city-options-card-body").appendChild(docFrag);
    searchResults.style.display = "block";
  }

  // cerrar listado de ciudades
  searchResults.addEventListener("click", (e) => {
    closeSearchResults(e);
  });
});

// Get weather

const mainCity = document.querySelector(
  "#current-weather-card-header-location-text"
);

const mainIcon = document.querySelector(
  ".current-weather-card-body-temperature-main-img"
);

const mainWeatherVal = document.querySelector(
  ".current-weather-card-body-temperature-main-value"
);
const mainWeatherMin = document.querySelector(
  ".current-weather-card-body-temperature-range-min"
);
const mainWeatherMax = document.querySelector(
  ".current-weather-card-body-temperature-range-max"
);

const mainWeatherHumid = document.querySelector(".humidity");
const mainWeatherPress = document.querySelector(
  ".current-weather-card-body-description-value.pressure"
);
const mainWeatherVisib = document.querySelector(
  ".current-weather-card-body-description-value.visibility"
);
const mainWeatherWind = document.querySelector(
  ".current-weather-card-body-description-value.wind"
);

searchResultsList.addEventListener("click", async (e) => {
  let coord = [
    e.target.getAttribute("data-lat"),
    e.target.getAttribute("data-lon"),
    e.target.getAttribute("data-city"),
    e.target.getAttribute("data-state"),
    e.target.getAttribute("data-country"),
  ];
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord[0]}&lon=${coord[1]}&exclude=minutely,hourly,alerts&units=metric&appid=${apiKey}`;

  const weather = await fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw res.json();
      }
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      err.then((msg) => console.log(msg.message));
    });

  // populate current weather
  console.log(weather);
  mainCity.innerHTML = coord[3]
    ? `${coord[2]}, ${coord[3]}, ${coord[4]}`
    : `${coord[2]}, ${coord[4]}`;
  mainIcon.src = `https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`;
  mainWeatherVal.innerHTML = `${Math.round(weather.current.temp)} °C`;
  mainWeatherMin.innerHTML = `${Math.round(weather.daily[0].temp.min)} °C`;
  mainWeatherMax.innerHTML = `${Math.round(weather.daily[0].temp.max)} °C`;
  mainWeatherHumid.innerHTML = `Humidity: ${weather.current.humidity} %`;
  mainWeatherPress.innerHTML = `Pressure: ${weather.current.pressure} hPa`;
  mainWeatherVisib.innerHTML = `Visibility: ${
    weather.current.visibility / 1000
  } km`;
  mainWeatherWind.innerHTML = `Wind: ${weather.current.wind_speed} m/s`;

  // populate daily weather

  const weatherCards = document.querySelectorAll(".forecast-weather-body-card");
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  weatherCards.forEach((card, idx) => {
    var date = new Date(weather.daily[idx + 1].dt * 1000);
    card.querySelector(".forecast-weather-body-card-header").innerHTML =
      weekday[date.getDay()];
    card.querySelector(
      ".forecast-weather-body-card-body-img"
    ).src = `https://openweathermap.org/img/wn/${
      weather.daily[idx + 1].weather[0].icon
    }@2x.png`;
    card.querySelector(
      ".forecast-weather-body-card-body-temperature-range-min"
    ).innerHTML = `${Math.round(weather.daily[idx + 1].temp.min)} °C`;
    card.querySelector(
      ".forecast-weather-body-card-body-temperature-range-max"
    ).innerHTML = `${Math.round(weather.daily[idx + 1].temp.max)} °C`;
  });
});

// Cerrar listado de ciudades

const closeSearchResults = (e) => {
  if (
    e.target.classList.contains("city-options") ||
    e.target.classList.contains("city")
  ) {
    // clean list
    document.querySelector(".city-options-card-body").innerHTML = "";
    // hide list
    searchResults.style.display = "none";
  }
};
