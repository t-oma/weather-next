import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");
    if (!lat || !lon) {
        return NextResponse.json({ error: "Missing coords" }, { status: 400 });
    }

    const key = process.env.GOOGLE_MAPS_API_KEY;
    if (!key) {
        return NextResponse.json(
            { error: "Missing GOOGLE_MAPS_API_KEY" },
            {
                status: 500,
            }
        );
    }

    const nearby = await fetch(
        `https://places.googleapis.com/v1/places:searchNearby`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Goog-Api-Key": key,
                "X-Goog-FieldMask":
                    "places.id,places.displayName,places.photos,places.location",
            },
            body: JSON.stringify({
                includedTypes: [
                    "tourist_attraction",
                    "historical_place",
                    "monument",
                    "art_gallery",
                    "library",
                    "city_hall",
                    "apartment_building",
                    "apartment_complex",
                    "camping_cabin",
                ],
                maxResultCount: 5,
                locationRestriction: {
                    circle: {
                        center: {
                            latitude: Number(lat),
                            longitude: Number(lon),
                        },
                        radius: 1000,
                    },
                },
            }),
            // dont cache here, cache the final response
        }
    );

    if (!nearby.ok) {
        return NextResponse.json(
            { error: "Nearby search failed", message: nearby.statusText },
            { status: 500 }
        );
    }

    const data = await nearby.json();
    const place = data.places?.[0];
    const photoName = place?.photos?.[0]?.name;
    const attributions = place?.photos?.[0]?.authorAttributions ?? [];

    if (!photoName) {
        return NextResponse.json({ error: "No photo" }, { status: 404 });
    }

    // 2) Place Photos (New): get media URL from endpoint
    // NOTE: This endpoint returns a photo/redirect; you can use proxies or direct URLs
    const photoUrl = `https://places.googleapis.com/v1/${photoName}/media?maxWidthPx=1600&key=${key}`;

    const res = NextResponse.json({ photoUrl, attributions });
    res.headers.set(
        "Cache-Control",
        "public, s-maxage=300, stale-while-revalidate=300"
    );
    return res;
}
