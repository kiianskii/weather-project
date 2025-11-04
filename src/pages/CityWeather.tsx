import { useEffect } from "react";
import { Stack, Text, Flex, Loader } from "@mantine/core";
import WeatherCard from "../components/widgets/cards/WeatherCard";
import HourlyForecast from "../components/widgets/CityWeatherWidgets/HourlyForecast";
import WeeklyForecast from "../components/widgets/CityWeatherWidgets/WeeklyForecast";

import { useWeatherStore } from "../store/weatherStore";
import WeatherPlaceholder from "../components/utils/WeatherPlaceholder";
import PressureChart from "../components/widgets/CityWeatherWidgets/PressureChart";

import WindOverview from "../components/widgets/CityWeatherWidgets/WindOverview";
import ShortCards from "../components/widgets/CityWeatherWidgets/ShortCards";

const CityWeather = () => {
  const { weather, loadingWeather, city } = useWeatherStore();

  if (!city || !weather) {
    return (
      <Stack gap="lg" style={{ padding: "1rem", width: "100%" }}>
        <WeatherPlaceholder
          title="Weather Forecast"
          description="Enter a city name in the search bar above to see detailed weather information."
        />
      </Stack>
    );
  }

  return (
    <Stack gap="lg" style={{ padding: "1rem", width: "100%" }}>
      {loadingWeather && (
        <Flex
          justify="center"
          align="center"
          style={{ height: "80vh", width: "100%" }}
        >
          <Loader size="lg" />
        </Flex>
      )}

      {!loadingWeather && (
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
