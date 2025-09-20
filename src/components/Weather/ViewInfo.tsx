"use client";

import { Separator } from "@/components/ui/separator";
import { Skeleton } from "../ui/skeleton";
import { useWeatherQuery } from "@/hooks/useWeatherQuery";
import { useGeolocation } from "@/hooks/useGeolocation";
import { WeatherApiResponse } from "@/types/weather-api";

const weatherSelector = (data: WeatherApiResponse) => ({
    current: data.current,
    location: data.location,
});

export default function ViewInfo() {
    const { coords, error: geoError, loading: geoLoading } = useGeolocation();
    const {
        data: weather,
        error: fetchError,
        isFetching,
    } = useWeatherQuery(coords, weatherSelector);

    if (geoError) {
        return (
            <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-sm text-red-400">{geoError}</p>
            </div>
        );
    }
    if (fetchError) {
        return (
            <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-sm text-red-400">{fetchError.message}</p>
            </div>
        );
    }

    if (!weather || isFetching) {
        return (
            <div className="absolute right-6 bottom-6 left-6">
                <div className="flex flex-col text-white">
                    <Skeleton className="h-6 w-32" />
                    <div className="flex items-center gap-2">
                        <Skeleton className="mt-2 h-12 w-32" />
                        <span className="text-6xl font-bold">°C</span>
                    </div>
                </div>
                <Separator className="my-2" />
                <div className="flex items-center justify-between gap-2 text-white">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-5 w-32" />
                </div>
            </div>
        );
    }

    return (
        <div className="absolute right-6 bottom-6 left-6">
            <div className="flex flex-col text-white">
                <span className="text-xl font-medium">
                    {weather.current.condition.text}
                </span>
                <span className="text-6xl font-bold">
                    {weather.current.temp_c} °C
                </span>
            </div>
            <Separator className="my-2" />
            <div className="flex items-center justify-between gap-2 text-white">
                <span className="text-sm">
                    {weather.location.name}, {weather.location.country}
                </span>
                <span className="text-xs">
                    {new Date(weather.location.localtime).toLocaleString()}
                </span>
            </div>
        </div>
    );
}
