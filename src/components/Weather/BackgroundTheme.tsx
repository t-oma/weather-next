"use client";

import { useGeolocation } from "@/hooks/useGeolocation";
import { useWeatherQuery } from "@/hooks/useWeatherQuery";
import { classifyWeather } from "@/lib/weather-classify";
import { WeatherApiResponse } from "@/types/weather-api";
import { useEffect } from "react";
import EffectsHost from "./Effects/Host";

const weatherSelector = (data: WeatherApiResponse) => ({
    code: data.current.condition.code,
    isDay: data.current.is_day === 1,
});

export default function BackgroundTheme() {
    const { coords, error: geoError } = useGeolocation();
    const {
        data: weather,
        error: fetchError,
        isFetching,
    } = useWeatherQuery(coords, weatherSelector);

    useEffect(() => {
        if (!weather || isFetching) return;
        const { category, intensity } = classifyWeather(weather.code);

        const root = document.documentElement;
        root.setAttribute("data-weather", category);
        root.setAttribute("data-intensity", intensity);
        root.setAttribute("data-time", weather.isDay ? "day" : "night");
    }, [weather, isFetching]);

    if (!weather || isFetching) return;
    const { category, intensity } = classifyWeather(weather.code);

    return (
        <EffectsHost
            category={"rain"}
            intensity={"heavy"}
        />
    );
    // return null;
}
