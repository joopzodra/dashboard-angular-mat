const stubForecastDataItem  = {
  datetime: 1,
  description: 'stub description 1',
  icon: 'stub icon url 1',
  temp: 1,
  wind_direction: 1,
  wind_speed: 1
}

export const stubOpenweathermapItem = {
  current_weather: {
    city: 'stub city name',
    description: 'stub description 2',
    icon: 'stub icon url 2',
    temp: 2,
    wind_direction: 2,
    wind_speed: 2
  },
  forecast: {
    city: 'stub city name',
    data: [stubForecastDataItem, stubForecastDataItem]
  }
}
