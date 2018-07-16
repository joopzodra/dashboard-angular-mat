import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

import { environment } from '../../../../environments/environment'
import { OpenweathermapService } from '../../../services/openweathermap/openweathermap.service';
import { OpenweathermapItem, ForecastData } from '../../../models/openweathermap-item';
import { currentWeather, forecast, iconDict, getBackendHost } from '../../../helpers/openweathermap-helpers';

@Component({
  selector: 'jr-openweathermap-widget',
  templateUrl: './openweathermap-widget.component.html',
  styleUrls: ['./openweathermap-widget.component.scss']
})
export class OpenweathermapWidgetComponent implements OnInit {

  currentWeather = currentWeather;
  forecast = forecast;
  errorMessage = '';

  constructor(private service: OpenweathermapService) { }

  ngOnInit() {
    this.service.getWidgetWeather('utrecht').subscribe(res => {
      this.handleWeatherData(res);
    },
      (err: HttpErrorResponse) => {
        this.errorMessage = err.error;
        return of();
      })
  }

  handleWeatherData(data: OpenweathermapItem) {
    // current weather
    this.currentWeather = data.current_weather;
    this.currentWeather.icon = this.iconToIconUrl(this.currentWeather.icon);

    // forecast
    const forecast = data.forecast.data;
    forecast.forEach(item => {
      const datetime = new Date(item.datetime * 1000)
      // console.log(datetime,datetime.getDay())
      item.day = datetime.getDay()
      item.icon = this.iconToIconUrl(item.icon);
    })
    // console.log(forecast)
  }

  iconToIconUrl = (icon: string) => {
    const iconLastChar = <'d' | 'n'>(icon.slice(-1));
    const dayOrNight = iconLastChar === 'd' ? 'day' : 'night';
    const iconName: string = (<any>iconDict)[icon.slice(0, -1)];
    const backendHost = getBackendHost(environment.backendBaseUrl);
    return `${backendHost}/uploads/dashboard/weather-icons/${dayOrNight}/${iconName}.svg`;
  }
}
