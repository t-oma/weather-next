"use client";

import { Intensity } from "@/lib/weather-classify";
import { useMemo } from "react";

function clamp01(x: number) {
    return Math.min(1, Math.max(0, x));
}

type Props = {
    intensity: Intensity;
    showBackRow?: boolean;
    showSplat?: boolean;
};

export function RainDOM({
    intensity,
    showBackRow = true,
    showSplat = true,
}: Props) {
    const dropsCountByIntensity =
        intensity === "heavy" ? 120 : intensity === "moderate" ? 80 : 20;

    const drops = useMemo(() => {
        const front: Array<{ left: number; delay: number; dur: number }> = [];
        const back: Array<{ left: number; delay: number; dur: number }> = [];

        let x = 0;
        while (x < 100) {
            const step = 2 + Math.floor(Math.random() * 4); // 2..5%
            x += step;

            const r = Math.floor(1 + Math.random() * 98); // delay 0.001..0.098s
            const d = 0.5 + r / 100; // 0.51..1.48s
            front.push({ left: x, delay: r / 100, dur: d });
            back.push({ left: 100 - x, delay: r / 100, dur: d });
            if (front.length >= dropsCountByIntensity) break;
        }
        return { front, back };
    }, [dropsCountByIntensity]);

    return (
        <>
            <div className="rain front-row pointer-events-none">
                {drops.front.map((it, i) => (
                    <div
                        key={`f-${i}`}
                        className="drop"
                        style={{
                            left: `${it.left}%`,
                            animationDelay: `${it.delay}s`,
                            animationDuration: `${it.dur}s`,
                        }}
                    >
                        <div
                            className="stem"
                            style={{
                                animationDelay: `${it.delay}s`,
                                animationDuration: `${it.dur}s`,
                            }}
                        />
                        {showSplat && (
                            <div
                                className="splat"
                                style={{
                                    animationDelay: `${it.delay}s`,
                                    animationDuration: `${it.dur}s`,
                                }}
                            />
                        )}
                    </div>
                ))}
            </div>
            {showBackRow && (
                <div className="rain back-row pointer-events-none">
                    {drops.back.map((it, i) => (
                        <div
                            key={`b-${i}`}
                            className="drop"
                            style={{
                                right: `${it.left}%`,
                                animationDelay: `${it.delay}s`,
                                animationDuration: `${it.dur}s`,
                            }}
                        >
                            <div
                                className="stem"
                                style={{
                                    animationDelay: `${it.delay}s`,
                                    animationDuration: `${it.dur}s`,
                                }}
                            />
                            {showSplat && (
                                <div
                                    className="splat"
                                    style={{
                                        animationDelay: `${it.delay}s`,
                                        animationDuration: `${it.dur}s`,
                                    }}
                                />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
