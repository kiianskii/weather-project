import { Card, Group, Stack, Text, Divider, Flex } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconSun,
  IconCloud,
  IconCloudRain,
  IconWind,
  IconDroplet,
  IconGauge,
} from "@tabler/icons-react";
import { useWeatherStore } from "../../../store/weatherStore";

import { CardInfoTooltip } from "../../../shared/components/CardInfoTooltip";

interface WeatherCardProps {
  weather: any;
}

const WeatherCard = ({ weather }: WeatherCardProps) => {
  const current_weather = weather?.current_weather;
  const hourly = weather?.hourly;
  const city = weather?.city || "Unknown";
  const mobile = useMediaQuery("(max-width: 767px)");

  const { country } = useWeatherStore();

  const location = [
    country?.country,
    country?.relativity1,
    country?.relativity2,
  ]
    .filter(Boolean)
    .join(", ");

  if (!current_weather || !hourly) return null;

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

  let weatherType: "sunny" | "cloudy" | "rainy" = "sunny";
  if (current_weather.weathercode >= 3 && current_weather.weathercode < 60)
    weatherType = "cloudy";
  else if (current_weather.weathercode >= 60) weatherType = "rainy";
  const backgrounds: Record<typeof weatherType, string> = {
    sunny:
      "https://images.unsplash.com/photo-1615286628718-4a4c8924d0eb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740",
    cloudy:
      "https://images.unsplash.com/photo-1723943158162-71320cd8b830?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1931",
    rainy:
      "https://images.unsplash.com/photo-1620385019253-b051a26048ce?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774",
  };

  const icons = {
    sunny: IconSun,
    cloudy: IconCloud,
    rainy: IconCloudRain,
  };

  const WeatherIcon = icons[weatherType];

  return (
    <Card
      shadow="md"
      radius="lg"
      p="md"
      style={{
        width: "100%",
        maxWidth: mobile ? "100%" : 300,
        color: "#fff",
        backgroundImage: `url(${backgrounds[weatherType]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.4))",
          zIndex: 0,
        }}
      />
      <Stack
        gap="sm"
        align="center"
        style={{ position: "relative", zIndex: 1 }}
      >
        <Flex
          style={{
            maxWidth: "100%",
          }}
          align="center"
          gap={mobile ? 4 : 6}
        >
          <CardInfoTooltip size={20} label={location} />
          <Text size="lg" fw={700}>
            {city}
          </Text>
        </Flex>

        <Group gap="xs" align="center">
          <WeatherIcon size={42} />
          <Text size="2rem" fw={700}>
            {current_weather.temperature.toFixed(1)}°C
          </Text>
        </Group>

        <Text size="sm" c="rgba(255,255,255,0.85)">
          {weatherType === "sunny"
            ? "Sunny and clear"
            : weatherType === "cloudy"
            ? "Cloudy skies"
            : "Rainy weather"}
        </Text>

        <Divider my="xs" color="rgba(255,255,255,0.3)" />

        <Group gap="md" justify="center">
          <Group gap={2}>
            <IconWind size={16} />
            <Text size="sm">{current_weather.windspeed} km/h</Text>
          </Group>

          <Group gap={2}>
            <IconDroplet size={16} />
            <Text size="sm">
              {" "}
              {weather.hourly.relative_humidity_2m?.[closestIndex] ?? 0}%
            </Text>
          </Group>

          <Group gap={2}>
            <IconGauge size={16} />
            <Text size="sm">
              {weather.hourly.surface_pressure?.[closestIndex]
                ? `${weather.hourly.surface_pressure[closestIndex].toFixed(
                    0
                  )} hPa`
                : "—"}
            </Text>
          </Group>
        </Group>
      </Stack>
    </Card>
  );
};

export default WeatherCard;
