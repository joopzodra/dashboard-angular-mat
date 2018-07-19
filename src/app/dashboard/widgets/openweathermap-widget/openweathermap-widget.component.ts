import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { environment } from '../../../../environments/environment'
import { OpenweathermapService } from '../../../services/openweathermap/openweathermap.service';
import { OpenweathermapItem, ForecastData } from '../../../models/openweathermap-item';
import { currentWeather, forecast, iconDict, windSpeedBeaufort, windDirection, getBackendHost } from '../../../helpers/openweathermap-helpers';

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
      if(cityKeyValue.length) {
        const cityValue = cityKeyValue[0].split('=')[1];
        city = cityValue;
      }
    this.getWeatherData(city);
    this.cityNames$ = this.service.cityNames$;
  }

  getWeatherData(city: string) {
    this.service.getWidgetWeather(city).subscribe(res => {
      this.handleWeatherData(res);
    },
      (err: HttpErrorResponse) => {
        this.errorMessage = err.error;
        return of();
      });
  }

  handleWeatherData(data: OpenweathermapItem) {
    // current weather
    this.currentWeather = data.current_weather;
    this.currentWeather.icon = this.iconToIconUrl(this.currentWeather.icon);

    // forecast
    this.forecast = data.forecast.data.slice(0, 9);
    this.forecast.forEach(item => {
      const datetime = new Date((<number>item.datetime) * 1000)
      item.day = datetime.getDay().toString();
      item.time = datetime.getHours().toString() + 'u';
      item.icon = this.iconToIconUrl(item.icon);
    });
  }

  iconToIconUrl = (icon: string) => {
    const iconLastChar = <'d' | 'n'>(icon.slice(-1));
    const dayOrNight = iconLastChar === 'd' ? 'day' : 'night';
    const iconName: string = (<any>iconDict)[icon.slice(0, -1)];
    const backendHost = getBackendHost(environment.backendBaseUrl);
    return `${backendHost}/uploads/dashboard/weather-icons/${dayOrNight}/${iconName}.svg`;
  }

  cityChanged(event: MatSelectChange) {
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

}
