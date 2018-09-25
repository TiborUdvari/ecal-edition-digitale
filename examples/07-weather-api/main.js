/*****************************
* Get DOM element references
*****************************/

var elBody = document.querySelector("body");

/*****************************
*    Weather API calling
*****************************/

var lausanneDataEndpoint = "https://what-weather-dark-sky.glitch.me/api/46.519653/6.632273";
// hint: use a json viewer to see how data is constructed

// Get the data using fetch
// Alternative: using jQuery ajax methods
// Not included here

// Note: if getting CORS error add this plugin to Chrome https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi/related?hl=en

fetch(lausanneDataEndpoint)
  .then(function(response) {
    return response.json();
  })
  .then(function(weatherDataJSON) {
    console.log(JSON.stringify(weatherDataJSON));

    var hourly = weatherDataJSON.hourly.data;

    for (var i = 0; i < 10 /*hourly.length*/; i++) {
    	var dataEntry = hourly[i];

    	var elH2 = document.createElement("h2");
    	var unixTimeFromApi = dataEntry.time;
    	var formattedTime = moment.unix(unixTimeFromApi).format('HH');
    	var fahrenheitTempFromApi = dataEntry.temperature;
    	var celsius = fahrenheitToCelsius(fahrenheitTempFromApi);
    	var formattedCelsius = new Number(celsius).toFixed(2);
    	elH2.innerText = formattedTime + "h " + formattedCelsius + " degrees C";

    	elBody.appendChild(elH2);

    	console.log(moment.unix(dataEntry.time).format('HH'));
    	//console.log(dataEntry.time);

    	console.log(fahrenheitToCelsius(dataEntry.temperature));
    	console.log(dataEntry.humidity);
    	console.log(dataEntry.pressure);
    }

  });

function fahrenheitToCelsius(f){
	return ( f - 32 ) / 1.8;
}