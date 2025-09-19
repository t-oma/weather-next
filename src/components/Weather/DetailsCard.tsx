import { cn } from "@/lib/utils";
import { ClassNameValue } from "tailwind-merge";

export default function DetailsCard({
    title,
    className,
    children,
}: Readonly<{
    title: string;
    className: ClassNameValue;
    children: React.ReactNode;
}>) {
    return (
        <section
            className={cn(
                "text-background flex flex-1 flex-col gap-2 rounded-md bg-gradient-to-tr p-3",
                className
            )}
        >
            <h3 className="text-lg font-bold">{title}</h3>
            {children}
        </section>
    );
}
