const https = require('https');
const axios = require('axios');
var cors = require('cors');
var express = require('express');
var app = express();            
const port = 3000;

app.use(cors());

app.options('/weather', function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.end();
});

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/weather', function(req, res) {
	
	var something;
	weatherGet(res).then(data => {
		res.send(data);
	})
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


function weatherGet(){
    var apiKey = '7bf5d1bb8a756b8177afbb2ee2e3be3e';
	var zipCode = '80223';
	//todo: switch to xml
	return axios.get(`https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}&appid=${apiKey}`)
	  .then(response => {
		return response.data;
	  })
	  .catch(error => { 
		console.log(error);
	  });
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