class Forecast {
	constructor(locationName, highsArray, lowsArray, datesArray){
		this.locationName = locationName;
		this.highsArray = highsArray;
		this.lowsArray = lowsArray;
		this.datesArray = datesArray;
	}
}

module.exports = Forecast;