"use client";

export default function WeatherDisplay() {
    return (
        <div className="bg-background container flex h-[50vh] overflow-hidden rounded-lg">
            <div className="bg-primary flex-2/3"></div>
            <div className="flex flex-1/3 flex-col">
                <div className="text-background flex flex-col items-center justify-center bg-black p-4">
                    <h1 className="font-semibold">Weather Next</h1>
                    <p className="text-muted text-sm">
                        Made by Artem Levchenko
                    </p>
                </div>
                <div className="flex-1"></div>
            </div>
        </div>
    );
}
