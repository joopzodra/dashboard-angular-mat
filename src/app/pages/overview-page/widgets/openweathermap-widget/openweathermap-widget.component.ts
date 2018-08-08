import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { of, Observable, Subscription } from 'rxjs';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';

import { environment } from '../../../../../environments/environment'
import { OpenweathermapDataService } from '../../../../services/openweathermap-data/openweathermap-data.service';
import { OpenweathermapHelpersService } from '../../../../services/openweathermap-helpers/openweathermap-helpers.service';
import { ForecastData } from '../../../../models/openweathermap-item';

/*
 * The OpenweathermapWidgetComponent
 */

@Component({
  selector: 'jr-openweathermap-widget',
  templateUrl: './openweathermap-widget.component.html',
  styleUrls: ['./openweathermap-widget.component.scss']
})
export class OpenweathermapWidgetComponent implements OnInit {

  @ViewChild('citySelect') citySelect!: MatSelect;
  currentWeather = this.openweathermapHelpersService.currentWeather;
  forecast: ForecastData[] = this.openweathermapHelpersService.forecast;
  errorMessage = '';
  cityNames$: Observable<string[]> = of([]);

  constructor(private openweathermapDataService: OpenweathermapDataService, private openweathermapHelpersService: OpenweathermapHelpersService, private router: Router) { }

  ngOnInit() {
    let city = 'utrecht';
    const cookies = document.cookie.split(';');
    const cityKeyValue = cookies.filter((item) => item.includes('dashboardMdOpenweathermapCity='));
    if (cityKeyValue.length) {
      const cityValue = cityKeyValue[0].split('=')[1];
      city = cityValue;
    }
    this.getWeatherData(city);
    this.cityNames$ = this.openweathermapDataService.cityNames$;
  }

  getWeatherData(city: string) {
    this.openweathermapDataService.getWidgetWeather(city).subscribe(res => {
      const weatherData = this.openweathermapHelpersService.handleWeatherData(res, 9);
      this.currentWeather = weatherData.current_weather;
      this.forecast = weatherData.forecast.data;
    },
      (err: HttpErrorResponse) => {
        this.errorMessage = err.error;
        return of();
      });
  }

  cityChanged(event: MatSelectChange) {
    const city = event.value.toLowerCase().replace(/ /g, '');
    document.cookie = "dashboardMdOpenweathermapCity=" + city + "; max-age=31536000"; // max-age is 60*60*24*365 seconds = 1 year
    this.getWeatherData(city);
    this.citySelect.value = '';
  }

  windSpeedBeaufort(speed: number) {
    return this.openweathermapHelpersService.windSpeedBeaufort(speed);
  }

  windDirection(degree: number) {
    return this.openweathermapHelpersService.windDirection(degree);
  }

  stopEventPropagation(event: Event) {
    event.stopPropagation();
  }

  navigate() {
    this.router.navigate(['/weer']);
  }
}
