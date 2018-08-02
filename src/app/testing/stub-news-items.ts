import { NewsItem } from '../models/news-item';

const newsItem1: NewsItem = {
  title: 'title1',
  trailText: 'trail text',
  thumbnail: '',
  body: 'body text'
};

const newsItem2 = Object.assign({}, newsItem1, {title: 'title2'});
const newsItem3 = Object.assign({}, newsItem1, {title: 'title3'});

export const newsItemsArray = [newsItem1, newsItem2, newsItem3];
