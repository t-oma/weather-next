export const round = (v: number, digits = 3) =>
    Math.round(v * 10 ** digits) / 10 ** digits;

export const normalizeCoords = (
    c: { lat: number; lon: number },
    digits = 3
) => ({
    lat: round(c.lat, digits),
    lon: round(c.lon, digits),
});
