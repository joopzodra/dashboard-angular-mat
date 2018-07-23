import { Component } from '@angular/core';
import { Location } from '@angular/common';

import { NewsItem } from '../../models/news-item';
import { GuardianNewsService } from '../../services/guardian-news/guardian-news.service';
import { NewsPageComponent } from '../news-page/news-page.component';
import { BreakpointsService } from '../../services/breakpoints/breakpoints.service';

@Component({
  selector: 'jr-guardian-news-page',
  templateUrl: '../news-page/news-page.component.html',
  styleUrls: ['../news-page/news-page.component.scss']
})
export class GuardianNewsPageComponent extends NewsPageComponent {

  pageTitle = "Tech news";
  logoSrc = 'assets/The_Guardian_2018.svg';
  logoAlt = 'logo The Guardian';
  logoWidth = '80px';
  logoHeight = '30px';
  
  constructor(protected breakpointsService: BreakpointsService, protected newsService: GuardianNewsService, protected location: Location) {
    super(breakpointsService, newsService, location)
  }

}
