"use client";

import Details from "./Details";
import View from "./View";

export default function WeatherDisplay() {
    return (
        <div className="container flex h-[70vh] overflow-hidden rounded-lg">
            <View />
            <div className="bg-background flex flex-1/3 flex-col">
                <div className="text-background flex flex-col items-center justify-center bg-black p-4">
                    <p className="font-semibold">Weather Next</p>
                    <p className="text-muted text-xs">by Artem Levchenko</p>
                </div>
                <Details />
            </div>
        </div>
    );
}
