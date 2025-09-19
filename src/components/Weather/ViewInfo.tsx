import { Separator } from "@/components/ui/separator";

export default function ViewInfo() {
    return (
        <div className="absolute right-6 bottom-6 left-6">
            <div className="flex flex-col text-white">
                <span className="text-xl font-medium">Clear</span>
                <span className="text-6xl font-bold">21.4 °C</span>
            </div>
            <Separator className="my-2" />
            <div className="flex items-center justify-between gap-2 text-white">
                <span className="text-sm">Kyiv, Ukraine</span>
                <span className="text-xs">2025-09-19 15:15</span>
            </div>
        </div>
    );
}
