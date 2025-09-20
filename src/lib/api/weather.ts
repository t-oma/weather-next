import { testData, WeatherApiResponse } from "@/types/weather-api";
import { hget } from "./helpers";
import { RequestInit } from "next/dist/server/web/spec-extension/request";

/**
 * Get weather data for a given location
 * @param location Location name
 * @throws Error if API key is not set or location is invalid
 * @returns Weather data
 */
export async function getWeather(
    latitude: number,
    longitude: number,
    options?: RequestInit
): Promise<WeatherApiResponse> {
    const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    if (!API_KEY) {
        throw new Error("Missing WEATHER_API_KEY environment variable");
    }

    const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=1&aqi=no&alerts=no`;

    return testData;

    const response = await hget<WeatherApiResponse>(url, {
        next: {
            revalidate: 60,
            tags: ["weather", `location:${latitude},${longitude}`],
        },
        ...options,
    });

    return response;
}
