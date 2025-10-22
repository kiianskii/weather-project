import { create } from "zustand";
import axios from "axios";
import { fetchWeather } from "../api/weatherApi";

interface WeatherData {
  city?: string;
  current_weather?: any;
  daily?: any;
  hourly?: any;
  [key: string]: any;
}

interface WeatherStore {
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
  city: string | null;
  fetchWeatherData: (city: string) => Promise<void>;
  clearWeather: () => void;
  setCity: (city: string | null) => void;
}

export const useWeatherStore = create<WeatherStore>((set) => ({
  weather: null,
  loading: false,
  error: null,
  city: null,

  fetchWeatherData: async (city: string) => {
    try {
      set({ loading: true, error: null });

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

      set({
        weather: {
          ...data,
          city: location.name,
        },
        loading: false,
      });
    } catch (err: any) {
      set({
        error: err.message || "Failed to fetch weather data",
        loading: false,
      });
    }
  },
  setCity: (city: string | null) => set({ city: city }),
  clearWeather: () => set({ weather: null, error: null }),
}));
