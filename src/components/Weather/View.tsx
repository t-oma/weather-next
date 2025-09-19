import SettingsMenu from "./SettingsMenu";
import ViewInfo from "./ViewInfo";

export default function View() {
    return (
        <div className="bg-primary relative flex-2/3">
            <SettingsMenu />
            <ViewInfo />
        </div>
    );
}
