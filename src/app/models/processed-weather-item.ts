interface ProcessedForecast {
  datetime: number | undefined,
  description: string,
  icon: string,
  temp: number | undefined,
  wind_direction: number | undefined,
  wind_speed: number | undefined,
  day?: string | undefined
  time?: string | undefined
}

export interface ProcessedWeatherItem {
  city: string,
  currentWeather: {
    city: string,
    description: string,
    icon: string,
    temp: number,
    wind_direction: number,
    wind_speed: number
  },
  forecast: ProcessedForecast[]
}

