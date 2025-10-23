import { useEffect } from "react";
import { Stack, Text, Flex } from "@mantine/core";
import WeatherCard from "../components/widgets/cards/WeatherCard";
import HourlyForecast from "../components/widgets/HourlyForecast";
import WeeklyForecast from "../components/widgets/WeeklyForecast";

import { useWeatherStore } from "../store/weatherStore";
import WeatherPlaceholder from "../components/utils/WeatherPlaceholder";
import PressureChart from "../components/widgets/PressureChart";
import ShortCards from "../components/widgets/ShortCards";
import WindOverview from "../components/widgets/WindOverview";

const CityWeather = () => {
  const { weather, loading, error, fetchWeatherData, city } = useWeatherStore();

  useEffect(() => {
    if (city) {
      fetchWeatherData(city);
    }
  }, [city, fetchWeatherData]);

  if (!city) {
    return (
      <Stack gap="lg" style={{ padding: "1rem", width: "100%" }}>
        <WeatherPlaceholder />
      </Stack>
    );
  }

  if (!weather) return null;

  return (
    <Stack gap="lg" style={{ padding: "1rem", width: "100%" }}>
      {loading && <Text ta="center">Loading...</Text>}
      {error && (
        <Text c="red" ta="center">
          {error}
        </Text>
      )}

      {!loading && (
        <>
          <Flex align="flex-start" gap="xl" style={{ width: "100%" }}>
            <WeatherCard weather={weather} />
            <HourlyForecast hourly={weather.hourly} />
          </Flex>

          <ShortCards weather={weather} />

          <WeeklyForecast daily={weather.daily} city={weather.city} />
          <PressureChart hourly={weather.hourly} />
          <WindOverview weather={weather} />
        </>
      )}
    </Stack>
  );
};

export default CityWeather;
