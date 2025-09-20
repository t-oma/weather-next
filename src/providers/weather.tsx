"use client";

import { createWeatherStore, WeatherStore } from "@/stores/weather";
import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

export type WeatherStoreApi = ReturnType<typeof createWeatherStore>;

export const WeatherStoreContext = createContext<WeatherStoreApi | undefined>(
    undefined
);

export default function WeatherStoreProvider({
    children,
}: Readonly<{ children: ReactNode }>) {
    const storeRef = useRef<WeatherStoreApi | null>(null);
    if (storeRef.current === null) {
        storeRef.current = createWeatherStore();
    }

    return (
        <WeatherStoreContext.Provider value={storeRef.current}>
            {children}
        </WeatherStoreContext.Provider>
    );
}

export function useWeatherStore<T>(selector: (store: WeatherStore) => T) {
    const userStore = useContext(WeatherStoreContext);
    if (!userStore) {
        throw new Error(
            "useWeatherStore must be used within a WeatherStoreProvider"
        );
    }

    return useStore(userStore, selector);
}
