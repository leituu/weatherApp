const searchInput = document.querySelector("#search-bar-input");
const searchBtn = document.querySelector("#search-bar-button");
const loadingScreen = document.querySelector(".loading-screen");

searchBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const cityInput = searchInput.value.replace(/\s/g, "%20");
  const apiKey = "729134e5477f7d492bfaa4f690bb46ac";
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
      cityOption.setAttribute("data-lat", city.lat);
      cityOption.setAttribute("data-lon", city.lon);
      cityOption.innerHTML = `${city.name}, ${city.state}, ${city.country}`;
      docFrag.appendChild(cityOption);
    });
    console.log(docFrag);
    document.querySelector(".city-options-card-body").appendChild(docFrag);
    document.querySelector(".city-options").style.display = "block";
  }

  // cerrar listado de ciudades
  document.querySelector(".city-options").addEventListener("click", (e) => {
    if (e.target.classList.contains("city-options")) {
      // clean list
      document.querySelector(".city-options-card-body").innerHTML = "";
      // hide list
      e.target.style.display = "none";
    }
  });
});
