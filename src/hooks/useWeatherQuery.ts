import { QueryKey, useQuery, UseQueryResult } from "@tanstack/react-query";
import { getWeather } from "@/lib/api/weather";
import { WeatherApiResponse } from "@/types/weather-api";
import { normalizeCoords } from "@/lib/geo";

type Coords = { lat: number; lon: number };

export function useWeatherQuery<TSelected = WeatherApiResponse>(
    coords: Coords | null,
    select?: (data: WeatherApiResponse) => TSelected
): UseQueryResult<TSelected> {
    const nc = coords ? normalizeCoords(coords, 5) : null;

    return useQuery<WeatherApiResponse, Error, TSelected, QueryKey>({
        queryKey: ["weather", `${nc?.lat},${nc?.lon}`],
        queryFn: async ({ signal }) => await getWeather(nc!, { signal }),
        enabled: !!nc,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: true,
        select,
    });
}
