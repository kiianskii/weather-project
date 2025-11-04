import { create } from "zustand";
import axios from "axios";
import { fetchWeather, fetchHistoricalWeather } from "../api/weatherApi";
import type { DatesRangeValue } from "@mantine/dates";

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
  loadingWeather: boolean;
  loadingHistory: boolean;

  weatherError: string | null;
  historyError: string | null;

  city: string | null;
  historyCity: string | null;
  dateRange: DatesRangeValue;

  fetchWeatherData: (city: string) => Promise<void>;
  fetchHistoricalWeatherData: (
    city: string,
    start: string,
    end: string
  ) => Promise<void>;

  clearWeather: () => void;
  clearHistory: () => void;
  setCity: (city: string | null) => void;
  setHistoryCity: (city: string | null) => void;
  setDateRange: (cred: DatesRangeValue) => void;
  clearWeatherError: () => void;
  clearHistoryError: () => void;
}

export const useWeatherStore = create<WeatherStore>((set) => ({
  weather: null,
  history: null,

  loadingWeather: false,
  loadingHistory: false,

  weatherError: null,
  historyError: null,

  city: null,
  historyCity: null,
  dateRange: [null, null],

  fetchWeatherData: async (city: string) => {
    try {
      set({
        loadingWeather: true,
        weatherError: null,
        weather: null,
        city: null,
      });

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
        loadingWeather: false,
        city: location.name,
      });
    } catch (err: any) {
      set({
        weatherError: err.message || "Failed to fetch weather data",
        loadingWeather: false,
      });
    }
  },

  fetchHistoricalWeatherData: async (city, startDate, endDate) => {
    try {
      set({
        loadingHistory: true,
        historyError: null,
        history: null,
        historyCity: null,
      });

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
        history: historyData,
        loadingHistory: false,
        historyCity: location.name,
      });
    } catch (err: any) {
      set({
        historyError: err.message || "Failed to fetch historical data",
        loadingHistory: false,
      });
    }
  },

  setCity: (city: string | null) => set({ city }),
  setHistoryCity: (city: string | null) => set({ historyCity: city }),
  setDateRange: (cred: DatesRangeValue) => set({ dateRange: cred }),

  clearWeather: () =>
    set({
      weather: null,
      weatherError: null,
      city: null,
      loadingWeather: false,
    }),
  clearWeatherError: () => set({ weatherError: null }),
  clearHistoryError: () => set({ weatherError: null }),

  clearHistory: () =>
    set({
      history: null,
      historyError: null,
      historyCity: null,
      dateRange: [null, null],
      loadingHistory: false,
    }),
}));
