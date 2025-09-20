import { WeatherApiResponse } from "@/types/weather-api";
import { createStore } from "zustand";

export type WeatherState = {
    weather: WeatherApiResponse | null;
    loading: boolean;
    error: string | null;
};

export type WeatherActions = {
    setWeather: (weather: WeatherApiResponse) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    reset: () => void;
};

export type WeatherStore = WeatherState & WeatherActions;

const defaultInitState: WeatherState = {
    weather: null,
    loading: false,
    error: null,
};

export const createWeatherStore = (
    initState: WeatherState = defaultInitState
) => {
    return createStore<WeatherStore>()((set, get) => ({
        ...initState,
        setWeather: (weather) =>
            set({
                weather,
            }),
        setLoading: (loading) =>
            set({
                loading,
            }),
        setError: (error) =>
            set({
                error,
            }),
        reset: () =>
            set({
                weather: null,
                loading: false,
                error: null,
            }),
    }));
};
