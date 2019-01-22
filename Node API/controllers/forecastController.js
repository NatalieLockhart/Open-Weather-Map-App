const https = require('https');
const axios = require('axios');
const Forecast = require('../models/forecast.js');

class forecastController{
	
	constructor() {}
	
	//This method calculates the temperature averages over 5 days. 
	//If the string "minimum" is passed in for targetTemp, it gets the minimum temp averages. Otherwise, it gets the maximum temp averages.
	getAverages(data, targetTemp){	
		var i = 0;
		var tempArray = [];
		var sameDate = data[0].dt_txt.split(' ')[0];
		var tempCount = 0;
		var currentHighOrLow = 0;
		
		while(i < data.length){
			var date = data[i].dt_txt.split(' ')[0];
			
			//if the date has changed or we have reached the end of the dataset, add the current high/low temperature to the temperature Array
			if(i == data.length-1){
				currentHighOrLow = this.incrementAverages(data[i], currentHighOrLow, targetTemp);
				tempCount++;
			}
			
			if(date != sameDate || i == data.length-1){
				currentHighOrLow = (currentHighOrLow/tempCount) * 9/5 - 459.67;
				tempArray.push(Math.round(100*currentHighOrLow)/100);
				tempCount = 0;
				currentHighOrLow = 0;
				sameDate = date;
			}

			currentHighOrLow = this.incrementAverages(data[i], currentHighOrLow, targetTemp);
			tempCount++;
			i++;
		}
		return tempArray;
	}
	
	incrementAverages(data, currentHighOrLow, targetTemp){
		if(targetTemp == "minimum"){
			currentHighOrLow += data.main.temp_min;
		}
		else{
			currentHighOrLow += data.main.temp_max;
		}
		return currentHighOrLow;
	}

	//OpenWeatherMap api call using a zip code
	weatherGetFromZip(res, zipCode){
		var apiKey = '7bf5d1bb8a756b8177afbb2ee2e3be3e';
		return axios.get(`https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}&appid=${apiKey}`)
		  .then(response => {
			var highTempArray = this.getAverages(response.data.list, "maximum");
			var lowTempArray = this.getAverages(response.data.list, "minimum");
			var dateArray = this.createDateArray();
			var forecast = new Forecast(response.data.city.name, highTempArray, lowTempArray, dateArray);
			return JSON.stringify(forecast);
		  })
		  .catch(error => { 
			console.log(error);
		  });
	}
	
	//OpenWeatherMap api call using a city 
	weatherGetFromCity(res, city){
		var apiKey = '7bf5d1bb8a756b8177afbb2ee2e3be3e';
		return axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city},us&appid=${apiKey}`)
		  .then(response => {
			var highTempArray = this.getAverages(response.data.list, "maximum");
			var lowTempArray = this.getAverages(response.data.list, "minimum");
			var dateArray = this.createDateArray();
			var forecast = new Forecast(response.data.city.name, highTempArray, lowTempArray, dateArray);
			return JSON.stringify(forecast);
		  })
		  .catch(error => { 
			console.log(error);
		  });
	}
	
	//check if the zip code parameter has 5 characters that are all numbers
	isValidZip(zipCode){
		if(zipCode.length != 5 || (zipCode.match(/[a-z]/i))){
			return false;
		}
		return true;
	}	

	//check if the city parameter has any numbers in it
	isValidCity(city){
		if(city.match(/\d/)){
			return false;
		}
		return true;
	}
	
	//returns an array with today's date and the next 5 days converted into strings
	createDateArray() {
		var datesArray = [];
		
		for(var i = 0; i < 6; i++){
			var currentDate = new Date();
			currentDate.setDate(currentDate.getDate() + i);
			
			var dd = currentDate.getDate();
			var mm = currentDate.getMonth() + 1; //January is 0!
			var yyyy = currentDate.getFullYear();

			if (dd < 10) {
			  dd = '0' + dd;
			}

			if (mm < 10) {
			  mm = '0' + mm;
			}

			datesArray.push([mm, dd, yyyy].join('-'));
		}
		return datesArray;
	}
}

module.exports = forecastController;
