var expect = require('chai').expect;
var forecastController = require('../controllers/forecastController.js');
var mockOpenWeatherAPIResponse = require('./mockOpenWeatherAPIResponse.js');
var Forecast = require('../models/forecast.js');

var forecastController = new forecastController();

describe('forecastController.getAverages(data, "maximum")', function (){
	it('should get the average of max temperatures from an OpenWeatherMap API response', function () {
		
		//1. ARRANGE
		var averageOfHighs1 = [(270.35 + 271.52)/2, 
		(269.17 + 261.2 + 258.244 + 259.555 + 260.762 + 263.428 + 273.523 + 275.632)/8, 
		(272.532 + 270.781 + 268.876 + 267.74 + 266.254 + 263.851 + 270.508 + 273.369)/8,
		(270.273 + 267.739 + 265.989 + 264.051 + 263.014 + 263.495 + 275.729 + 277.147)/8, 
		(274.286 + 272.77 + 270.847 + 268.174 + 267.747 + 268.164 + 276.25 + 277.916)/8,
		(276.008 + 274.121 + 273.54 + 272.175 + 268.187 + 267.609)/6];
		
		//convert the averages to Fahrenheit and round to the hundredth
		for(i = 0; i < averageOfHighs1.length; i++){
			averageOfHighs1[i] = averageOfHighs1[i] * 9/5 - 459.67;
			averageOfHighs1[i] = Math.round(100*averageOfHighs1[i])/100;
		}
		
		//2. ACT
		var averageOfHighs2 = forecastController.getAverages(mockOpenWeatherAPIResponse.list, "maximum");
		
		//3. ASSERT
		//Note: we can't use a typical "expect(value).to.be.equal.(value2) here
		//because chai.js has issues with marking two arrays as equal.
		expect(averageOfHighs2).to.have.members([averageOfHighs1[0], averageOfHighs1[1], averageOfHighs1[2], averageOfHighs1[3], averageOfHighs1[4],
		averageOfHighs1[5]]);
		
	});
});

describe('forecastController.getAverages(data, "minimum")', function (){
	it('should get the average of min temperatures from an OpenWeatherMap API response', function () {
		
		//1. ARRANGE
		var averageOfLows1 = [(267.472 + 269.358)/2, 
		(267.733 + 260.481 + 258.244 + 259.555 + 260.762 + 263.428 + 273.523 + 275.632)/8, 
		(272.532 + 270.781 + 268.876 + 267.74 + 266.254 + 263.851 + 270.508 + 273.369)/8,
		(270.273 + 267.739 + 265.989 + 264.051 + 263.014 + 263.495 + 275.729 + 277.147)/8, 
		(274.286 + 272.77 + 270.847 + 268.174 + 267.747 + 268.164 + 276.25 + 277.916)/8,
		(276.008 + 274.121 + 273.54 + 272.175 + 268.187 + 267.609)/6];
		
		//convert the averages to Fahrenheit and round to the hundredth
		for(i = 0; i < averageOfLows1.length; i++){
			averageOfLows1[i] = averageOfLows1[i] * 9/5 - 459.67;
			averageOfLows1[i] = Math.round(100*averageOfLows1[i])/100;
		}
		
		//2. ACT
		var averageOfLows2 = forecastController.getAverages(mockOpenWeatherAPIResponse.list, "minimum");
		
		//3. ASSERT
		//Note: we can't use a typical "expect(value).to.be.equal.(value2) here
		//because chai.js has issues with marking two arrays as equal.
		expect(averageOfLows2).to.have.members([averageOfLows1[0], 
		averageOfLows1[1], averageOfLows1[2], averageOfLows1[3], averageOfLows1[4],
		averageOfLows1[5]]);
		
	});
});

describe('forecastController.getAverages(data, targetTemp)', function (){
	it('should return an empty array if passed null data', function () {
		
		//1. ARRANGE
		var result1 = [];
		var invalidOpenWeatherAPIResponse = null;
		
		//2. ACT
		var result2 = forecastController.getAverages(invalidOpenWeatherAPIResponse, "minimum");
		
		//3. ASSERT
		expect(result1).to.have.members([]);
	});
});

describe('forecastController.isValidZip(zipCode)', function (){
	it('should return false when zipCode parameter contains letters', function () {
		
		//1. ARRANGE
		
		//2. ACT
		var result = forecastController.isValidZip("711a08");
		
		//3. ASSERT
		expect(result).to.be.false;
	});
});

describe('forecastController.isValidZip(zipCode)', function (){
	it('should return false when zipCode parameter is longer than 5 characters', function () {
		
		//1. ARRANGE
		
		//2. ACT
		var result = forecastController.isValidZip("711061");
		
		//3. ASSERT
		expect(result).to.be.false;
	});
});

describe('forecastController.isValidZip(zipCode)', function (){
	it('should return true when zip code is 5 numbers and contains no letters', function () {
		
		//1. ARRANGE
		
		//2. ACT
		var result = forecastController.isValidZip("71106");
		
		//3. ASSERT
		expect(result).to.be.true;
	});
});

describe('forecastController.isValidCity(city)', function (){
	it('should return false when city parameter contains numbers', function () {
		
		//1. ARRANGE
		
		//2. ACT
		var result = forecastController.isValidCity("shrev1eport");
		
		//3. ASSERT
		expect(result).to.be.false;
	});
});

describe('forecastController.isValidCity(city)', function (){
	it('should return true when city parameter contains no numbers', function () {
		
		//1. ARRANGE
		
		//2. ACT
		var result = forecastController.isValidCity("shreveport");
		
		//3. ASSERT
		expect(result).to.be.true;
	});
});

describe('forecastController.createDateArray', function (){
	it('should create an array containing today and the 5 dates after today in "mm-dd-yyyy" format', function () {
		
		//1. ARRANGE
		var currentDate = new Date();
		var dd = currentDate.getDate();
			var mm = currentDate.getMonth() + 1; //January is 0!
			var yyyy = currentDate.getFullYear();

			if (dd < 10) {
			  dd = '0' + dd;
			}

			if (mm < 10) {
			  mm = '0' + mm;
			}
		var result1 = [mm,dd,yyyy].join('-');	
		
		
		//2. ACT
		var result2 = forecastController.createDateArray();
		
		//3. ASSERT
		expect(result2[0]).to.equal(result1);
	});
});

describe('forecastController.incrementAverages(data,currentHighOrLow, targetTemp)', function (){
	it('should increment the currentHighOrLow parameter with the min temp from the data parameter when targetTemp is "minimum"', function () {
		
		//1. ARRANGE
		var currentHighOrLow = 0;
		var temp_min = 267.472;
		var temp_max = 270.35;
		var result1 = currentHighOrLow + temp_min;		
		
		//2. ACT
		var result2 = forecastController.incrementAverages(mockOpenWeatherAPIResponse.list[0], 0, "minimum");
		
		//3. ASSERT
		expect(result2).to.equal(result1);
	});
});

describe('forecastController.incrementAverages(data,currentHighOrLow, targetTemp)', function (){
	it('should increment the currentHighOrLow parameter with the max temp from the data parameter when targetTemp is "maximum"', function () {
		
		//1. ARRANGE
		var currentHighOrLow = 0;
		var temp_min = 267.472;
		var temp_max = 270.35;
		var result1 = currentHighOrLow + temp_max;		
		
		//2. ACT
		var result2 = forecastController.incrementAverages(mockOpenWeatherAPIResponse.list[0], 0, "maximum");
		
		//3. ASSERT
		expect(result2).to.equal(result1);
	});
});
	