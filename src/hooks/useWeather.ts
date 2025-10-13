import { useState } from "react";
import { fetchWeather } from "../api/weatherApi";
import { useWeatherStore } from "../store/weatherStore";
import axios from "axios";

const GEO_API = "https://geocoding-api.open-meteo.com/v1/search";

export const useWeather = () => {
  const { weather, setWeather } = useWeatherStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = async (city: string) => {
    try {
      setLoading(true);
      setError(null);

      const geoResponse = await axios.get(GEO_API, {
        params: { name: city, count: 1, language: "en", format: "json" },
      });

      const location = geoResponse.data.results?.[0];
      if (!location) throw new Error("City not found");

      const { latitude, longitude } = location;

      const data = await fetchWeather(latitude, longitude);
      setWeather({ ...data, city: location.name });
    } catch (err: any) {
      setError(err.message || "Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  return { weather, loading, error, fetchWeatherData };
};
