import { Component } from '@angular/core';

import { NewsItem } from '../../models/news-item';
import { NosNewsService } from '../../services/nos-news/nos-news.service';
import { NewsPageComponent } from '../news-page/news-page.component';
import { BreakpointsService } from '../../services/breakpoints/breakpoints.service';

@Component({
  selector: 'jr-nos-news-page',
  templateUrl: '../news-page/news-page.component.html',
  styleUrls: ['../news-page/news-page.component.scss']
})
export class NosNewsPageComponent extends NewsPageComponent {

  pageTitle = "Nieuws";
  logoSrc = 'assets/200px-NOS_logo.png';
  logoAlt = 'NOS logo';
  logoWidth = '50px';
  logoHeight = '18px';
  
  constructor(protected breakpointsService: BreakpointsService, protected newsService: NosNewsService) {
    super(breakpointsService, newsService)
  }

}
