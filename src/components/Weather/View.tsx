import SettingsMenu from "./SettingsMenu";
import ViewImage from "./ViewImage";
import ViewInfo from "./ViewInfo";

export default function View() {
    return (
        <div className="relative flex-2/3">
            <SettingsMenu />
            <ViewImage />
            <ViewInfo />
        </div>
    );
}
