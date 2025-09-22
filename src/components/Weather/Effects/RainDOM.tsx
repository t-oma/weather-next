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

export default function RainDOM({
    intensity,
    showBackRow = true,
    showSplat = true,
}: Props) {
    const dropsCountByIntensity =
        intensity === "heavy" ? 100 : intensity === "moderate" ? 40 : 5;

    const drops = useMemo(() => {
        const front: Array<{ left: number; delay: number; dur: number }> = [];
        const back: Array<{ left: number; delay: number; dur: number }> = [];

        for (let i = 0; i < dropsCountByIntensity; i++) {
            const binStart = i / dropsCountByIntensity;
            const binEnd = (i + 1) / dropsCountByIntensity;
            const jitter = Math.random() * (binEnd - binStart); // ~U[0, 1/count)
            const left = clamp01(binStart + jitter) * 100; // %
            const delay = Math.random() * 0.9; // 0..0.9s
            const dur = 0.5 + Math.random() * 1.0; // 0.5..1.5s

            front.push({ left, delay, dur });
            back.push({ left: 100 - left, delay, dur });
        }

        for (let i = front.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [front[i], front[j]] = [front[j], front[i]];
            [back[i], back[j]] = [back[j], back[i]];
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
