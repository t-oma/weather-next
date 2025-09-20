"use client";

import { useWeatherStore } from "@/providers/weather";
import Details from "./Details";
import View from "./View";
import { useEffect, useRef } from "react";
import { getWeather } from "@/lib/api/weather";

export default function WeatherDisplay() {
    const weather = useWeatherStore((s) => s.weather);
    const setWeather = useWeatherStore((s) => s.setWeather);
    const setError = useWeatherStore((s) => s.setError);
    const setLoading = useWeatherStore((s) => s.setLoading);
    const requestedRef = useRef(false);

    useEffect(() => {
        if (requestedRef.current) return;
        requestedRef.current = true;

        if (!("geolocation" in navigator)) {
            setError("Геолокацію браузер не підтримує.");
            return;
        }

        setLoading(true);
        const controller = new AbortController();

        const fetchPosition = () => {
            console.log("Fetching position...");
            navigator.geolocation.getCurrentPosition(
                async (pos) => {
                    try {
                        const data = await getWeather(
                            pos.coords.latitude,
                            pos.coords.longitude,
                            { signal: controller.signal }
                        );
                        await new Promise((resolve) =>
                            setTimeout(resolve, 1000)
                        );
                        setWeather(data);
                    } catch (e: unknown) {
                        if (e instanceof Error) {
                            if (e?.name !== "AbortError") {
                                setError("Не вдалося завантажити погоду.");
                                return;
                            }
                        }
                    } finally {
                        setLoading(false);
                    }
                },
                (err) => {
                    setError(err.message || "Доступ до геолокації відхилено.");
                    setLoading(false);
                },
                {
                    enableHighAccuracy: false,
                    timeout: 10000,
                    maximumAge: 60_000,
                }
            );
        };

        fetchPosition();

        return () => {
            controller.abort();
        };
    }, [weather, setWeather, setError, setLoading]);

    return (
        <div className="bg-background container flex h-[70vh] overflow-hidden rounded-lg">
            <View />
            <div className="flex flex-1/3 flex-col">
                <div className="text-background flex flex-col items-center justify-center bg-black p-4">
                    <p className="font-semibold">Weather Next</p>
                    <p className="text-muted text-xs">by Artem Levchenko</p>
                </div>
                <Details />
            </div>
        </div>
    );
}
