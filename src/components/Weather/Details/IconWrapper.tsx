import { cn } from "@/lib/utils";
import { ClassNameValue } from "tailwind-merge";

export default function DetailsIconWrapper({
    children,
    className,
}: Readonly<{
    children: React.ReactNode;
    className: ClassNameValue;
}>) {
    return <div className={cn("rounded-sm p-2", className)}>{children}</div>;
}
