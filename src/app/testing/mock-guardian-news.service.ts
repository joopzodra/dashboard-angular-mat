import { of, forkJoin } from 'rxjs';

const newsItem = {
  response: {
    content: {
      webTitle: 'stub title',
      fields: {
        trailText: 'stub trailtext',
        thumbnail: './img/guardian-500.jpg'
      }
    }
  }
}

export class MockGuardianNewsService {
  getNews() {
    return forkJoin([of(newsItem), of(newsItem), of(newsItem)]);
  }
}

