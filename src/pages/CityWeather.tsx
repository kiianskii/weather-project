import { Stack, Flex, Loader } from "@mantine/core";
import WeatherCard from "../components/widgets/cards/WeatherCard";
import HourlyForecast from "../components/widgets/CityWeatherWidgets/HourlyForecast";
import WeeklyForecast from "../components/widgets/CityWeatherWidgets/WeeklyForecast";
import PressureChart from "../components/widgets/CityWeatherWidgets/PressureChart";
import WindOverview from "../components/widgets/CityWeatherWidgets/WindOverview";
import ShortCards from "../components/widgets/CityWeatherWidgets/ShortCards";
import WeatherPlaceholder from "../components/utils/WeatherPlaceholder";
import { useWeatherStore } from "../store/weatherStore";
import { useMediaQuery } from "@mantine/hooks";

const CityWeather = () => {
  const { weather, loadingWeather, city } = useWeatherStore();
  const mobile = useMediaQuery("(max-width: 767px)");

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
    <Stack
      gap={mobile ? "md" : "lg"}
      style={{
        padding: mobile ? "0.75rem" : "1.5rem",
        width: "100%",
        maxWidth: "1200px",
        marginInline: "auto",
      }}
    >
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
          <Flex
            direction={mobile ? "column" : "row"}
            align={mobile ? "stretch" : "flex-start"}
            gap={mobile ? "md" : "xl"}
            style={{ width: "100%" }}
          >
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
