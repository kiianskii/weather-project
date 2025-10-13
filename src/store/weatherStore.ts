import { create } from "zustand";

interface WeatherData {
  city?: string;
  current_weather?: any;
  daily?: any;
  [key: string]: any;
}

interface WeatherStore {
  weather: WeatherData | null;
  setWeather: (data: WeatherData) => void;
}

export const useWeatherStore = create<WeatherStore>((set) => ({
  weather: null,
  setWeather: (data) => set({ weather: data }),
}));
