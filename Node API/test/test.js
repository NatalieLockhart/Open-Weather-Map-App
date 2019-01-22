var expect = require('chai').expect;
var forecastController = require('../controllers/forecastController.js');
var mockOpenWeatherAPIResponse = require('./mockOpenWeatherAPIResponse.js');
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
		var averageOfHighs2 = forecastController.getAverages(mockOpenWeatherAPIResponse, "maximum");
		
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
		var averageOfLows2 = forecastController.getAverages(mockOpenWeatherAPIResponse, "minimum");
		
		//3. ASSERT
		//Note: we can't use a typical "expect(value).to.be.equal.(value2) here
		//because chai.js has issues with marking two arrays as equal.
		expect(averageOfLows2).to.have.members([averageOfLows1[0], 
		averageOfLows1[1], averageOfLows1[2], averageOfLows1[3], averageOfLows1[4],
		averageOfLows1[5]]);
		
	});
});
	
	
	
	
	
	
	
	
	
	
	
	
	