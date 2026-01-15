import axios from "axios";
import { useState } from "react";
import SearchBox from "./components/SearchBox";
import WeatherCard from "./components/WeatherCard";
import ForecastList from "./components/ForecastList";
import ForecasterImg from "./assets/forecaster.png"; 

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 

  const apiKey = "your api here";

  const fetchWeather = async (city) => {
    if (!city) return;

    setLoading(true);
    setWeather(null);
    setForecast([]);
    setError(""); // reset error before search

    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      );

      const data = res.data;
      const today = data.list[0];

      // Set current weather
      setWeather({
        city: data.city.name,
        temp: Math.round(today.main.temp),
        desc: today.weather[0].description,
        humidity: today.main.humidity,
        wind: today.wind.speed,
      });

      // Filter forecast for next 5 days (one per day at 12:00)
      const daily = data.list
        .filter((item) => item.dt_txt.includes("12:00:00"))
        .map((day) => ({
          date: new Date(day.dt_txt).toLocaleDateString("en-US", { weekday: "short" }),
          temp: Math.round(day.main.temp),
          desc: day.weather[0].description,
          icon: day.weather[0].icon,
        }));

      setForecast(daily);
    } catch (error) {
      setError("City not found!"); // <-- show message instead of alert
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#eee] flex flex-col items-center px-5">
      {/* Header with title and search */}
      <div className="flex w-full items-center justify-between mt-10">
        <h1 className="text-blue-500 text-2xl font-bold">🌦️ Weather Forecast</h1>
        <SearchBox onSearch={fetchWeather} error={error} />
      </div>

      {/* Welcome message (shown only before search) */}
      {!weather && !loading && (
        <div className="flex flex-col items-center justify-center flex-1 w-full mt-20">
          <img
            src={ForecasterImg}
            alt="Weather Forecaster"
            className="w-32 mb-6"
          />
          <h2 className="text-3xl font-bold text-gray-700 text-center">
            Welcome to Your Weather 
          </h2>
          <p className="text-gray-500 mt-4 text-center">
            Search for any city to get current weather and forecast.
          </p>
        </div>
      )}

      {/* Loading message */}
      {loading && (
        <p className="text-black mt-6">Loading...</p>
      )}

      {/* Weather results */}
      {weather && !loading && (
        <>
          <WeatherCard weather={weather} />
          <ForecastList forecast={forecast} />
        </>
      )}
    </div>
  );
}

export default App;
