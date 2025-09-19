import WeatherDisplay from "@/components/WeatherDisplay";

export default function Home() {
    return (
        <main className="flex flex-1 items-center justify-center p-4 md:p-8 lg:p-16">
            <WeatherDisplay />
        </main>
    );
}
