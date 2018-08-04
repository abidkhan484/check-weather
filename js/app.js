var areaInfo = document.getElementById("areaInfo");
var temperature = document.getElementById("temp");
var weatherTitle = document.getElementById("weather-title");
var weatherIcon = document.getElementById("weather-icon");

// call the location and send the position
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

// get the position and send it for the ajax function
function showPosition(position) {
  var latitude = Math.round(position.coords.latitude);
  var longitude = Math.round(position.coords.longitude);
  var url = 'https://fcc-weather-api.glitch.me/api/current?lat='+latitude+'&lon='+longitude;

  httpGetAsync(url, writeDocument);
}


// perform ajax call
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


function tempInnerHtml(temp, unit) {
  return temp + ' °<span id="toggle-temp">'+ unit +'</span>';
}

function celsiusToFar(temp) {
  return Math.round(temp * 1.8 + 32);
}

function fahrenheitToCel(temp) {
  return Math.round((temp-32)*(5/9));
}


// finally html document is written
function writeDocument(response) {
  var res = JSON.parse(response);
  var areaName = res.name;
  var country = res.sys.country;
  var temp = res.main.temp;
  var iconURL = res.weather[0].icon;

  areaInfo.innerHTML = areaName + ', ' + country;
  temperature.innerHTML = tempInnerHtml(temp, "C");
  temperature.onclick = function() {
    var unit = document.getElementById("toggle-temp");
    if (unit.innerHTML=="C"){
      temp = celsiusToFar(temp);
      temperature.innerHTML = tempInnerHtml(temp, "F");
    }
    else{
      temp = fahrenheitToCel(temp);
      temperature.innerHTML = tempInnerHtml(temp, "C");
    }
  };
  weatherTitle.innerHTML = res.weather[0].main;
  weatherIcon.innerHTML = '<img src=\"'+iconURL+'\">';
}


// calling the main function
getLocation();
