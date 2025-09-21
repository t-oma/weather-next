export type CityPhotoApiAttribution = {
    displayName: string;
    uri: string;
    photoUri: string;
};

export type CityPhotoApiResponse = {
    photoUrl: string;
    attributions: CityPhotoApiAttribution[];
};
