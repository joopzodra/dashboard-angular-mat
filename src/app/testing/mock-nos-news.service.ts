import { of } from 'rxjs';
import { NewsItem } from '../models/news-item';

const newsItem: NewsItem = {
  title: 'stub title',
  trailText: 'stub trail text',
  thumbnail: '',
  body: 'stub body text'
}

export class MockNosNewsService {

  getWidgetNews() {
    return of(Array(3).fill(newsItem));
  }

  getPageNews() {
    console.log('getPageNews has to be implemented in MockNosNewsService')
  }
}
