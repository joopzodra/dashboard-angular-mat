export const currentWeather = {
    city: '',
    description: '',
    icon: '',
    temp: <number | undefined>undefined,
    wind_direction: <number | undefined>undefined,
    wind_speed: <number | undefined>undefined
};

export const forecast = [{
    datetime: <number | undefined>undefined,
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

export function windSpeedBeaufort(speed: number) {
    // openweathermap windspeed unity is m/s
    // formula: https://nl.wikipedia.org/wiki/Schaal_van_Beaufort
    let beaufort = Math.round(Math.pow(speed / 0.836, 0.6666));
    if (beaufort > 12) {
        beaufort = 12;
    }
    return beaufort;
}

export function windDirection(degree: number) {
    const directions = ['N', 'NO', 'O', 'ZO', 'Z', 'ZW', 'W', 'NW', 'N'];
    const degreeToDirectionsIndex = Math.round(degree/45);
    return directions[degreeToDirectionsIndex];
}

export const getBackendHost = (backendUrl: string) => backendUrl.substring(0, backendUrl.indexOf('/dashboard'));
