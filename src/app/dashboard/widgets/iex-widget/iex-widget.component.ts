import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { tap } from 'rxjs/operators'

import { IexService } from '../../../services/iex/iex.service';
import { IexDayItem } from '../../../models/iex-items';

/*
 * The IexChartComponent needs the width of its nativeElement before building the chart, in order to determine its own width. If not lazy loading the tabs, only one tab has width, while the other have width 0. Therefore we need to lazy load the tab: then the chart is build when the tab has width. From https://material.angular.io/components/tabs/overview#lazy-loading:
 * By default, the tab contents are eagerly loaded. Eagerly loaded tabs will initalize the child components but not inject them into the DOM until the tab is activated.
 * If the tab contains several complex child components or the tab's contents rely on DOM calculations during initialization, it is advised to lazy load the tab's content.
 * Tab contents can be lazy loaded by declaring the body in a ng-template with the matTabContent attribute.
 */

@Component({
  selector: 'jr-iex-widget',
  templateUrl: './iex-widget.component.html',
  styleUrls: ['./iex-widget.component.scss']
})
export class IexWidgetComponent implements OnInit {

  companyData: Observable<IexDayItem[]> = of([]);
  chartHeight = 150;
  weekdays = ['maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag', 'zondag'];

  constructor(private service: IexService) { }

  ngOnInit() {
    this.companyData = this.service.getWidgetData();
  }

}
