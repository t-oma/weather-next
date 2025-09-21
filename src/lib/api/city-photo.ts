import { CityPhotoApiResponse } from "@/types/city-photo";
import { Coords } from "@/types/weather-api";

export async function getCityPhoto(coords: Coords, options?: RequestInit) {
    const u = new URL("/api/city-photo", window.location.origin);
    u.searchParams.set("lat", String(coords.lat));
    u.searchParams.set("lon", String(coords.lon));

    const r = await fetch(u.toString(), options);
    if (!r.ok) {
        console.error(await r.json());
        throw new Error(`city-photo failed: ${r.statusText}`);
    }

    return r.json() as Promise<CityPhotoApiResponse>;
}
