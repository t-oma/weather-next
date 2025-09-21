import { ClassNameValue } from "tailwind-merge";
import DetailsIconWrapper from "./IconWrapper";
import { cn } from "@/lib/utils";

export default function DetailsItem({
    title,
    icon,
    iconBg,
    titled = false,
    orientation = "horizontal",
    children,
}: Readonly<{
    title: string;
    icon: React.ReactNode;
    iconBg: ClassNameValue;
    titled?: boolean;
    orientation?: "horizontal" | "vertical";
    children: React.ReactNode;
}>) {
    return (
        <section
            aria-label={!titled ? title : undefined}
            className={cn(
                "flex gap-2",
                orientation === "vertical" && "flex-col items-start",
                orientation === "horizontal" && "flex-row items-center"
            )}
        >
            <DetailsIconWrapper className={iconBg}>{icon}</DetailsIconWrapper>
            {titled ? (
                <div className="flex flex-col">
                    <h4 className="text-xs">{title}</h4>
                    <span className="text-sm font-bold">{children}</span>
                </div>
            ) : (
                <span className="text-lg font-bold">{children}</span>
            )}
        </section>
    );
}
