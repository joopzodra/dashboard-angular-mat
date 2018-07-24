import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { of, Observable, Subscription } from 'rxjs';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { environment } from '../../../../environments/environment'
import { OpenweathermapService } from '../../../services/openweathermap/openweathermap.service';
import { ForecastData } from '../../../models/openweathermap-item';
import { currentWeather, forecast, windSpeedBeaufort, windDirection, handleWeatherData } from '../../../helpers/openweathermap-helpers';

/*
 * The OpenweathermapWidgetComponent
 */

@Component({
  selector: 'jr-openweathermap-widget',
  templateUrl: './openweathermap-widget.component.html',
  styleUrls: ['./openweathermap-widget.component.scss']
})
export class OpenweathermapWidgetComponent implements OnInit {

  currentWeather = currentWeather;
  forecast: ForecastData[] = forecast;
  errorMessage = '';
  cityNames$: Observable<string[]> = of([]);
  @ViewChild('citySelect') citySelect!: MatSelect;

  constructor(private service: OpenweathermapService) { }

  ngOnInit() {
    let city = 'utrecht';
    const cookies = document.cookie.split(';');
    const cityKeyValue = cookies.filter((item) => item.includes('dashboardMdOpenweathermapCity='));
    if (cityKeyValue.length) {
      const cityValue = cityKeyValue[0].split('=')[1];
      city = cityValue;
    }
    this.getWeatherData(city);
    this.cityNames$ = this.service.cityNames$;
  }

  getWeatherData(city: string) {
    this.service.getWidgetWeather(city).subscribe(res => {
      const weatherData = handleWeatherData(res, 9);
      this.currentWeather = weatherData.current_weather;
      this.forecast = weatherData.forecast.data;
    },
      (err: HttpErrorResponse) => {
        this.errorMessage = err.error;
        return of();
      });
  }

  cityChanged(event: MatSelectChange) {
    event
    const city = event.value.toLowerCase().replace(/ /g, '');
    document.cookie = "dashboardMdOpenweathermapCity=" + city + "; max-age=31536000"; // max-age is 60*60*24*365 seconds = 1 year
    this.getWeatherData(city);
    this.citySelect.value = '';
  }

  windSpeedBeaufort(speed: number) {
    return windSpeedBeaufort(speed);
  }

  windDirection(degree: number) {
    return windDirection(degree);
  }

  stopEventPropagation(event: Event){
    event.stopPropagation();
  }
}
