"use client";
import { useEffect, useState, useRef } from "react";

type Coords = { lat: number; lon: number };

export function useGeolocation() {
    const [coords, setCoords] = useState<Coords | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const requestedRef = useRef(false);

    useEffect(() => {
        if (requestedRef.current) return;
        requestedRef.current = true;

        if (!("geolocation" in navigator)) {
            setError("Геолокацію браузер не підтримує.");
            setLoading(false);
            return;
        }

        const options: PositionOptions = {
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 60_000,
        };

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setCoords({
                    lat: pos.coords.latitude,
                    lon: pos.coords.longitude,
                });
                setLoading(false);
            },
            (err) => {
                setError(err.message || "Доступ до геолокації відхилено.");
                setLoading(false);
            },
            options
        );
    }, []);

    return { coords, error, loading };
}
