import { WeatherApiCurrent } from "@/types/weather-api";
import { memo } from "react";

function DetailsTemperature({
    temp,
    feelslike,
}: {
    temp: WeatherApiCurrent["temp_c"];
    feelslike: WeatherApiCurrent["feelslike_c"];
}) {
    return (
        <section className="flex items-center justify-evenly py-2">
            <h3 className="sr-only">Temperature</h3>
            <section className="flex flex-col">
                <h4 className="text-muted-foreground text-xs">Now</h4>
                <span className="text-lg font-bold">{temp} °C</span>
            </section>
            <section className="flex flex-col">
                <h4 className="text-muted-foreground text-xs">Feels Like</h4>
                <span className="text-lg font-bold">{feelslike} °C</span>
            </section>
        </section>
    );
}

export default memo(DetailsTemperature);
