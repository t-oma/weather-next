import { testData } from "@/types/weather-api";
import { Separator } from "../ui/separator";
import { Cloud, Droplet, Eye, Thermometer, Umbrella, Wind } from "lucide-react";
import DetailsCard from "./DetailsCard";
import DetailsTemperature from "./DetailsTemperature";
import DetailsItem from "./DetailsItem";

export default function Details() {
    const weather = testData;

    return (
        <div className="flex flex-1/3 flex-col">
            <div className="text-background flex flex-col items-center justify-center bg-black p-4">
                <p className="font-semibold">Weather Next</p>
                <p className="text-muted text-xs">by Artem Levchenko</p>
            </div>
            <section className="flex flex-1 flex-col px-4">
                <h2 className="sr-only">Weather details</h2>

                <DetailsTemperature
                    temp={weather.current.temp_c}
                    feelslike={weather.current.feelslike_c}
                />

                <Separator className="" />

                <div className="flex flex-1 flex-col gap-4 py-4">
                    <DetailsCard
                        title="Wind"
                        className="to-secondary from-purple-400"
                    >
                        <div className="flex flex-1 flex-col justify-center gap-4">
                            <DetailsItem
                                title="Wind"
                                icon={<Wind size={24} />}
                                iconBg="bg-purple-500/50"
                            >
                                {weather.current.wind_kph} km/h
                            </DetailsItem>
                            <div className="flex items-center gap-8">
                                <DetailsItem
                                    title="Windchill"
                                    titled
                                    icon={<Thermometer size={20} />}
                                    iconBg="bg-purple-500/50"
                                >
                                    {weather.current.windchill_c} °C
                                </DetailsItem>
                                <DetailsItem
                                    title="Clouds"
                                    titled
                                    icon={<Cloud size={20} />}
                                    iconBg="bg-purple-500/50"
                                >
                                    {weather.current.cloud} %
                                </DetailsItem>
                            </div>
                        </div>
                    </DetailsCard>
                    <DetailsCard
                        title="Humidity"
                        className="from-primary to-secondary"
                    >
                        <div className="flex flex-1 flex-col justify-center gap-4">
                            <DetailsItem
                                title="Precipitation"
                                icon={<Droplet size={24} />}
                                iconBg="bg-primary-500/50"
                            >
                                {weather.current.precip_mm} mm
                            </DetailsItem>
                            <div className="flex items-center gap-8">
                                <DetailsItem
                                    title="Humidity"
                                    titled
                                    icon={<Droplet size={20} />}
                                    iconBg="bg-primary-500/50"
                                >
                                    {weather.current.humidity} %
                                </DetailsItem>
                                <DetailsItem
                                    title="Rain Chance"
                                    titled
                                    icon={<Umbrella size={20} />}
                                    iconBg="bg-primary-500/50"
                                >
                                    {
                                        weather.forecast.forecastday[0].day
                                            .daily_chance_of_rain
                                    }{" "}
                                    %
                                </DetailsItem>
                            </div>
                        </div>
                    </DetailsCard>
                </div>
            </section>
        </div>
    );
}
