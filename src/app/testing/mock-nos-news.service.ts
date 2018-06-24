import { of } from 'rxjs';

const newsItem = {
  title: 'stub title',
  description: "<p>stub paragraph1</p>↵<p>stub paragraph2</p>↵<p>stub paragraph3</p>↵<h2>stub h2</h2>↵<p>stub paragraph4 </p>↵",
  enclosure: [
    {
      $: {
        url: './img/nos-320x320.jpg'
      }
    }
  ]
}

const newsItems = [newsItem, newsItem, newsItem];

export class MockNosNewsService {
  getNews() {
    return of(newsItems);
  }
}


