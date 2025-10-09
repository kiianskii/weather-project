import { create } from "zustand";

interface WeatherData {
  temperature: number;
  windspeed: number;
  time: string;
}

interface WeatherState {
  city: string;
  lat: number;
  lon: number;
  current: WeatherData | null;
  setCity: (city: string) => void;
  setCoords: (lat: number, lon: number) => void;
  setWeather: (data: WeatherData) => void;
}

export const useWeatherStore = create<WeatherState>((set) => ({
  city: "Kyiv",
  lat: 50.45,
  lon: 30.52,
  current: null,
  setCity: (city) => set({ city }),
  setCoords: (lat, lon) => set({ lat, lon }),
  setWeather: (data) => set({ current: data }),
}));
