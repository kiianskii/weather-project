import { create } from "zustand";
import axios from "axios";
import { fetchWeather, fetchHistoricalWeather } from "../api/weatherApi";

interface WeatherData {
  city?: string;
  current_weather?: any;
  daily?: any;
  hourly?: any;
  [key: string]: any;
}

interface WeatherStore {
  weather: WeatherData | null;
  history: any | null;
  loading: boolean;
  error: string | null;
  city: string | null;
  fetchWeatherData: (city: string) => Promise<void>;
  fetchHistoricalWeatherData: (
    city: string,
    start: string,
    end: string
  ) => Promise<void>;
  clearWeather: () => void;
  clearHistory: () => void;
  setCity: (city: string | null) => void;
}

export const useWeatherStore = create<WeatherStore>((set) => ({
  weather: null,
  history: null,
  loading: false,
  error: null,
  city: null,

  fetchWeatherData: async (city: string) => {
    try {
      set({ loading: true, error: null });

      const geo = await axios.get(
        "https://geocoding-api.open-meteo.com/v1/search",
        { params: { name: city, count: 1, language: "en" } }
      );

      const location = geo.data.results?.[0];
      if (!location) throw new Error("City not found");

      const { latitude, longitude } = location;
      const data = await fetchWeather(latitude, longitude);

      set({
        weather: { ...data, city: location.name },
        loading: false,
      });
    } catch (err: any) {
      set({
        error: err.message || "Failed to fetch weather data",
        loading: false,
      });
    }
  },

  fetchHistoricalWeatherData: async (city, startDate, endDate) => {
    try {
      set({ loading: true, error: null });

      const geo = await axios.get(
        "https://geocoding-api.open-meteo.com/v1/search",
        { params: { name: city, count: 1, language: "en" } }
      );

      const location = geo.data.results?.[0];
      if (!location) throw new Error("City not found");

      const { latitude, longitude } = location;
      const historyData = await fetchHistoricalWeather(
        latitude,
        longitude,
        startDate,
        endDate
      );

      set({
        history: historyData, // окремо
        loading: false,
        city: location.name,
      });
    } catch (err: any) {
      set({
        error: err.message || "Failed to fetch historical data",
        loading: false,
      });
    }
  },

  setCity: (city: string | null) => set({ city }),
  clearWeather: () => set({ weather: null, error: null }),
  clearHistory: () => set({ history: null, error: null }),
}));
