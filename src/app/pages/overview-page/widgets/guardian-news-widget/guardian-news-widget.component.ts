import { Component } from '@angular/core';

import { GuardianNewsService } from '../../../../services/guardian-news/guardian-news.service';
import { NewsWidgetComponent } from '../news-widget/news-widget.component';

/*
 * The GuardianNewsWidgetComponent shows Guardian tech news items.
 * The component uses the html template and scss file in the news-widget directory.
 * Its properties set the values in the html template.
 * It exposes its GuardianNewsService to its super, the NewsWidgetComponent.
 * On clicking a newsitem the user is navigated to the GuardianNewsPageComponent, with the selected item opened.
 */

@Component({
  selector: 'jr-guardian-news-widget',
  templateUrl: '../news-widget/news-widget.component.html',
  styleUrls: ['../news-widget/news-widget.component.scss'],
})
export class GuardianNewsWidgetComponent extends NewsWidgetComponent {

  widgetTitle = 'Tech nieuws';
  logoSrc = 'assets/The_Guardian_2018.svg';
  logoAlt = 'logo The Guardian';
  logoWidth = '80px';
  logoHeight = '30px';
  buttonText = 'Meer tech nieuws';
  routerLink = '/paginas/tech-nieuws';

  constructor(protected newsService: GuardianNewsService) {
    super(newsService);
  }

}
