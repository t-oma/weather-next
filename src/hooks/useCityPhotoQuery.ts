import { getCityPhoto } from "@/lib/api/city-photo";
import { CityPhotoApiResponse } from "@/types/city-photo";
import { Coords } from "@/types/weather-api";
import { QueryKey, useQuery, UseQueryResult } from "@tanstack/react-query";

export function useCityPhotoQuery<TSelected = CityPhotoApiResponse>(
    coords: Coords | null,
    select?: (data: CityPhotoApiResponse) => TSelected
): UseQueryResult<TSelected> {
    return useQuery<CityPhotoApiResponse, Error, TSelected, QueryKey>({
        queryKey: ["cityPhoto", `${coords?.lat},${coords?.lon}`],
        enabled: !!coords,
        staleTime: 5 * 60 * 1000,
        queryFn: async ({ signal }) => await getCityPhoto(coords!, { signal }),
        select,
    });
}
