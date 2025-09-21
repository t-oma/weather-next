import { getCityPhoto } from "@/lib/api/city-photo";
import { normalizeCoords } from "@/lib/geo";
import { CityPhotoApiResponse } from "@/types/city-photo";
import { Coords } from "@/types/weather-api";
import { QueryKey, useQuery, UseQueryResult } from "@tanstack/react-query";

export function useCityPhotoQuery<TSelected = CityPhotoApiResponse>(
    coords: Coords | null,
    select?: (data: CityPhotoApiResponse) => TSelected
): UseQueryResult<TSelected> {
    const nc = coords ? normalizeCoords(coords, 5) : null;

    return useQuery<CityPhotoApiResponse, Error, TSelected, QueryKey>({
        queryKey: ["cityPhoto", `${nc?.lat},${nc?.lon}`],
        enabled: !!nc,
        staleTime: 5 * 60 * 1000,
        queryFn: async ({ signal }) => await getCityPhoto(nc!, { signal }),
        select,
    });
}
