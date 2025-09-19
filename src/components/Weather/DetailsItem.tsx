import { ClassNameValue } from "tailwind-merge";
import DetailsIconWrapper from "./DetailsIconWrapper";

export default function DetailsItem({
    title,
    icon,
    iconBg,
    titled = false,
    children,
}: Readonly<{
    title: string;
    icon: React.ReactNode;
    iconBg: ClassNameValue;
    titled?: boolean;
    children: React.ReactNode;
}>) {
    return (
        <section
            aria-label={!titled ? title : undefined}
            className="flex items-center gap-2"
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
