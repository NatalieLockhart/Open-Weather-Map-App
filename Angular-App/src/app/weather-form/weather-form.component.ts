import { Component, OnInit } from '@angular/core';
import { WeatherFormService } from './weather-form.service';

@Component({
  selector: 'app-weather-form',
  templateUrl: './weather-form.component.html',
  styleUrls: ['./weather-form.component.css']
})
export class WeatherFormComponent implements OnInit {

  temperatures : any; 
  constructor(private weatherFormService: WeatherFormService) { }

  getWeather(): void {
    //this.temperatures = this.weatherFormService.getWeather();
    this.weatherFormService.getWeather().subscribe(
      data => {this.temperatures = data, console.log(data)},
      err => console.error(err),
      () => console.log("did the thing")
    );
  }
  
  ngOnInit() {
    this.getWeather();
  }

}
