import { Card, Group, Stack, Text, Divider } from "@mantine/core";
import {
  IconSun,
  IconCloud,
  IconCloudRain,
  IconWind,
  IconDroplet,
  IconGauge,
} from "@tabler/icons-react";

interface WeatherCardProps {
  weather: any;
}

const WeatherCard = ({ weather }: WeatherCardProps) => {
  const current_weather = weather?.current_weather;
  const hourly = weather?.hourly;
  const city = weather?.city || "Unknown";

  if (!current_weather || !hourly) return null;

  const index = hourly.time.indexOf(current_weather.time);
  const humidity = hourly.relative_humidity_2m?.[index] ?? 0;
  const pressure = hourly.surface_pressure?.[index] ?? 0;
  const clouds = hourly.cloudcover?.[index] ?? 0;

  const icon =
    current_weather.weathercode < 3
      ? IconSun
      : current_weather.weathercode < 60
      ? IconCloud
      : IconCloudRain;

  const WeatherIcon = icon;

  return (
    <Card
      shadow="md"
      radius="lg"
      p="md"
      style={{
        width: "100%",
        maxWidth: 280,
        background: "linear-gradient(135deg, #a0c4ff, #bdb2ff)",
        color: "#fff",
      }}
    >
      <Stack gap="sm" align="center">
        <Text size="lg" fw={700}>
          {city}
        </Text>

        <Group gap="xs" align="center">
          <WeatherIcon size={40} />
          <Text size="2rem" fw={700}>
            {current_weather.temperature.toFixed(1)}°C
          </Text>
        </Group>

        <Text size="xs" c="rgba(255,255,255,0.8)">
          {clouds > 60 ? "Cloudy" : "Clear sky"}
        </Text>

        <Divider my="xs" color="rgba(255,255,255,0.3)" />

        <Group gap="md" justify="center">
          <Group gap={4}>
            <IconWind size={16} />
            <Text size="sm">{current_weather.windspeed} km/h</Text>
          </Group>

          <Group gap={4}>
            <IconDroplet size={16} />
            <Text size="sm">{humidity}%</Text>
          </Group>

          <Group gap={4}>
            <IconGauge size={16} />
            <Text size="sm">{pressure} hPa</Text>
          </Group>
        </Group>
      </Stack>
    </Card>
  );
};

export default WeatherCard;
