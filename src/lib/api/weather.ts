import { testData, WeatherApiResponse } from "@/types/weather-api";
import { hget } from "./helpers";

export async function getWeather(
    location: string
): Promise<WeatherApiResponse | null> {
    const API_KEY = process.env.WEATHER_API_KEY;
    if (!API_KEY) {
        console.error("Missing WEATHER_API_KEY environment variable");
        return null;
    }

    const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=1&aqi=no&alerts=no`;

    return testData;

    try {
        const response = await hget<WeatherApiResponse>(url, {
            next: {
                revalidate: 60,
                tags: ["weather", `location:${location}`],
            },
        });

        return response;
    } catch (error) {
        console.error(error);
        return null;
    }
}
