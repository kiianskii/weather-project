import { Card, Text, Group, Stack } from "@mantine/core";
import { IconSun, IconCloud, IconCloudRain } from "@tabler/icons-react";

interface WeatherCardProps {
  weather: any;
}

const WeatherCard = ({ weather }: WeatherCardProps) => {
  const { current_weather, daily } = weather;
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
      p="lg"
      radius="lg"
      style={{
        backdropFilter: "blur(10px)",
        background: "rgba(255, 255, 255, 0.3)",
      }}
    >
      <Stack align="center" gap="xs">
        <WeatherIcon size={48} />
        <Text size="xl" fw={700}>
          {current_weather.temperature.toFixed(1)}°C
        </Text>
        <Text size="sm" c="dimmed">
          Wind: {current_weather.windspeed} km/h
        </Text>
        <Group gap="sm">
          <Text size="sm">Max: {daily.temperature_2m_max[0]}°C</Text>
          <Text size="sm">Min: {daily.temperature_2m_min[0]}°C</Text>
        </Group>
      </Stack>
    </Card>
  );
};

export default WeatherCard;
