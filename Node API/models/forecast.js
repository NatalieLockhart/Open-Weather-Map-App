class Forecast {
	constructor(locationName, highsArray, lowsArray, date){
		this.locationName = locationName;
		this.highsArray = highsArray;
		this.lowsArray = lowsArray;
		this.date = date;
	}
}

module.exports = Forecast;