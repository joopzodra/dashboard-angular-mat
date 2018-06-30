export const  currentWeather = {
    city: '',
    description: '',
    icon: '',
    temp: <number | undefined>undefined,
    wind_direction: <number | undefined>undefined,
    wind_speed: <number | undefined>undefined
  };

export const  forecast = [{
    day: '',
    time: '',
    description: '',
    icon: '',
    temp: <number | undefined>undefined,
    wind_direction: <number | undefined>undefined,
    wind_speed: <number | undefined>undefined
  }];

export const iconDict = {
    "01": "sunny",
    "02": "partlysunny",
    "03": "cloudy",
    "04": "cloudy",
    "09": "rain",
    "10": "flurries",
    "11": "tstorms",
    "13": "snow",
    "50": "hazy"
  };

export const getBackendHost = (backendUrl: string) => backendUrl.substring(0, backendUrl.indexOf('/dashboard'));
