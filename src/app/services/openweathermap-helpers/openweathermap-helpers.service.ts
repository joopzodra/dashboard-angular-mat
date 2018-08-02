import { Injectable } from '@angular/core';

import { OpenweathermapItem } from '../../models/openweathermap-item';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class OpenweathermapHelpersService {

    currentWeather = {
        city: '',
        description: '',
        icon: '',
        temp: <number | undefined>undefined,
        wind_direction: <number | undefined>undefined,
        wind_speed: <number | undefined>undefined
    };

    forecast = [{
        datetime: <number | undefined>undefined,
        day: '',
        time: '',
        description: '',
        icon: '',
        temp: <number | undefined>undefined,
        wind_direction: <number | undefined>undefined,
        wind_speed: <number | undefined>undefined
    }];

    private iconDict = {
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

    handleWeatherData(data: OpenweathermapItem, length: number | undefined): OpenweathermapItem {
        // current weather
        const currentWeather = data.current_weather;
        currentWeather.icon = this.iconToIconUrl(currentWeather.icon);

        // forecast
        const city = data.forecast.city;
        const forecastData = data.forecast.data.slice(0, length);
        forecastData.forEach(item => {
            const datetime = new Date((<number>item.datetime) * 1000)
            item.day = datetime.getDay().toString();
            item.time = datetime.getHours().toString() + 'u';
            item.icon = this.iconToIconUrl(item.icon);
        });

        return { city: data.city, current_weather: currentWeather, forecast: { city: city, data: forecastData } };
    }

    windSpeedBeaufort(speed: number) {
        // openweathermap windspeed unity is m/s
        // formula: https://nl.wikipedia.org/wiki/Schaal_van_Beaufort
        let beaufort = Math.round(Math.pow(speed / 0.836, 0.6666));
        if (beaufort > 12) {
            beaufort = 12;
        }
        return beaufort;
    }

    windDirection(degree: number | null) {
        if (degree === null) {
            return '';
        }
        const directions = ['N', 'NO', 'O', 'ZO', 'Z', 'ZW', 'W', 'NW', 'N'];
        const degreeToDirectionsIndex = Math.round(<number>degree / 45);
        return directions[degreeToDirectionsIndex];
    }

    private getBackendHost = (backendUrl: string) => backendUrl.substring(0, backendUrl.indexOf('/dashboard'));

    private iconToIconUrl(icon: string) {
        const iconName: string = (<any>this.iconDict)[icon.slice(0, -1)];
        const backendHost = this.getBackendHost(environment.backendBaseUrl);
        const iconLastChar = <'d' | 'n'>(icon.slice(-1));
        if (iconLastChar === 'd') {
            return `${backendHost}/uploads/dashboard/weather-icons/day/${iconName}.svg`;
        } else if (iconLastChar === 'n') {
            return `${backendHost}/uploads/dashboard/weather-icons/night/${iconName}.svg`;
        } else {
            // stub for test cases
            return 'assets-for-testing/stub-image.jpg';
        }
    }

}

