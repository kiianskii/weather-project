import { Stack } from "@mantine/core";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import WeatherChart from "../components/WeatherChart";
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
