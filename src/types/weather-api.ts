export type Coords = { lat: number; lon: number };

export type WeatherApiLocation = {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
};

export type WeatherApiCondition = {
    text: string;
    icon: string;
    code: number;
};

export type WeatherApiCurrent = {
    last_updated_epoch: number;
    last_updated: string;
    temp_c: number;
    is_day: number;
    condition: WeatherApiCondition;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    precip_mm: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    windchill_c: number;
    heatindex_c: number;
    dewpoint_c: number;
    vis_km: number;
    uv: number;
    gust_kph: number;
    short_rad: number;
    diff_rad: number;
    dni: number;
    gti: number;
};

export type DayAstro = {
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    moon_phase: string;
    moon_illumination: number;
    is_moon_up: number;
    is_sun_up: number;
};

export type Condition = {
    text: string;
    icon: string;
    code: number;
};

export type DayHour = {
    time_epoch: number;
    time: string;
    temp_c: number;
    is_day: number;
    condition: Condition;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    precip_mm: number;
    snow_cm: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    windchill_c: number;
    heatindex_c: number;
    dewpoint_c: number;
    will_it_rain: number;
    chance_of_rain: number;
    will_it_snow: number;
    chance_of_snow: number;
    vis_km: number;
    gust_kph: number;
    uv: number;
    short_rad: number;
    diff_rad: number;
    dni: number;
    gti: number;
};

export type DayDay = {
    maxtemp_c: number;
    mintemp_c: number;
    avgtemp_c: number;
    maxwind_kph: number;
    totalprecip_mm: number;
    totalsnow_cm: number;
    avgvis_km: number;
    avghumidity: number;
    daily_will_it_rain: number;
    daily_chance_of_rain: number;
    daily_will_it_snow: number;
    daily_chance_of_snow: number;
    condition: Condition;
    uv: number;
};

export type ForecastDay = {
    date: string;
    date_epoch: number;
    day: DayDay;
    astro: DayAstro;
    hour: DayHour[];
};

export type WeatherApiResponse = {
    location: WeatherApiLocation;
    current: WeatherApiCurrent;
    forecast: {
        forecastday: ForecastDay[];
    };
};

export const testData: WeatherApiResponse = {
    location: {
        name: "Kyiv",
        region: "Kyyivs'ka Oblast'",
        country: "Ukraine",
        lat: 50.4333,
        lon: 30.5167,
        tz_id: "Europe/Kiev",
        localtime_epoch: 1758282888,
        localtime: "2025-09-19 14:54",
    },
    current: {
        last_updated_epoch: 1758284100,
        last_updated: "2025-09-19 15:15",
        temp_c: 21.4,
        is_day: 1,
        condition: {
            text: "Partly Cloudy",
            icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
            code: 1003,
        },
        wind_kph: 19.4,
        wind_degree: 286,
        wind_dir: "WNW",
        pressure_mb: 1019.0,
        precip_mm: 0.0,
        humidity: 48,
        cloud: 53,
        feelslike_c: 21.4,
        windchill_c: 21.4,
        heatindex_c: 24.3,
        dewpoint_c: 9.9,
        vis_km: 10.0,
        uv: 2.5,
        gust_kph: 24.2,
        short_rad: 439.73,
        diff_rad: 126.81,
        dni: 490.63,
        gti: 40.3,
    },
    forecast: {
        forecastday: [
            {
                date: "2025-09-19",
                date_epoch: 1758240000,
                day: {
                    maxtemp_c: 21.6,
                    mintemp_c: 11.3,
                    avgtemp_c: 16.8,
                    maxwind_kph: 21.6,
                    totalprecip_mm: 0.08,
                    totalsnow_cm: 0.0,
                    avgvis_km: 10.0,
                    avghumidity: 61,
                    daily_will_it_rain: 0,
                    daily_chance_of_rain: 0,
                    daily_will_it_snow: 0,
                    daily_chance_of_snow: 0,
                    condition: {
                        text: "Partly Cloudy ",
                        icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
                        code: 1003,
                    },
                    uv: 0.9,
                },
                astro: {
                    sunrise: "06:40 AM",
                    sunset: "07:03 PM",
                    moonrise: "03:34 AM",
                    moonset: "06:20 PM",
                    moon_phase: "Waning Crescent",
                    moon_illumination: 8,
                    is_moon_up: 0,
                    is_sun_up: 0,
                },
                hour: [
                    {
                        time_epoch: 1758229200,
                        time: "2025-09-19 00:00",
                        temp_c: 14.7,
                        is_day: 0,
                        condition: {
                            text: "Overcast ",
                            icon: "//cdn.weatherapi.com/weather/64x64/night/122.png",
                            code: 1009,
                        },
                        wind_kph: 8.6,
                        wind_degree: 310,
                        wind_dir: "NW",
                        pressure_mb: 1021.0,
                        precip_mm: 0.0,
                        snow_cm: 0.0,
                        humidity: 62,
                        cloud: 97,
                        feelslike_c: 14.5,
                        windchill_c: 14.5,
                        heatindex_c: 14.8,
                        dewpoint_c: 7.5,
                        will_it_rain: 0,
                        chance_of_rain: 0,
                        will_it_snow: 0,
                        chance_of_snow: 0,
                        vis_km: 10.0,
                        gust_kph: 15.4,
                        uv: 0,
                        short_rad: 0,
                        diff_rad: 0,
                        dni: 0,
                        gti: 0,
                    },
                ],
            },
        ],
    },
};
