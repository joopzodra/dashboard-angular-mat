import { Component, OnInit } from '@angular/core';
import { OpenweathermapService } from '../../../services/openweathermap/openweathermap.service';

@Component({
  selector: 'jr-openweathermap-widget',
  templateUrl: './openweathermap-widget.component.html',
  styleUrls: ['./openweathermap-widget.component.scss']
})
export class OpenweathermapWidgetComponent implements OnInit {

  constructor(private service: OpenweathermapService) { }

  ngOnInit() {
    this.service.getWidgetWeather('utrecht').subscribe(res => {
    console.log(res)      
    })
  }

}
