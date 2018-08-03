var body = document.getElementById("temp");
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

// finally html document is written
function writeDocument(response) {
  var res = JSON.parse(response);
  var areaName = res.name;
  var country = res.sys.country;
  var weatherTitle = res.weather[0].main;
  var temp = res.main.temp;
  var tempHtml = '<p>' + temp + ' <span onclick=tempChange() id="toggle-temp">°C</span>' + '</p>';
  var iconURL = res.weather[0].icon;
  var finalHtml = '';
  finalHtml += '<p>' + areaName + ', ' + country + '</p>';
  finalHtml += tempHtml;
  finalHtml += '<p>' + weatherTitle + '</p>';
  body.innerHTML = finalHtml;
  weatherIcon.innerHTML = '<img src=\"'+iconURL+'\">';
}

function tempChange() {

}




// calling the main function
getLocation();
