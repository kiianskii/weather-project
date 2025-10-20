import { useEffect, useState } from "react";
import { Grid, Center, Loader, Container } from "@mantine/core";
import GlobalWeatherCard from "./cards/GlobalWeatherCard";
import { fetchWeather } from "../../api/weatherApi";

interface CityWeatherAPI {
  current_weather: {
    temperature: number;
    weathercode: number;
    windspeed: number;
    winddirection: number;
    time: string;
  };
  hourly: {
    time: string[];
    temperature_2m?: number[];
    relative_humidity_2m?: number[];
    cloudcover?: number[];
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
    precipitation_probability_max: number[];
  };
  city: string;
}

const cities = [
  { name: "Kyiv", lat: 50.45, lon: 30.52 },
  { name: "London", lat: 51.51, lon: -0.13 },
  { name: "Tokyo", lat: 35.68, lon: 139.76 },
  { name: "New York", lat: 40.71, lon: -74.01 },
];

export default function GlobalWeatherOverview() {
  const [data, setData] = useState<CityWeatherAPI[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const promises = cities.map((c) => fetchWeather(c.lat, c.lon));
        const results = await Promise.all(promises);

        const formatted = results.map((r, i) => ({
          current_weather: r.current_weather,
          hourly: r.hourly,
          daily: r.daily,
          city: cities[i].name,
        }));

        setData(formatted);
      } catch (err) {
        console.error("Weather API error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  if (loading)
    return (
      <Center h="80vh">
        <Loader color="blue" size="xl" />
      </Center>
    );

  return (
    <Container fluid p="xl" style={{ minHeight: "100%" }}>
      <Grid gutter="lg" justify="center">
        {data.map((weather) => (
          <Grid.Col span={{ base: 12, md: 6 }} key={weather.city}>
            <GlobalWeatherCard weather={weather} />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}
