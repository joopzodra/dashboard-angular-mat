import { Component, OnInit } from '@angular/core';
import { GuardianNewsService } from '../../../services/guardian-news/guardian-news.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'jr-guardian-news-widget',
  templateUrl: './guardian-news-widget.component.html',
  styleUrls: ['./guardian-news-widget.component.scss']
})
export class GuardianNewsWidgetComponent implements OnInit {

  items: any[] = [];
  errorMessage = '';

  constructor(private newsService: GuardianNewsService) { }

  ngOnInit() {
    this.getNews()
  }

  getNews() {
    this.newsService.getNews()
      .subscribe((res: any) => {
        this.items = res.map((item: any) => ({
          title: item.response.content.webTitle,
          trailText: item.response.content.fields.trailText,
          thumbnail: item.response.content.fields.thumbnail
        }))
      },
      (errorResponse: HttpErrorResponse) => this.errorMessage = errorResponse.error
      )
  }
}
