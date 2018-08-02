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

export const stubItemForHelpersSpecs = {
    city: 'utrecht',
    "current_weather": {
        "city": "Utrecht",
        "description": "onbewolkt",
        "icon": "01d",
        "temp": 21,
        "wind_speed": 2,
        "wind_direction": 310
    },
    "forecast": {
        "city": "Utrecht",
        "data": [
            {
                "datetime": 1533200400,
                "description": "onbewolkt",
                "icon": "01d",
                "temp": 27,
                "wind_speed": 2,
                "wind_direction": 120
            },
            {
                "datetime": 1533211200,
                "description": "onbewolkt",
                "icon": "01d",
                "temp": 31,
                "wind_speed": 2,
                "wind_direction": 295
            },
            {
                "datetime": 1533222000,
                "description": "onbewolkt",
                "icon": "01d",
                "temp": 31,
                "wind_speed": 3,
                "wind_direction": 317
            },
            {
                "datetime": 1533232800,
                "description": "onbewolkt",
                "icon": "01d",
                "temp": 29,
                "wind_speed": 4,
                "wind_direction": 337
            },
            {
                "datetime": 1533243600,
                "description": "onbewolkt",
                "icon": "01n",
                "temp": 23,
                "wind_speed": 4,
                "wind_direction": 344
            },
            {
                "datetime": 1533254400,
                "description": "onbewolkt",
                "icon": "01n",
                "temp": 20,
                "wind_speed": 3,
                "wind_direction": 7
            },
            {
                "datetime": 1533265200,
                "description": "onbewolkt",
                "icon": "01n",
                "temp": 17,
                "wind_speed": 1,
                "wind_direction": 349
            },
            {
                "datetime": 1533276000,
                "description": "onbewolkt",
                "icon": "01d",
                "temp": 21,
                "wind_speed": 2,
                "wind_direction": 4
            },
            {
                "datetime": 1533286800,
                "description": "onbewolkt",
                "icon": "01d",
                "temp": 28,
                "wind_speed": 2,
                "wind_direction": 357
            },
            {
                "datetime": 1533297600,
                "description": "onbewolkt",
                "icon": "01d",
                "temp": 31,
                "wind_speed": 2,
                "wind_direction": 331
            },
            {
                "datetime": 1533308400,
                "description": "onbewolkt",
                "icon": "01d",
                "temp": 31,
                "wind_speed": 4,
                "wind_direction": 334
            },
            {
                "datetime": 1533319200,
                "description": "onbewolkt",
                "icon": "01d",
                "temp": 29,
                "wind_speed": 5,
                "wind_direction": 352
            },
            {
                "datetime": 1533330000,
                "description": "licht bewolkt",
                "icon": "02n",
                "temp": 23,
                "wind_speed": 5,
                "wind_direction": 355
            },
            {
                "datetime": 1533340800,
                "description": "licht bewolkt",
                "icon": "02n",
                "temp": 21,
                "wind_speed": 4,
                "wind_direction": 1
            },
            {
                "datetime": 1533351600,
                "description": "onbewolkt",
                "icon": "01n",
                "temp": 19,
                "wind_speed": 3,
                "wind_direction": 6
            },
            {
                "datetime": 1533362400,
                "description": "onbewolkt",
                "icon": "01d",
                "temp": 20,
                "wind_speed": 3,
                "wind_direction": 15
            },
            {
                "datetime": 1533373200,
                "description": "onbewolkt",
                "icon": "01d",
                "temp": 25,
                "wind_speed": 4,
                "wind_direction": 12
            }
        ]
    }
}
