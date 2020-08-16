const API_KEY = "be7d433413b4090a3f818e71be8a1c9c";
const COORDS = "coords";

const weather = document.querySelector(".js-weather");

function getWeather(lat, lon) {
	fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
		).then(function(response){
		return response.json();
		})
		.then(function(json){
			const temperature = json.main.temp;
			const place = json.name;
			weather.innerText = `${temperature}° @ ${place}`
		})
}

function saveCoords(coordsObj) {
	localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
	const latitude = position.coords.latitude;
	const longitude = position.coords.longitude;
	const coordsObj = {
		latitude,
		longitude,
	};
	saveCoords(coordsObj);
	getWeather(latitude, longitude);
}

function handleGeoError() {
	console.log("can't access geo location");
}

function askForCoords() {
	navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadcoords() {
	const loadedcoords = localStorage.getItem(COORDS);
	if (loadedcoords === null) {
		askForCoords();
	} else {
		const parsedCoords = JSON.parse(loadedcoords);
		getWeather(parsedCoords.latitude, parsedCoords.longitude);
	}
}

function init() {
	loadcoords();
}

init()