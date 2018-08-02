import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { BreakpointsService } from '../../services/breakpoints/breakpoints.service';
import { IexDayItem, IexLongtermItem } from '../../models/iex-items';
import { IexService } from '../../services/iex/iex.service';

/*
 * In the IexPageComponent, take care that the containing div gets a width of 100%. (If necessairy, continu adding a width of 100% to some parent elements.)
 */

@Component({
  selector: 'jr-iex-page',
  templateUrl: './iex-page.component.html',
  styleUrls: ['./iex-page.component.scss']
})
export class IexPageComponent implements OnInit {

  iexDayItems: IexDayItem[] = [];
  iexSelectedCompanyDayItem!: IexDayItem;
  iexSelectedCompanyLongtermItem!: IexLongtermItem;
  chartHeight = 120;
  weekdays = ['maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag', 'zondag'];
  columns = 1;
  breakpointsSubscription!: Subscription;
  errorMessage = '';
  selectedCompanyStyle = {};
  pageContentStyle = {};

  constructor(
    private iexService: IexService,
    private breakpointsService: BreakpointsService,
    private location: Location,
    protected activatedRoute: ActivatedRoute,
    protected titleService: Title
    ) { }

  ngOnInit() {
    const title = this.activatedRoute.snapshot.data['title'];
    if (title) {
      this.titleService.setTitle(title);
    }
    
    this.breakpointsSubscription = this.breakpointsService.breakpoints$.subscribe(screenSize => {
      if (screenSize.medium || screenSize.large) {
        this.columns = 2;
        this.pageContentStyle = {
          'flex-flow': 'row'
        }
        this.selectedCompanyStyle = {
          'order': '2',
          'margin-left': '16px',
          'margin-top': '8px'
        }
      } else {
        this.columns = 1;
        this.pageContentStyle = {
          'align-items': 'center'
        };
        this.selectedCompanyStyle = {};
      }
    });

    this.iexService.iexDayData$.subscribe(data => {
      if ((data as HttpErrorResponse).error) {
        this.errorMessage = (data as HttpErrorResponse).error;
      } else if ((data as IexDayItem[]).length) { // Test for length because the BehaviourSubject on initiation sends an empty array.
        this.iexDayItems = data as IexDayItem[];
        // setInitialSelectedCompany needs iexDayItems, so call it after setting the iexDayItems, i.e. within this subscription.
        this.setInitialSelectedCompany();
      }
    });
    this.iexService.iexLongtermData$.subscribe(data => {
      // The BehaviourSubject on initiation sends undefined, which causes an error 'cannot read property "error" of undefined.'
      if (data !== undefined && (data as HttpErrorResponse).error) {
        this.errorMessage = (data as HttpErrorResponse).error;
      } else {
        this.iexSelectedCompanyLongtermItem = <IexLongtermItem>data;
      }
    });
    this.iexService.getDayData();
  }

  ngOnDestroy() {
    this.breakpointsSubscription.unsubscribe();
  }

  selectCompany(companySymbol: string) {
    this.iexService.getLongtermData(companySymbol);
    this.iexSelectedCompanyDayItem = this.iexDayItems.find(item => item.day.symbol === companySymbol) as IexDayItem;
    document.cookie = "iexCompanySymbol=" + companySymbol + "; max-age=31536000"; // max-age is 60*60*24*365 seconds = 1 year*/
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  setInitialSelectedCompany() {
    // If the url which navigated to this component contains a query param, use this for the selected company. Then, replace the url by an url without query param.
    // Else, if there's a cookie with an selected company, use this for the selected company.
    // Else, use the default selected company.
    const urlFragments = this.location.path().split('?');
    const companySymbolQueryParam = urlFragments[1];
    if (companySymbolQueryParam) {
      const companySymbol = companySymbolQueryParam.split('=')[1];
      this.selectCompany(companySymbol);
      this.location.replaceState(urlFragments[0]);
    } else if (companyInCookie()) {
      this.selectCompany(<string>companyInCookie());
    } else {
      const defaultCompanySymbol = this.iexDayItems[0].day.symbol;
      this.selectCompany(defaultCompanySymbol);
    }

    function companyInCookie() {
      const cookies = document.cookie.split(';');
      const companySymbol = cookies.filter((item) => item.includes('iexCompanySymbol='));
      if (companySymbol.length) {
        const symbol = companySymbol[0].split('=')[1];
        return symbol;
      }
      return undefined;
    }
  }
}
