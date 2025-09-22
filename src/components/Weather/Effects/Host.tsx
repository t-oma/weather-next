"use client";

import { useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";
import { Intensity, WeatherCategory } from "@/lib/weather-classify";

const Rain = dynamic(() => import("./RainDOM"), {
    ssr: false,
});

export default function EffectsHost({
    category,
    intensity,
}: {
    category: WeatherCategory;
    intensity: Intensity;
}) {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const el = document.createElement("div");
        el.id = "weather-effects";
        el.style.position = "fixed";
        el.style.inset = "0";
        el.style.pointerEvents = "none";
        el.style.zIndex = "0";
        document.body.appendChild(el);
        containerRef.current = el;

        return () => {
            document.body.removeChild(el);
            containerRef.current = null;
        };
    }, []);

    const effect = useMemo(() => {
        if (category === "rain" || category === "thunder_rain") {
            return (
                <Rain
                    intensity={intensity}
                    showBackRow={true}
                    showSplat={false}
                />
            );
        }
        return null;
    }, [category, intensity]);

    if (!containerRef.current) return null;

    return createPortal(effect, containerRef.current);
}
