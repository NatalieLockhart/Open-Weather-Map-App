import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherFormService {

  temperatures: number[] = [1,2,3];

  constructor() { }

  getWeather(): number[] {
    return this.temperatures;
  }
}
