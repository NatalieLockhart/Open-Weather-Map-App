import { Component, OnInit } from '@angular/core';
import { WeatherFormService } from './weather-form.service';
import { IWeatherForecast } from './IWeatherForecast';

@Component({
  selector: 'app-weather-form',
  templateUrl: './weather-form.component.html',
  styleUrls: ['./weather-form.component.css']
})
export class WeatherFormComponent implements OnInit {

  forecast : IWeatherForecast; 
  tempPopulated : boolean;
  constructor(private weatherFormService: WeatherFormService) { }

  //subscribe to the WeatherFormService so we can recieve the results of the call to the node API
  getWeather(queryString): void {
    this.weatherFormService.getWeather(queryString).subscribe(
      data => {this.forecast = data, console.log("Here is the temperature: " + this.forecast.highsArray), this.tempPopulated = true},
      err => console.error(err),
      () => console.log("did the thing")
    );
  }
  
  ngOnInit() {
    this.tempPopulated = false;
  }

}
