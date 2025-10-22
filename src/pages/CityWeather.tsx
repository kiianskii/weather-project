import { useEffect } from "react";
import { Stack, Text, Group, Grid, Card, Flex } from "@mantine/core";
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

  const getClosestHourIndex = (times: string[], currentTime: string) => {
    const target = new Date(currentTime).getTime();
    let closestIndex = 0;
    let smallestDiff = Infinity;

    times.forEach((t, i) => {
      const diff = Math.abs(new Date(t).getTime() - target);
      if (diff < smallestDiff) {
        smallestDiff = diff;
        closestIndex = i;
      }
    });

    return closestIndex;
  };

  const closestIndex = getClosestHourIndex(
    weather.hourly.time,
    weather.current_weather.time
  );

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
                      {weather.hourly.relative_humidity_2m?.[closestIndex] ?? 0}
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
                      {weather.hourly.surface_pressure?.[closestIndex]
                        ? `${weather.hourly.surface_pressure[
                            closestIndex
                          ].toFixed(0)} hPa`
                        : "—"}
                    </Text>
                  </Stack>
                </Group>
              </Card>
            </Grid.Col>

            <Grid.Col span={3}>
              <Card shadow="sm" p="md" radius="md">
                <Group>
                  {weather.hourly.precipitation_probability?.[closestIndex] >
                  30 ? (
                    <IconCloudRain />
                  ) : (
                    <IconSun />
                  )}
                  <Stack gap={2}>
                    <Text size="sm">Precipitation</Text>
                    <Text fw={600}>
                      {weather.hourly.precipitation_probability?.[
                        closestIndex
                      ] ?? 0}
                      %
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
