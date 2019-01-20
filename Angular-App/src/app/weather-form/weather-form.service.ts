import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class WeatherFormService {

  temperatures: number[];
  url: string = "http://localhost:3000/weather/zipCode/80223"
  

  constructor(private http:HttpClient) { }

  getWeather(): Observable<any>{
    //here, make a call to the node API and fill this array from that.
    //return this.temperatures;
    return this.http.get(this.url);
  }
}
