import { useState, useEffect } from "react";
import SunWithClouds from "../assets/sun-with-cloud.png";
import Winter from "../assets/winter.png";
import Rain from "../assets/rain.png";
import Summer from "../assets/summer.png";
import humidity from "../assets/humidity.png";
import wind from "../assets/wind.png";

const WeatherCard = ({ weather }) => {
  const [date] = useState(new Date());
  const [weatherImage, setWeatherImage] = useState(SunWithClouds);

  useEffect(() => {
    if (!weather) return;

    const desc = weather.desc.toLowerCase();

    if (desc.includes("rain")) {
      setWeatherImage(Rain);
    } else if (desc.includes("snow")) {
      setWeatherImage(Winter);
    } else if (desc.includes("clear")) {
      setWeatherImage(Summer);
    } else if (desc.includes("cloud")) {
      setWeatherImage(SunWithClouds);
    } else {
      setWeatherImage(SunWithClouds); // default fallback
    }
  }, [weather]);

  if (!weather) return null;

  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="text-center p-6 mt-6 text-black">
      <h2 className="text-2xl capitalize">{weather.city}</h2>
      <h2 className="text-md mt-1 uppercase">
        {date.toLocaleDateString("en-US", {
          weekday: "long",
        })}{" "}
        {formattedTime}
      </h2>

      <div className="flex justify-center pt-7">
        <img src={weatherImage} alt={weather.desc} className="w-28" />
      </div>

      <h1 className="text-4xl font-medium mt-10">{weather.temp}°C</h1>
      <p className="text-md pt-2 italic capitalize">{weather.desc}</p>

      <div className="flex gap-5 items-center mt-10 justify-center">
        <div className="border border-blue-300 p-3 flex items-center justify-center gap-4 rounded-xl shadow-md">
          <div className="w-10">
            <img src={humidity} className="w-full" alt="Humidity" />
          </div>
          <div>
            <p className="font-medium">Humidity</p>
            <p className="font-bold text-blue-500 text-lg">
              {weather.humidity}%
            </p>
          </div>
        </div>

        <div className="border border-blue-300 p-3 flex items-center justify-center gap-4 rounded-xl shadow-md">
          <div className="w-10">
            <img src={wind} className="w-full" alt="Wind" />
          </div>
          <div>
            <p className="font-medium">Wind</p>
            <p className="font-bold text-blue-500 text-lg">
              {weather.wind} m/s
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
