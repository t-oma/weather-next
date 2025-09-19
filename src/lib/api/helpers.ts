import { RequestInit } from "next/dist/server/web/spec-extension/request";

type HttpMethod =
    | "GET"
    | "POST"
    | "PUT"
    | "DELETE"
    | "PATCH"
    | "OPTIONS"
    | "HEAD";

export async function http<T>(
    url: string,
    method: HttpMethod = "GET",
    options?: Omit<RequestInit, "method">
): Promise<T> {
    const response = await fetch(url, {
        method,
        ...options,
    });

    if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
    }

    return (await response.json()) as T;
}

export async function hget<T>(url: string, options?: RequestInit): Promise<T> {
    return http<T>(url, "GET", options);
}

export async function hpost<T>(url: string, options?: RequestInit): Promise<T> {
    return http<T>(url, "POST", options);
}

export async function hput<T>(url: string, options?: RequestInit): Promise<T> {
    return http<T>(url, "PUT", options);
}

export async function hdelete<T>(
    url: string,
    options?: RequestInit
): Promise<T> {
    return http<T>(url, "DELETE", options);
}
