import axios from "axios";

const BASE_URL = "https://api.open-meteo.com/v1/forecast";

export const fetchWeather = async (lat: number, lon: number) => {
  const response = await axios.get(BASE_URL, {
    params: {
      latitude: lat,
      longitude: lon,
      current_weather: true,
      daily: [
        "temperature_2m_max",
        "temperature_2m_min",
        "precipitation_sum",
        "precipitation_probability_max",
        "sunrise",
        "sunset",
      ].join(","),
      hourly: [
        "temperature_2m",
        "apparent_temperature",
        "relative_humidity_2m",
        "cloudcover",
        "precipitation_probability",
        "precipitation",
      ].join(","),
      timezone: "auto",
    },
  });
  return response.data;
};
