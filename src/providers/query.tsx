"use client";

import {
    isServer,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                // With SSR, we usually want to set some default staleTime
                // above 0 to avoid refetching immediately on the client
                refetchOnWindowFocus: true,
                staleTime: 5 * 60 * 1000,
                gcTime: 10 * 60 * 1000,
            },
        },
    });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
    if (isServer) {
        // Server: always make a new query client
        return makeQueryClient();
    } else {
        // Browser: make a new query client if we don't already have one
        // This is very important, so we don't re-make a new client if React
        // suspends during the initial render. This may not be needed if we
        // have a suspense boundary BELOW the creation of the query client
        if (!browserQueryClient) browserQueryClient = makeQueryClient();
        return browserQueryClient;
    }
}

const persister =
    typeof window !== "undefined"
        ? createAsyncStoragePersister({ storage: window.localStorage })
        : undefined;

export function QueryProvider({ children }: { children: React.ReactNode }) {
    const queryClient = getQueryClient();

    if (!persister) {
        return (
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        );
    }

    return (
        <PersistQueryClientProvider
            client={queryClient}
            persistOptions={{
                persister,
                maxAge: 5 * 60 * 1000,
                // dehydrateOptions: {
                //   shouldDehydrateQuery: (q) => Array.isArray(q.queryKey) && q.queryKey[0] === "weather",
                // },
            }}
            onSuccess={() => {
                console.log("success");
            }}
        >
            {children}
        </PersistQueryClientProvider>
    );
}
