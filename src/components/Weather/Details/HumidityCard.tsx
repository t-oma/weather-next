import { Droplet, Umbrella } from "lucide-react";
import DetailsCard from "./Card";
import DetailsItem from "./Item";
import { DayDay, WeatherApiCurrent } from "@/types/weather-api";
import { memo } from "react";

function HumidityCard({
    precip_mm,
    humidity,
    daily_chance_of_rain,
}: Readonly<WeatherApiCurrent & DayDay>) {
    return (
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
                    {precip_mm} mm
                </DetailsItem>
                <div className="flex items-center gap-8">
                    <DetailsItem
                        title="Humidity"
                        titled
                        icon={<Droplet size={20} />}
                        iconBg="bg-primary-500/50"
                    >
                        {humidity} %
                    </DetailsItem>
                    <DetailsItem
                        title="Rain Chance"
                        titled
                        icon={<Umbrella size={20} />}
                        iconBg="bg-primary-500/50"
                    >
                        {daily_chance_of_rain} %
                    </DetailsItem>
                </div>
            </div>
        </DetailsCard>
    );
}

export default memo(HumidityCard);
