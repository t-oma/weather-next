"use client";

import WindCard from "./WindCard";
import HumidityCard from "./HumidityCard";
import AstrologyCard from "./AstrologyCard";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useWeatherQuery } from "@/hooks/useWeatherQuery";
import { Skeleton } from "@/components/ui/skeleton";
import DetailsTemperature from "./Temperature";
import { Separator } from "@/components/ui/separator";

export default function Details() {
    const { coords, error: geoError, loading: geoLoading } = useGeolocation();
    const {
        data: weather,
        error: fetchError,
        isFetching,
    } = useWeatherQuery(coords);

    if (geoError) {
        return (
            <div className="flex flex-1/3 items-center justify-center">
                <p className="text-xl font-semibold">{geoError}</p>
            </div>
        );
    }
    if (fetchError) {
        return (
            <div className="flex flex-1/3 items-center justify-center">
                <p className="text-xl font-semibold">{fetchError.message}</p>
            </div>
        );
    }

    if (!weather || isFetching) {
        return (
            <section className="flex flex-1 flex-col overflow-y-scroll scroll-smooth px-4">
                <h2 className="sr-only">Weather details</h2>
                <div className="flex items-center justify-evenly gap-2 p-2">
                    <Skeleton className="bg-secondary h-[44px] w-16" />
                    <Skeleton className="bg-secondary h-[44px] w-16" />
                </div>
                <Separator className="w-full" />
                <div className="flex flex-1 flex-col gap-4 py-4">
                    <Skeleton className="h-full min-h-40 w-full bg-purple-300/50" />
                    <Skeleton className="bg-primary-300/50 h-full min-h-40 w-full" />
                    <Skeleton className="h-full min-h-40 w-full bg-green-300/50" />
                </div>
            </section>
        );
    }

    return (
        <section className="flex flex-1 flex-col overflow-y-scroll scroll-smooth px-4">
            <h2 className="sr-only">Weather details</h2>
            <DetailsTemperature
                temp={weather.current.temp_c}
                feelslike={weather.current.feelslike_c}
            />
            <Separator className="" />
            <div className="flex flex-1 flex-col gap-4 py-4">
                <WindCard {...weather.current} />
                <HumidityCard
                    {...weather.current}
                    {...weather.forecast.forecastday[0].day}
                />
                <AstrologyCard {...weather.forecast.forecastday[0].astro} />
            </div>
        </section>
    );
}

// [&::-webkit-scrollbar]:w-2
// [&::-webkit-scrollbar-thumb]:rounded-full
// [&::-webkit-scrollbar-thumb]:bg-zinc-300
// [&::-webkit-scrollbar-track]:rounded-full
// [&::-webkit-scrollbar-track]:bg-zinc-100
