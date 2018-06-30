export interface ForecastData {
  datetime: number,
  description: string,
  icon: string,
  temp: number,
  wind_direction: number,
  wind_speed: number,
  day?: number,
  time?: string
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
    data: ForecastData[]
  }
}