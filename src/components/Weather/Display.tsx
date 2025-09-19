import Details from "./Details";
import View from "./View";

export default function WeatherDisplay() {
    return (
        <div className="bg-background container flex h-[70vh] overflow-hidden rounded-lg">
            <View />
            <Details />
        </div>
    );
}
