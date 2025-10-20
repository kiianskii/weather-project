import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Stack, Text, Group, Grid, Card, Flex } from "@mantine/core";
import SearchBar from "../components/widgets/SearchBar";
import WeatherCard from "../components/widgets/cards/WeatherCard";
import HourlyForecast from "../components/widgets/HourlyForecast";
import WeeklyForecast from "../components/widgets/WeeklyForecast";

import {
  IconWind,
  IconDroplet,
  IconGauge,
  IconCloudRain,
  IconSun,
} from "@tabler/icons-react";
import { useWeatherStore } from "../store/weatherStore";
import WeatherPlaceholder from "../components/utils/WeatherPlaceholder";

const CityWeather = () => {
  const { name } = useParams<{ name?: string }>();
  const { weather, loading, error, fetchWeatherData } = useWeatherStore();

  useEffect(() => {
    if (name) {
      fetchWeatherData(name);
    }
  }, [name, fetchWeatherData]);

  if (!name) {
    return (
      <Stack gap="lg" style={{ padding: "1rem", width: "100%" }}>
        <Flex justify="center">
          <SearchBar />
        </Flex>
        {/* <Text ta="center" c="dimmed">
          Enter a city name to view its weather forecast
        </Text> */}
        <WeatherPlaceholder />
      </Stack>
    );
  }

  return (
    <Stack gap="lg" style={{ padding: "1rem", width: "100%" }}>
      <Flex justify="center">
        <SearchBar />
      </Flex>

      {loading && <Text ta="center">Loading...</Text>}
      {error && (
        <Text c="red" ta="center">
          {error}
        </Text>
      )}

      {weather && (
        <>
          <Flex align="flex-start" gap="xl" style={{ width: "100%" }}>
            <WeatherCard weather={weather} />
            <HourlyForecast hourly={weather.hourly} />
          </Flex>

          <Grid grow gutter="md" mt="md">
            <Grid.Col span={3}>
              <Card shadow="sm" p="md" radius="md">
                <Group>
                  <IconWind />
                  <Stack gap={2}>
                    <Text size="sm">Wind</Text>
                    <Text fw={600}>
                      {weather.current_weather.windspeed} km/h
                    </Text>
                  </Stack>
                </Group>
              </Card>
            </Grid.Col>

            <Grid.Col span={3}>
              <Card shadow="sm" p="md" radius="md">
                <Group>
                  <IconDroplet />
                  <Stack gap={2}>
                    <Text size="sm">Humidity</Text>
                    <Text fw={600}>
                      {weather.hourly.relative_humidity_2m?.[
                        weather.hourly.time.indexOf(
                          weather.current_weather.time
                        )
                      ] ?? 0}
                      %
                    </Text>
                  </Stack>
                </Group>
              </Card>
            </Grid.Col>

            <Grid.Col span={3}>
              <Card shadow="sm" p="md" radius="md">
                <Group>
                  <IconGauge />
                  <Stack gap={2}>
                    <Text size="sm">Pressure</Text>
                    <Text fw={600}>
                      {weather.hourly.surface_pressure?.[
                        weather.hourly.time.indexOf(
                          weather.current_weather.time
                        )
                      ] ?? 0}{" "}
                      hPa
                    </Text>
                  </Stack>
                </Group>
              </Card>
            </Grid.Col>

            <Grid.Col span={3}>
              <Card shadow="sm" p="md" radius="md">
                <Group>
                  {weather.hourly.precipitation?.[
                    weather.hourly.time.indexOf(weather.current_weather.time)
                  ] > 0 ? (
                    <IconCloudRain />
                  ) : (
                    <IconSun />
                  )}
                  <Stack gap={2}>
                    <Text size="sm">Precipitation</Text>
                    <Text fw={600}>
                      {weather.hourly.precipitation?.[
                        weather.hourly.time.indexOf(
                          weather.current_weather.time
                        )
                      ]?.toFixed(1) ?? 0}{" "}
                      mm
                    </Text>
                  </Stack>
                </Group>
              </Card>
            </Grid.Col>
          </Grid>

          <WeeklyForecast daily={weather.daily} city={weather.city} />
        </>
      )}
    </Stack>
  );
};

export default CityWeather;
