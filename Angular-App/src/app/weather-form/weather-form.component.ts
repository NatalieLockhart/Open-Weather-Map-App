import { Component, OnInit } from '@angular/core';
import { WeatherFormService } from './weather-form.service';

@Component({
  selector: 'app-weather-form',
  templateUrl: './weather-form.component.html',
  styleUrls: ['./weather-form.component.css']
})
export class WeatherFormComponent implements OnInit {

  temperatures : number[]; 
  constructor(private weatherFormService: WeatherFormService) { }

  getWeather(): void {
    this.temperatures = this.weatherFormService.getWeather();
  }
  
  ngOnInit() {
    this.getWeather();
  }

}
