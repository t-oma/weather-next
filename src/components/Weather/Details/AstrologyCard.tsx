import { Moon, Sunrise, Sunset } from "lucide-react";
import DetailsCard from "./Card";
import DetailsItem from "./Item";
import { DayAstro } from "@/types/weather-api";
import { memo } from "react";

function AstrologyCard({ sunrise, sunset, moon_phase }: DayAstro) {
    return (
        <DetailsCard
            title="Astrology"
            className="to-secondary from-green-500"
        >
            <div className="flex flex-1 flex-col justify-center gap-4">
                <div className="flex items-center gap-12">
                    <DetailsItem
                        title="Sunrise"
                        titled
                        orientation="vertical"
                        icon={<Sunrise size={20} />}
                        iconBg="bg-green-500/50"
                    >
                        {sunrise}
                    </DetailsItem>
                    <DetailsItem
                        title="Sunset"
                        titled
                        orientation="vertical"
                        icon={<Sunset size={20} />}
                        iconBg="bg-green-500/50"
                    >
                        {sunset}
                    </DetailsItem>
                </div>
                <DetailsItem
                    title="Moon Phase"
                    titled
                    icon={<Moon size={20} />}
                    iconBg="bg-green-500/50"
                >
                    {moon_phase}
                </DetailsItem>
            </div>
        </DetailsCard>
    );
}

export default memo(AstrologyCard);
