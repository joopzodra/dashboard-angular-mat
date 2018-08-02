import { stubItemForHelpersSpecs } from '../../testing/stub-openweathermap-item';
import { OpenweathermapHelpersService } from './openweathermap-helpers.service';
import { environment } from '../../../environments/environment';

describe('OpenweathermapHelpersService', () => {

  let service: OpenweathermapHelpersService;

  beforeEach(() => {
    service = new OpenweathermapHelpersService();
  })

  it('its handleWeatherData method returns data in the expected format', () => {
    const handledData = service.handleWeatherData(stubItemForHelpersSpecs, undefined);
    const backendHost = (<any>service).getBackendHost(environment.backendBaseUrl);
    expect(handledData.city).toBe('utrecht', 'handledData.city fails');
    expect(handledData.current_weather.city).toBe('Utrecht', 'handledData.current_weather.city fails');
    expect(handledData.current_weather.icon).toBe(backendHost + '/uploads/dashboard/weather-icons/day/sunny.svg', 'handledData.current_weather.icon fails');
    expect(handledData.forecast.data.length).toBe(17, 'handledData.forecast.data.length fails');

    const handledForecast = handledData.forecast.data[0];
    expect(handledForecast.datetime).toBe(1533200400, 'handledForecast.datetime fails');
    expect(handledForecast.time).toBe('11u', 'handledForecast.time fails');
    expect(handledForecast.icon).toBe(backendHost + '/uploads/dashboard/weather-icons/day/sunny.svg','handledForecast.icon fails')

    const handledDataShorterForecast = service.handleWeatherData(stubItemForHelpersSpecs, 9);
    expect(handledDataShorterForecast.forecast.data.length).toBe(9, 'handledDataShorterForecast.forecast.data.length fails');
  });

  it('its windSpeedBeaufort method converts speed in m/s to the correct speed in Beaufort', () => {
    const bf = service.windSpeedBeaufort;
    expect(bf(1.7)).toBe(2);
    expect(bf(9.2)).toBe(5);
    expect(bf(25)).toBe(10);
  });

  it('its windDirection method converts degrees to the correct direction indication', () => {
    const wd = service.windDirection;
    expect(wd(0)).toBe('N');
    expect(wd(85)).toBe('O');
    expect (wd(116)).toBe('ZO');
  });

});
