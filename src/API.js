export const getWeatherInfo = async (value) => {
    try {
        const safeSearchQuery = encodeURIComponent(value);

        const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${safeSearchQuery}`);
        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            return { Process: "Location not found. Please try again." };
        }

        const lat = geoData.results[0].latitude;
        const lon = geoData.results[0].longitude;
        
        const locationTimezone = geoData.results[0].timezone || "auto";

        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=${locationTimezone}`;

        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        if (weatherData.error) {
             return { Process: "Weather data is currently unavailable for this region." };
        }

        const temperature = weatherData.current.temperature_2m;
        const feelsLike = weatherData.current.apparent_temperature;
        const humidity = weatherData.current.relative_humidity_2m;
        const windSpeed = weatherData.current.wind_speed_10m;
        const maxTemp = weatherData.daily.temperature_2m_max[0];
        const minTemp = weatherData.daily.temperature_2m_min[0];

        return { city: value, temperature: temperature, feelsLike: feelsLike, humidity: humidity, windSpeed: windSpeed, maxTemp: maxTemp, minTemp: minTemp, Process: "Done" };
    
    } catch (error) {
        console.error(error);
        return { Process: "An error occurred while fetching the weather." };
    }
}