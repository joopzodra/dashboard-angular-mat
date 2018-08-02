import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { Router, NavigationExtras } from '@angular/router';

import { IexService } from '../../../../services/iex/iex.service';
import { IexDayItem } from '../../../../models/iex-items';

/*
 * We need to lazy load the tab. Otherwise the IexChartComponent cannot create the chart (because elements have size 0 or even don't exist).  From https://material.angular.io/components/tabs/overview#lazy-loading:
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

  companyData: Observable<IexDayItem[] | {}> = of();
  chartHeight = 150;
  weekdays = ['maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag', 'zondag'];
  errorMessage = '';

  constructor(private service: IexService, private router: Router) { }

  ngOnInit() {
    this.companyData = this.service.getWidgetData()
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.errorMessage = err.error
          return of()
        })
      )
  }

  navigate(i: any) {
    let navigationExtras: NavigationExtras = {
      queryParams: { 'item-index': i },
    };
    this.router.navigate(['/paginas/tech-aandelen'], navigationExtras);
  }
}
