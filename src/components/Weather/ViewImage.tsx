"use client";

import { useCityPhotoQuery } from "@/hooks/useCityPhotoQuery";
import { useGeolocation } from "@/hooks/useGeolocation";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";

export default function ViewImage() {
    const { coords, error: geoError, loading: geoLoading } = useGeolocation();
    const {
        data: cityPhoto,
        error: fetchError,
        isFetching,
    } = useCityPhotoQuery(coords);

    if (geoError) {
        return (
            <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-sm text-red-400">{geoError}</p>
            </div>
        );
    }
    if (fetchError) {
        return (
            <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-sm text-red-400">{fetchError.message}</p>
            </div>
        );
    }

    if (!cityPhoto || isFetching) {
        return (
            <div className="absolute inset-0">
                <Skeleton className="bg-primary h-full w-full" />
            </div>
        );
    }

    return (
        <div className="relative h-full w-full">
            <Image
                src={cityPhoto.photoUrl}
                alt="City backdrop"
                className="object-cover"
                sizes="(max-width: 768px) 80vw, 1920px"
                fill
                priority
            />
            {cityPhoto.attributions.length ? (
                <div className="absolute top-2 left-2 rounded bg-black/50 p-1 text-xs text-white">
                    Photo: Google Places
                </div>
            ) : null}
        </div>
    );
}
