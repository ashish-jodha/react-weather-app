import { useEffect, useState } from "react";
import { getWeatherInfo } from "./API"

export default function Weather() {
    const [temp, setTemp] = useState({ Process: "Loading the temperature...." });
    const [value, setValue] = useState("");
    const [error, setError] = useState(""); 

    let handleClick = async () => {
        if (value.trim() === "") {
            setError("Please enter a city name.");
            return; 
        }

        setTemp({ Process: "Searching..." });
        const weatherInfo = await getWeatherInfo(value);
        setTemp(weatherInfo);
    }

    function handleChange(event) {
        setValue(event.target.value);
        setError("");
    }

    useEffect(() => {
        let getFirstInfo = async () => {
            const weatherInfo = await getWeatherInfo("Jaipur");
            setTemp(weatherInfo);
        }

        getFirstInfo();
    }, [])

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-100 to-blue-300 flex items-center justify-center p-4 font-sans">
            <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Weather</h2>

                <form onSubmit={e => e.preventDefault()} className="mb-8" noValidate>
                    <div className="flex gap-2 relative">
                        <input
                            type="text"
                            value={value}
                            onChange={handleChange}
                            placeholder="Enter a city, state, or country..."
                            className={`flex-1 px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                                error ? "border-red-500 focus:ring-red-400" : "border-gray-200 focus:ring-blue-400"
                            }`}
                        />
                        <button
                            onClick={handleClick}
                            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 shadow-md hover:shadow-lg transition-all"
                        >
                            Search
                        </button>
                    </div>
                    
                    {error && (
                        <p className="text-red-500 text-sm mt-2 ml-2 font-medium">
                            {error}
                        </p>
                    )}
                </form>

                {temp.Process !== "Done" ? (
                    <div className="text-center text-gray-500 animate-pulse py-8">
                        {temp.Process}
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <h3 className="text-4xl font-extrabold text-gray-800 capitalize tracking-wide">
                            {temp.city}
                        </h3>
                        <div className="text-6xl font-black text-blue-600 my-4">
                            {temp.temperature}°C
                        </div>
                        <p className="text-gray-500 mb-6 font-medium">
                            Feels like {temp.feelsLike}°C
                        </p>

                        <div className="grid grid-cols-2 gap-4 w-full">
                            <div className="bg-blue-50 p-4 rounded-2xl flex flex-col items-center">
                                <span className="text-sm text-gray-500 font-semibold mb-1">Humidity</span>
                                <span className="text-xl font-bold text-gray-800">{temp.humidity}%</span>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-2xl flex flex-col items-center">
                                <span className="text-sm text-gray-500 font-semibold mb-1">Wind</span>
                                <span className="text-xl font-bold text-gray-800">{temp.windSpeed} km/h</span>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-2xl flex flex-col items-center">
                                <span className="text-sm text-gray-500 font-semibold mb-1">High</span>
                                <span className="text-xl font-bold text-gray-800">{temp.maxTemp}°C</span>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-2xl flex flex-col items-center">
                                <span className="text-sm text-gray-500 font-semibold mb-1">Low</span>
                                <span className="text-xl font-bold text-gray-800">{temp.minTemp}°C</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}