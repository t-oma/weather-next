import { QueryKey, useQuery, UseQueryResult } from "@tanstack/react-query";
import { getWeather } from "@/lib/api/weather";
import { WeatherApiResponse } from "@/types/weather-api";

type Coords = { lat: number; lon: number };

export function useWeatherQuery<TSelected = WeatherApiResponse>(
    coords: Coords | null,
    select?: (data: WeatherApiResponse) => TSelected
): UseQueryResult<TSelected> {
    return useQuery<WeatherApiResponse, Error, TSelected, QueryKey>({
        queryKey: ["weather", `${coords?.lat},${coords?.lon}`],
        queryFn: ({ signal }) =>
            getWeather(coords!.lat, coords!.lon, { signal }),
        enabled: !!coords,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: true,
        select,
    });
}
