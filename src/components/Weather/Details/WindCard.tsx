import { Cloud, Thermometer, Wind } from "lucide-react";
import DetailsCard from "./Card";
import DetailsItem from "./Item";
import { WeatherApiCurrent } from "@/types/weather-api";
import { memo } from "react";

function WindCard({ windchill_c, cloud, wind_kph }: WeatherApiCurrent) {
    return (
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
                    {wind_kph} km/h
                </DetailsItem>
                <div className="flex items-center gap-8">
                    <DetailsItem
                        title="Windchill"
                        titled
                        icon={<Thermometer size={20} />}
                        iconBg="bg-purple-500/50"
                    >
                        {windchill_c} °C
                    </DetailsItem>
                    <DetailsItem
                        title="Clouds"
                        titled
                        icon={<Cloud size={20} />}
                        iconBg="bg-purple-500/50"
                    >
                        {cloud} %
                    </DetailsItem>
                </div>
            </div>
        </DetailsCard>
    );
}

export default memo(WindCard);
