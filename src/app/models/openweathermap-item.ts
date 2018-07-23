export interface ForecastData {
  datetime: number | undefined,
  description: string,
  icon: string,
  temp: number | undefined,
  wind_direction: number | undefined,
  wind_speed: number | undefined,
  day?: string,
  time?: string
}

export interface OpenweathermapItem {
  city: string,
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