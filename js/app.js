var temperature = document.getElementById("temp");
var weatherIcon = document.getElementById("weather-icon");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  var url = 'https://fcc-weather-api.glitch.me/api/current?lat='+latitude+'&lon='+longitude;

  httpGetAsync(url, writeDocument);
}

function httpGetAsync(theUrl, writeDocument)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            writeDocument(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}

function writeDocument(response) {
  var res = JSON.parse(response);
  var temp = res.main.temp;
  var iconURL = res.weather[0].icon;
  temperature.innerHTML = temp;
  weatherIcon.innerHTML = "<img src="'+iconURL+'">";
}
