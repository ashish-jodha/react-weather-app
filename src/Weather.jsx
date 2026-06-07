import { useEffect, useState } from "react";
import { getWeatherInfo } from "./API"

export default function Weather() {
    const containerStyle = "min-h-screen bg-linear-to-br from-blue-100 to-blue-300 flex items-center justify-center p-4 sm:p-8 font-sans";
    const cardStyle = "bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 w-full max-w-md transition-all duration-300";
    const titleStyle = "text-2xl sm:text-3xl font-extrabold text-gray-800 text-center mb-6";
    const formContainerStyle = "mb-6 sm:mb-8 flex flex-col gap-2";
    const inputWrapperStyle = "flex flex-col sm:flex-row gap-2 sm:gap-3 relative";
    const baseInputStyle = "flex-1 px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 transition-all w-full";
    const inputErrorStyle = "border-red-500 focus:ring-red-400";
    const inputNormalStyle = "border-gray-200 focus:ring-blue-400";
    const buttonStyle = "w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 shadow-md hover:shadow-lg transition-all active:scale-95";
    const errorTextStyle = "text-red-500 text-sm mt-1 ml-1 sm:ml-2 font-medium";
    const loadingStyle = "text-center text-gray-500 text-lg font-medium animate-pulse py-8";
    const resultContainerStyle = "flex flex-col items-center";
    const cityStyle = "text-3xl sm:text-4xl font-extrabold text-gray-800 capitalize tracking-wide text-center";
    const tempStyle = "text-5xl sm:text-6xl font-black text-blue-600 my-3 sm:my-4";
    const feelsLikeStyle = "text-sm sm:text-base text-gray-500 mb-6 font-medium";
    const gridStyle = "grid grid-cols-2 gap-3 sm:gap-4 w-full";
    const gridItemStyle = "bg-blue-50 p-3 sm:p-4 rounded-2xl flex flex-col items-center transition-all hover:-translate-y-1 hover:shadow-md border border-transparent hover:border-blue-100";
    const gridLabelStyle = "text-xs sm:text-sm text-gray-500 font-semibold mb-1 uppercase tracking-wider";
    const gridValueStyle = "text-lg sm:text-xl font-bold text-gray-800";

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
    }, []);

    return (
        <div className={containerStyle}>
            <div className={cardStyle}>
                <h2 className={titleStyle}>Weather</h2>

                <form onSubmit={e => e.preventDefault()} className={formContainerStyle} noValidate>
                    <div className={inputWrapperStyle}>
                        <input
                            type="text"
                            value={value}
                            onChange={handleChange}
                            placeholder="Enter a city, state, or country..."
                            className={`${baseInputStyle} ${error ? inputErrorStyle : inputNormalStyle}`}
                        />
                        <button
                            onClick={handleClick}
                            className={buttonStyle}
                        >
                            Search
                        </button>
                    </div>

                    {error && (
                        <p className={errorTextStyle}>
                            {error}
                        </p>
                    )}
                </form>

                {temp.Process !== "Done" ? (
                    <div className={loadingStyle}>
                        {temp.Process}
                    </div>
                ) : (
                    <div className={resultContainerStyle}>
                        <h3 className={cityStyle}>
                            {temp.city}
                        </h3>
                        <div className={tempStyle}>
                            {temp.temperature}°C
                        </div>
                        <p className={feelsLikeStyle}>
                            Feels like {temp.feelsLike}°C
                        </p>

                        <div className={gridStyle}>
                            <div className={gridItemStyle}>
                                <span className={gridLabelStyle}>Humidity</span>
                                <span className={gridValueStyle}>{temp.humidity}%</span>
                            </div>
                            <div className={gridItemStyle}>
                                <span className={gridLabelStyle}>Wind</span>
                                <span className={gridValueStyle}>{temp.windSpeed} km/h</span>
                            </div>
                            <div className={gridItemStyle}>
                                <span className={gridLabelStyle}>High</span>
                                <span className={gridValueStyle}>{temp.maxTemp}°C</span>
                            </div>
                            <div className={gridItemStyle}>
                                <span className={gridLabelStyle}>Low</span>
                                <span className={gridValueStyle}>{temp.minTemp}°C</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}