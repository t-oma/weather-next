import { Coords, WeatherApiResponse } from "@/types/weather-api";
import { hget } from "./helpers";
import { RequestInit } from "next/dist/server/web/spec-extension/request";

/**
 * Get weather data for a given location
 *
 * @param location Location name
 * @throws Error if API key is not set or location is invalid
 * @returns Weather data
 */
export async function getWeather(
    coords: Coords,
    options?: RequestInit
): Promise<WeatherApiResponse> {
    const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    if (!API_KEY) {
        throw new Error("Missing WEATHER_API_KEY environment variable");
    }

    const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${coords.lat},${coords.lon}&days=1&aqi=no&alerts=no`;

    const response = await hget<WeatherApiResponse>(url, options);

    return response;
}
