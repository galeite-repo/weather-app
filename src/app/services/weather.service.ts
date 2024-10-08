import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment'; 
import { Observable } from 'rxjs';
import { WeatherData } from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = environment.apiUrl;
  private apiKey = environment.token;

  constructor(private http: HttpClient) { }

  getCurrentWeather(place: string): Observable<WeatherData> {
    const headers = new HttpHeaders({
      'X-Rapidapi-Key': this.apiKey,
      'X-Rapidapi-Host': environment.appHost,
      'Accept': 'application/json'
    });

    const params = { place: place, mode: 'json', units: 'C', lang: 'pt_br' };

    return this.http.get<WeatherData>(this.apiUrl, { headers, params });
  }
}
