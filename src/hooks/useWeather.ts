import { useState } from "react";
import { fetchWeather } from "../api/weatherApi";
import axios from "axios";

export const useWeather = () => {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = async (city: string) => {
    try {
      setLoading(true);
      setError(null);

      const geo = await axios.get(
        "https://geocoding-api.open-meteo.com/v1/search",
        {
          params: { name: city, count: 1, language: "en" },
        }
      );

      const location = geo.data.results?.[0];
      if (!location) throw new Error("City not found");

      const { latitude, longitude } = location;
      const data = await fetchWeather(latitude, longitude);

      setWeather({
        ...data,
        city: location.name,
      });
    } catch (err: any) {
      setError(err.message || "Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  return { weather, loading, error, fetchWeatherData };
};
