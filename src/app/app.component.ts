import { CommonModule, DecimalPipe, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherService } from './services/weather.service';
import { WeatherData } from './models/weather.model';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, DecimalPipe, HttpClientModule, FormsModule],
  providers: [WeatherService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'weather-app';
  weatherData?: WeatherData;
  cityName: string = 'São Paulo';

  constructor(private weatherService: WeatherService) { }


  ngOnInit() {
    this.getWeather(this.cityName);
  }


  getWeather(cityName: string) {
    this.weatherService.getCurrentWeather(cityName).subscribe({
      next: (response) => {
        this.weatherData = response;
      },
      complete: () => {},
      error: (error) => {
        console.error('Erro ao buscar o clima:', error);
      },
    }
    );
  }

  onSubmit(form: NgForm) {
    this.getWeather(this.cityName);
    this.cityName = "";
  }
}
