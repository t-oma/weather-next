"use client";

import { Separator } from "../ui/separator";
import {
    Cloud,
    Droplet,
    Moon,
    Sunrise,
    Sunset,
    Thermometer,
    Umbrella,
    Wind,
} from "lucide-react";
import DetailsCard from "./DetailsCard";
import DetailsTemperature from "./DetailsTemperature";
import DetailsItem from "./DetailsItem";
import { useWeatherStore } from "@/providers/weather";
import { Skeleton } from "../ui/skeleton";
import WindCard from "./WindCard";
import HumidityCard from "./HumidityCard";
import AstrologyCard from "./AstrologyCard";

export default function Details() {
    const weather = useWeatherStore((state) => state.weather);
    const loading = useWeatherStore((state) => state.loading);
    const error = useWeatherStore((state) => state.error);

    if (error) {
        return (
            <div className="flex flex-1/3 items-center justify-center">
                <p className="text-xl font-semibold">{error}</p>
            </div>
        );
    }

    if (!weather) {
        return (
            <section className="flex flex-1 flex-col overflow-y-scroll scroll-smooth px-4">
                <h2 className="sr-only">Weather details</h2>
                <div className="flex items-center justify-evenly gap-2 p-2">
                    <Skeleton className="bg-secondary h-[44px] w-16" />
                    <Skeleton className="bg-secondary h-[44px] w-16" />
                </div>
                <Separator className="" />
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
