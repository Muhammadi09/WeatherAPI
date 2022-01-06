var userInput;
var time;
var sunset;
var sunrise;
var wind;
var temp;
var humidity;
var pressure; 
var city;
var weather;
var description;


function latestTime(){
	time = new Date().getTime();
	var total = time / 1000;
	var toFixed = total.toFixed(0);
	time = parseInt(toFixed);
	return time;
}

latestTime();

function userInputString(){
	//IF THERE IS WHITE SPACE IN USERINPUT, THEN REPLACE WITH %20 FOR THE URL TO READ IT.
	userInput = document.getElementById("userInput").value;
	for (var i = 0; i < userInput.length; i++) {

		if (userInput.length = " "){
		userInput = userInput.replace(" ", "%20")
		}
	}

}


function httpRequestOpenWeather(){
	///////// HTTP REQUEST TO OPEN WEATHER API ////////////
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	  	if (this.readyState == 4 && this.status == 200) {
	    /*document.getElementById("text").innerHTML = xhttp.responseText;*/
	    
	    var xhttpConvertJS = JSON.parse(xhttp.responseText);
	    console.log(xhttpConvertJS)
	    city = xhttpConvertJS.name;
	    sunset = xhttpConvertJS.sys.sunset;
 	    sunrise = xhttpConvertJS.sys.sunrise;
 	    temp = Math.round(xhttpConvertJS.main.temp);
	    humidity = xhttpConvertJS.main.humidity;
	    pressure = xhttpConvertJS.main.pressure;
	    wind = xhttpConvertJS.wind.speed; 
	    weather = xhttpConvertJS.weather[0].main.toLowerCase();
	    description = xhttpConvertJS.weather[0].description.toUpperCase();

 	   
	 	    function dayNight(){
	 	    if(time >= sunset){
	 	    		/*document.body.style.backgroundImage = "url('images/night.jpg')";*/
	 	    		document.body.style.backgroundImage = "none";
	 	    		document.body.style.backgroundColor = "rgb(29, 135, 193, 0.2)";
	 	    		document.documentElement.style.backgroundImage = "url('images/night.jpg')";
	 	    		document.getElementById("icon").style.marginRight = "120px !important";
	 	    		console.log("Nightime")
	 	    	}
	 	    	else if(time < sunrise){
	 	    		/*document.body.style.backgroundImage = "url('images/night.jpg')";*/
	 	    		document.body.style.backgroundColor = "none";
	 	    		document.body.style.backgroundColor = "rgb(29, 135, 193, 0.2)";
	 	    		document.documentElement.style.backgroundImage = "url('images/night.jpg')";
	 	    		document.getElementById("icon").style.marginRight = "120px !important";
	 	    		console.log("Nightime")
	 	    	}
	 	    	else{
	 	    		document.documentElement.style.backgroundImage = "url('images/background.jpg')";
	 	    		document.body.style.backgroundImage = "url('images/background.jpg')";
	 	    		console.log("Daytime")
	 	    	}
	 	    }dayNight();

 	  	}

 	  	function outputPage(){
 	  		function display(){
 	  		var displayMain = document.querySelector(".three");
 	  		displayMain.style.display = "block";
 	  		}
 	  		var timer = setTimeout(display, 200);

 	  		
 	  		if(weather === "clouds"){
 	  			weather = "cloudy";
 	  		}
 	  		if(weather==="haze"){
 	  			weather = "fog"
 	  		}
 	  		if(weather==="smoke"){
 	  			weather = "fog"
 	  		}

 	  		document.querySelector(".city").innerHTML = city;
 	  		var i = document.getElementById("icon");

 	  			if(time >= sunset){
	 	    		i.className = ("wi wi-night-" + weather)
	 	    		if (weather = "cloudy") {
	 	    			document.getElementById("icon").style.marginLeft = "208px";
	 	    			document.getElementById("icon").style.fontSize = "110px";
	 	    		}
	 	    		
	 	    		console.log("Nightime")
	 	    	}
	 	    	else if(time < sunrise){
	 	    		i.className = ("wi wi-night-" + weather)
	 	    		if (weather = "cloudy") {
	 	    			document.getElementById("icon").style.marginLeft = "208px";
	 	    		}
	 	    		console.log("Nightime")
	 	    	}

	 	    	else{
	 	    		if(weather === "clear"){
 	  				weather = "sunny";
  					}
  					if(weather ==="haze"){
  						weather = "haze"
  					}
	 	    		i.className = ("wi wi-day-" + weather)
	 	    		document.getElementById("icon").style.marginLeft = "208px"
	 	    		console.log("Daytime")
	 	    	}
 	  		

 	  		console.log(weather)

 	  		//TEMPERATURE
 	  		var displayTemp = document.getElementById("temps");
 	  		displayTemp.innerHTML = "Temp: " + temp + "°C";
 	  		displayTemp.style.padding ="5px";

 	  		//DESCRIPTION
 	  		var displayDescription = document.getElementById("desc");
 	  		displayDescription.innerHTML = description;
 	  		//displayDescription.style.padding ="5px";

 	  		//HUMIDITY
 	  		var displayHumidity = document.getElementById("humidity");
 	  		displayHumidity.innerHTML = "Humidity: " + humidity + "%";
 	  		displayHumidity.style.padding ="5px";

 	  		//PRESSURE
 	  		var displayPressure = document.getElementById("pressure");
 	  		displayPressure.innerHTML = "Pressure: " + pressure + "mb";
 	  		displayPressure.style.padding ="5px";

 	  		//WIND
 	  		var displayWind = document.getElementById("wind");
 	  		displayWind.innerHTML = "Wind: " + wind;
 	  		displayWind.style.padding ="5px";
 	  	}outputPage();

 	    
	};
	xhttp.open("GET", "http://api.openweathermap.org/data/2.5/weather?q="+userInput+"&units=metric&appid=0dcaa6f800aac349ba2c373727c4ff42", true);
	xhttp.send(); 
}
document.getElementById("userInput")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("btn").click();
    }
});

document.getElementById("btn").addEventListener("click", function(){
	userInputString();
	httpRequestOpenWeather();

	
});



