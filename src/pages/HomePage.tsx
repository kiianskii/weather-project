import { Stack } from "@mantine/core";
import SearchBar from "../components/widgets/SearchBar";
import WeatherCard from "../components/widgets/WeatherCard";
import WeatherChart from "../components/widgets/WeatherChart";
import { useWeather } from "../hooks/useWeather";

const HomePage = () => {
  const { weather, loading, error, fetchWeatherData } = useWeather();

  return (
    <Stack gap="md" align="center">
      <SearchBar onSearch={fetchWeatherData} />
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {weather && (
        <>
          <WeatherCard weather={weather} />
          <WeatherChart weather={weather} />
        </>
      )}
    </Stack>
  );
};

export default HomePage;
