import { of } from 'rxjs';
import { OpenweathermapItem } from '../models/openweathermap-item';
import { stubOpenweathermapItem} from './stub-openweathermap-item';

export class MockOpenweatherService {

  getWidgetWeather(city: string) {
    return of(stubOpenweathermapItem);
  }

  getPageWeather() {
    console.log('getPageWeather has to be implemented in MockOpenweatherService')
  }
}
