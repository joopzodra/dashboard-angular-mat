import { Component, OnInit } from '@angular/core';
import { NosNewsService } from '../../../services/nos-news/nos-news.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'jr-nos-news-widget',
  templateUrl: './nos-news-widget.component.html',
  styleUrls: ['./nos-news-widget.component.scss']
})
export class NosNewsWidgetComponent implements OnInit {

  items: any[] = [];
  errorMessage = '';

  constructor(private newsService: NosNewsService) { }

  ngOnInit() {
    this.getNews();
  }

  getNews() {
    this.newsService.getNews()
      .subscribe((res: any) => {
        const regex = RegExp('<p>(.*?)<\/p>')
        this.items = res.map((item: any) => {
          const regexResult = regex.exec(item.description[0]);
          return {
            title: item.title[0],
            trailText: regexResult ? regexResult[1] : '',
            thumbnail: item.enclosure[0].$.url
          }
        }),
          (errorResponse: HttpErrorResponse) => this.errorMessage = errorResponse.error
      })
  }
}