interface ForecastDataItem {
  datetime: number,
  description: string,
  icon: string,
  temp: number,
  wind_direction: number,
  wind_speed: number
}

export interface OpenweathermapItem {
  current_weather: {
    city: string,
    description: string,
    icon: string,
    temp: number,
    wind_direction: number,
    wind_speed: number
  },
  forecast: {
    city: string,
    data: ForecastDataItem[]
  }
}