import { Component, OnInit } from '@angular/core';
import { WeatherFormService } from './weather-form.service';
import { IWeatherForecast } from './IWeatherForecast';

@Component({
  selector: 'app-weather-form',
  templateUrl: './weather-form.component.html',
  styleUrls: ['./weather-form.component.css']
})
export class WeatherFormComponent implements OnInit {

  temperatures : IWeatherForecast; 
  tempPopulated : boolean;
  constructor(private weatherFormService: WeatherFormService) { }

  getWeather(): void {
    //this.temperatures = this.weathesrFormService.getWeather();
    this.weatherFormService.getWeather().subscribe(
      data => {this.temperatures = data, console.log("Here is the temperature: " + this.temperatures.highs), this.tempPopulated = true},
      err => console.error(err),
      () => console.log("did the thing")
    );
  }
  
  ngOnInit() {
    //this.getWeather();
    this.tempPopulated = false;
  }

}
