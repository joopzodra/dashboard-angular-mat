import { Component } from '@angular/core';
import { NosNewsService } from '../../../services/nos-news/nos-news.service';
import { NewsWidgetComponent } from '../news-widget/news-widget.component';

/*
 * The NosNewsWidgetComponent shows NOS news items.
 * The component uses the html template and scss file in the news-widget directory.
 * Its properties sets the values in the html template.
 * It exposes its NosNewsService to its super, the NewsWidgetComponent.
 */

@Component({
  selector: 'jr-nos-news-widget',
  templateUrl: '../news-widget/news-widget.component.html',
  styleUrls: ['../news-widget/news-widget.component.scss']
})
export class NosNewsWidgetComponent extends NewsWidgetComponent {

  widgetTitle = 'Nieuws';
  logoSrc = 'assets/200px-NOS_logo.png';
  logoAlt = 'NOS logo';
  logoWidth = '50px';
  logoHeight = '18px';

 constructor(protected newsService: NosNewsService) {
     super(newsService)
  }
}
