import { Stack, Text, Group, Grid, Card } from "@mantine/core";
import {
  IconWind,
  IconDroplet,
  IconGauge,
  IconCloudRain,
  IconSun,
  IconArrowUp,
} from "@tabler/icons-react";

interface WeatherCardProps {
  weather: any;
}

const ShortCards = ({ weather }: WeatherCardProps) => {
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

  // 🧭 Функція для отримання текстового напрямку (N, NE, E, ...)
  const getWindDirection = (deg: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW", "N"];
    return directions[Math.round(deg / 45) % 8];
  };

  const windDeg = weather.hourly.winddirection_10m?.[closestIndex] ?? 0;
  const windDir = getWindDirection(windDeg);

  return (
    <Grid grow gutter="md" mt="md">
      {/* 🌬 Вітер */}
      <Grid.Col span={3}>
        <Card shadow="sm" p="md" radius="md">
          <Group justify="space-between">
            <Group>
              <IconWind />
              <Stack gap={2}>
                <Text size="sm">Wind</Text>
                <Text fw={600}>{weather.current_weather.windspeed} km/h</Text>
              </Stack>
            </Group>

            {/* Напрямок */}
            <Stack align="center" gap={0}>
              <IconArrowUp
                size={20}
                style={{
                  transform: `rotate(${windDeg}deg)`,
                  transition: "transform 0.3s ease",
                }}
              />
              <Text size="xs" c="dimmed">
                {windDir}
              </Text>
            </Stack>
          </Group>
        </Card>
      </Grid.Col>

      {/* 💧 Вологість */}
      <Grid.Col span={3}>
        <Card shadow="sm" p="md" radius="md">
          <Group>
            <IconDroplet />
            <Stack gap={2}>
              <Text size="sm">Humidity</Text>
              <Text fw={600}>
                {weather.hourly.relative_humidity_2m?.[closestIndex] ?? 0}%
              </Text>
            </Stack>
          </Group>
        </Card>
      </Grid.Col>

      {/* 🌡 Тиск */}
      <Grid.Col span={3}>
        <Card shadow="sm" p="md" radius="md">
          <Group>
            <IconGauge />
            <Stack gap={2}>
              <Text size="sm">Pressure</Text>
              <Text fw={600}>
                {weather.hourly.surface_pressure?.[closestIndex]
                  ? `${weather.hourly.surface_pressure[closestIndex].toFixed(
                      0
                    )} hPa`
                  : "—"}
              </Text>
            </Stack>
          </Group>
        </Card>
      </Grid.Col>

      {/* ☀️ Опади */}
      <Grid.Col span={3}>
        <Card shadow="sm" p="md" radius="md">
          <Group>
            {weather.hourly.precipitation_probability?.[closestIndex] > 30 ? (
              <IconCloudRain />
            ) : (
              <IconSun />
            )}
            <Stack gap={2}>
              <Text size="sm">Precipitation</Text>
              <Text fw={600}>
                {weather.hourly.precipitation_probability?.[closestIndex] ?? 0}%
              </Text>
            </Stack>
          </Group>
        </Card>
      </Grid.Col>
    </Grid>
  );
};

export default ShortCards;
