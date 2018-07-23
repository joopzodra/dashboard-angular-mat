import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { BreakpointsService } from '../../services/breakpoints/breakpoints.service';
import { OpenweathermapItem } from '../../models/openweathermap-item';
import { OpenweathermapService } from '../../services/openweathermap/openweathermap.service';
import { currentWeather, forecast, windSpeedBeaufort, windDirection, handleWeatherData } from '../../helpers/openweathermap-helpers';
import { ProcessedWeatherItem } from '../../models/processed-weather-item';

@Component({
  selector: 'jr-openweathermap-page',
  templateUrl: './openweathermap-page.component.html',
  styleUrls: ['./openweathermap-page.component.scss']
})
export class OpenweathermapPageComponent implements OnInit, OnDestroy {

  columns = 1;
  breakpointsSubscription!: Subscription;
  items: ProcessedWeatherItem[] = [];
  selectedCity: ProcessedWeatherItem | undefined;
  errorMessage = '';
  selectedCityStyle = {};
  pageContentStyle = {};

  constructor(private breakpointsService: BreakpointsService, private openweathermapService: OpenweathermapService) { }

  ngOnInit() {
    this.breakpointsSubscription = this.breakpointsService.breakpoints$.subscribe(value => {
      let screenSize;
      if (value.large) {
        screenSize = 'large';
      } else if (value.medium) {
        screenSize = 'medium';
      } else if (value.tablet) {
        screenSize = 'tablet'
      } else {
        screenSize = 'small';
      }

      if (screenSize === 'medium' || screenSize === 'large') {
        this.columns = 2;
        this.pageContentStyle = {
          'flex-flow': 'row'
        }
        this.selectedCityStyle = {
          'order': '2',
          'max-width': 'none',
          'margin-left': '16px',
          'margin-top': '8px'
        }
      } else {
        this.columns = 1;
        this.pageContentStyle = {
          'max-width': '600px',
          'margin': '0 auto'
        };
        this.selectedCityStyle = {};
      }
    });

    this.openweathermapService.getPageWeather().subscribe(res => {
      const weatherData = res.map(cityData => handleWeatherData(cityData, undefined));
      this.items = weatherData;

      let city = 'utrecht';
      const cookies = document.cookie.split(';');
      const cityKeyValue = cookies.filter((item) => item.includes('dashboardMdOpenweathermapCity='));
      if (cityKeyValue.length) {
        const cityValue = cityKeyValue[0].split('=')[1];
        city = cityValue;
      }
      this.selectedCity = this.items.find(item => item.city === city);
    },
      (err: HttpErrorResponse) => {
        this.errorMessage = err.error;
        return of();
      });
  }

  ngOnDestroy() {
    this.breakpointsSubscription.unsubscribe();
  }

  windSpeedBeaufort(speed: number) {
    return windSpeedBeaufort(speed);
  }

  windDirection(degree: number) {
    return windDirection(degree);
  }

  selectItem(item: any) {
    this.selectedCity = item;
    console.log(item)
    window.scrollTo({ top: 0, behavior: 'auto' })
    //const city = event.value.toLowerCase().replace(/ /g, '');
    //document.cookie = "dashboardMdOpenweathermapCity=" + city + "; max-age=31536000"; // max-age is 60*60*24*365 seconds = 1 year
  }
}
