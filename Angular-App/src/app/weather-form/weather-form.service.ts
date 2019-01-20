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

  zipCodeURL: string = "http://localhost:3000/weather/zipCode/";
  cityURL: string =  "http://localhost:3000/weather/city/";
  

  constructor(private http:HttpClient) { }

  //call the Node API to get the forecast
  getWeather(queryString): Observable<any>{
    if(isNaN(queryString[0])){
      return this.http.get(this.cityURL + queryString);
    }
    else{
      return this.http.get(this.zipCodeURL + queryString);
    }
  }
}
