const https = require('https');
const axios = require('axios');
const apicache = require('apicache');
var cors = require('cors');
var express = require('express');
var app = express();            
const port = 3000;
var cache = apicache.middleware;

app.use(cors());
app.use(cache('3 hours'));

app.get('/will-be-cached', (req, res) => {
  res.json({ success: true })
})

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/weather/zipCode/:zipCode', function(req, res) {	
	weatherGetFromZip(res, req.params.zipCode).then(data => {
		res.send(data);
	})
});

app.get('/weather/city/:city', function(req, res){
	weatherGetFromCity(res,req.params.city).then(data => {
		res.send(data);
	})
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


function weatherGetFromZip(res, zipCode){
    var apiKey = '7bf5d1bb8a756b8177afbb2ee2e3be3e';
	//todo: switch to xml
	// if(!isValidZip(zipCode)){
	  // return "The zip code was invalid.";
	// }
	return axios.get(`https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}&appid=${apiKey}`)
	  .then(response => {
		highTempArray = getAverages(response.data.list, "maximum");
		lowTempArray = getAverages(response.data.list, "minimum");
		var tempAverages = {highs: highTempArray, lows: lowTempArray};
		return tempAverages;
	  })
	  .catch(error => { 
		console.log(error);
	  });
}

function weatherGetFromCity(res, city){
    var apiKey = '7bf5d1bb8a756b8177afbb2ee2e3be3e';
	//todo: switch to xml
	// if(!isValidCity(city)){
	  // return "The city was invalid.";
	// }
	return axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city},us&appid=${apiKey}`)
	  .then(response => {
		highTempArray = getAverages(response.data.list, "maximum");
		lowTempArray = getAverages(response.data.list, "minimum");
		var tempAverages = {highs: highTempArray, lows: lowTempArray};
		return tempAverages;
	  })
	  .catch(error => { 
		console.log(error);
	  });
}
  
function isValidZip(zipCode){
	return true;
}	

function isValidCity(city){
	return true;
}
  
//This method calculates the temperature averages over 5 days. 
//If the string "minimum" is passed in for targetTemp, it gets the minimum temp averages. Otherwise, it gets the maximum temp averages.
function getAverages(data, targetTemp){	
	var i = 0;
	var tempArray = [];
	var sameDate = data[0].dt_txt.split(' ')[0];
	var tempCount = 0;
	var currentHighOrLow = 0;
	
	while(i < data.length){
		var date = data[i].dt_txt.split(' ')[0];
		
		//if the date has changed or we have reached the end of the dataset, add the current high/low temperature to the temperature Array
		if(date != sameDate || i == data.length-1){
			currentHighOrLow = (currentHighOrLow/tempCount) * 9/5 - 459.67;
			tempArray.push(Math.round(100*currentHighOrLow)/100);
			tempCount = 0;
			currentHighOrLow = 0;
			sameDate = date;
		}
		else{
			if(targetTemp == "minimum"){
				currentHighOrLow += data[i].main.temp_min;
			}
			else{
				currentHighOrLow += data[i].main.temp_max;
			}
			tempCount++;
		}
		i++;
	}
	return tempArray;
}