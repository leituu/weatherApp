/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("const searchInput = document.querySelector(\"#search-bar-input\");\nconst searchBtn = document.querySelector(\"#search-bar-button\");\nconst loadingScreen = document.querySelector(\".loading-screen\");\n\nsearchBtn.addEventListener(\"click\", async (e) => {\n  e.preventDefault();\n  const cityInput = searchInput.value.replace(/\\s/g, \"%20\");\n  const apiKey = \"729134e5477f7d492bfaa4f690bb46ac\";\n  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=5&appid=${apiKey}`;\n\n  // display loading screen\n  loadingScreen.style.display = \"block\";\n  // fetch ciudades\n  const citiesResponse = await fetch(url)\n    .then((res) => {\n      if (!res.ok) {\n        throw res.json();\n      }\n      return res.json();\n    })\n    .then((data) => {\n      return data;\n    })\n    .catch((err) => {\n      err.then((msg) => console.log(msg.message));\n    });\n\n  loadingScreen.style.display = \"none\";\n  // mostrar lista de ciudades\n\n  if (citiesResponse.length === 0) {\n    alert(\"No cities found\");\n  } else if (citiesResponse.length === 1) {\n    console.log(\"una sola ciudad\");\n  } else {\n    let docFrag = document.createDocumentFragment();\n    citiesResponse.forEach((city) => {\n      let cityOption = document.createElement(\"div\");\n      cityOption.classList.add(\"city\");\n      cityOption.setAttribute(\"data-lat\", city.lat);\n      cityOption.setAttribute(\"data-lon\", city.lon);\n      cityOption.innerHTML = `${city.name}, ${city.state}, ${city.country}`;\n      docFrag.appendChild(cityOption);\n    });\n    console.log(docFrag);\n    document.querySelector(\".city-options-card-body\").appendChild(docFrag);\n    document.querySelector(\".city-options\").style.display = \"block\";\n  }\n\n  // cerrar listado de ciudades\n  document.querySelector(\".city-options\").addEventListener(\"click\", (e) => {\n    if (e.target.classList.contains(\"city-options\")) {\n      // clean list\n      document.querySelector(\".city-options-card-body\").innerHTML = \"\";\n      // hide list\n      e.target.style.display = \"none\";\n    }\n  });\n});\n\n\n//# sourceURL=webpack://weatherapp/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;