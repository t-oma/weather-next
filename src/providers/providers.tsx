"use client";

import { QueryProvider } from "./query";
import WeatherStoreProvider from "./weather";

export default function Providers({ children }: { children: React.ReactNode }) {
    // NOTE: Avoid useState when initializing the query client if you don't
    //       have a suspense boundary between this and the code that may
    //       suspend because React will throw away the client on the initial
    //       render if it suspends and there is no boundary

    return (
        <QueryProvider>
            <WeatherStoreProvider>{children}</WeatherStoreProvider>
        </QueryProvider>
    );
}
