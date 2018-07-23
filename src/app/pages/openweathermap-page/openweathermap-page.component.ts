import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { BreakpointsService } from '../../services/breakpoints/breakpoints.service';
import { OpenweathermapItem } from '../../models/openweathermap-item';
import { OpenweathermapService } from '../../services/openweathermap/openweathermap.service';
import { currentWeather, forecast, windSpeedBeaufort, windDirection, handleWeatherData } from '../../helpers/openweathermap-helpers';

@Component({
  selector: 'jr-openweathermap-page',
  templateUrl: './openweathermap-page.component.html',
  styleUrls: ['./openweathermap-page.component.scss']
})
export class OpenweathermapPageComponent implements OnInit, OnDestroy {

  columns = 1;
  breakpointsSubscription!: Subscription;
  items  = <any>[];
  errorMessage = '';

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
        // this.thumbnailClass = 'thumbnail-large';
        this.columns = 2;
      } else {
        // this.thumbnailClass = 'thumbnail-medium';
        this.columns = 1;
      }

      this.openweathermapService.getPageWeather().subscribe(res => {
        const weatherData = res.map(cityData => handleWeatherData(cityData, undefined));
        console.log(weatherData)
        this.items = weatherData
        //this.currentWeather = weatherData.currentWeather;
        //this.forecast = weatherData.forecast;
      },
        (err: HttpErrorResponse) => {
          this.errorMessage = err.error;
          return of();
        });
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

  selectItem(item: OpenweathermapItem) {

  }
}
