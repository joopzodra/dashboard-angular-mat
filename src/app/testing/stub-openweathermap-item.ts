const stubForecastDataItem = {
  datetime: 1,
  description: 'forecast description',
  icon: '',
  temp: 1,
  wind_direction: 1,
  wind_speed: 1
}

export const stubOpenweathermapItem = {
  city: 'city',
  current_weather: {
    city: 'city',
    description: 'current weather description',
    icon: '',
    temp: 2,
    wind_direction: 2,
    wind_speed: 2
  },
  forecast: {
    city: 'city',
    data: [...[stubForecastDataItem, stubForecastDataItem]]
  }
}

export const anotherStubOpenweathermapItem = {
  city: 'another city',
  current_weather: { ...stubOpenweathermapItem.current_weather },
  forecast: { ...stubOpenweathermapItem.forecast }
};
anotherStubOpenweathermapItem.current_weather.city = 'another city';
