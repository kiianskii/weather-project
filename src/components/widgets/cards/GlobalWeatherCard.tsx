import { Card, Group, Stack, Text, Box, ScrollArea } from "@mantine/core";
import {
  IconSun,
  IconCloud,
  IconCloudRain,
  IconCloudStorm,
  IconWind,
  IconDroplet,
  IconGauge,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useWeatherStore } from "../../../store/weatherStore";
import { useMediaQuery } from "@mantine/hooks";

interface WeatherCardProps {
  weather: any;
}

interface WeekDayData {
  date: string;
  temp: number;
  code: number;
}

const GlobalWeatherCard = ({ weather }: WeatherCardProps) => {
  const mobile = useMediaQuery("(max-width: 767px)");
  const navigate = useNavigate();
  const current_weather = weather?.current_weather;
  const hourly = weather?.hourly;
  const daily = weather?.daily;
  const city = weather?.city || "Unknown";

  if (!current_weather || !hourly || !daily) return null;

  const { setCity } = useWeatherStore();

  const getClosestHourIndex = (times: string[], currentTime: string) => {
    const target = new Date(currentTime).getTime();
    return times.reduce((closest, t, i) => {
      const diff = Math.abs(new Date(t).getTime() - target);
      return diff < Math.abs(new Date(times[closest]).getTime() - target)
        ? i
        : closest;
    }, 0);
  };

  const closestIndex = getClosestHourIndex(
    weather.hourly.time,
    weather.current_weather.time
  );

  let weatherType: "sunny" | "cloudy" | "rainy" | "stormy" = "sunny";
  if (current_weather.weathercode >= 3 && current_weather.weathercode < 60)
    weatherType = "cloudy";
  else if (
    current_weather.weathercode >= 60 &&
    current_weather.weathercode < 95
  )
    weatherType = "rainy";
  else if (current_weather.weathercode >= 95) weatherType = "stormy";

  const backgrounds = {
    sunny:
      "https://images.unsplash.com/photo-1615286628718-4a4c8924d0eb?auto=format&fit=crop&q=80&w=1740",
    cloudy:
      "https://images.unsplash.com/photo-1723943158162-71320cd8b830?auto=format&fit=crop&q=80&w=1931",
    rainy:
      "https://images.unsplash.com/photo-1620385019253-b051a26048ce?auto=format&fit=crop&q=80&w=774",
    stormy:
      "https://images.unsplash.com/photo-1620385019253-b051a26048ce?auto=format&fit=crop&q=80&w=774",
  };

  const icons = {
    sunny: IconSun,
    cloudy: IconCloud,
    rainy: IconCloudRain,
    stormy: IconCloudStorm,
  };
  const WeatherIcon = icons[weatherType];

  const handleClick = () => {
    setCity(city.toLowerCase());
    navigate(`/city`);
  };

  const weekData: WeekDayData[] = daily.time.map((time: string, i: number) => ({
    date: new Date(time).toLocaleDateString("en-US", { weekday: "short" }),
    temp: daily.temperature_2m_max?.[i] ?? 0,
    code: daily.weathercode?.[i] ?? 0,
  }));

  return (
    <Card
      shadow="md"
      radius="lg"
      p={mobile ? "sm" : "md"}
      onClick={handleClick}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundImage: `url(${backgrounds[weatherType]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
        position: "relative",
        cursor: "pointer",
        overflow: "hidden",
        transition: "transform 0.2s ease",
        height: mobile ? "auto" : "100%",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <Box
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(0,0,0,0.50), rgba(0,0,0,0.30))",
          zIndex: 0,
        }}
      />

      {/* === CURRENT WEATHER INFO === */}
      <Group
        justify="space-between"
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          height: mobile ? 120 : 180,
          flexShrink: 0,
          alignItems: "center",
        }}
      >
        <Stack
          justify="center"
          gap={mobile ? 2 : "xs"}
          style={{ paddingLeft: mobile ? "0.5rem" : "1rem" }}
        >
          <Text size={mobile ? "md" : "lg"} fw={700}>
            {city}
          </Text>
          <Group align="center" gap="xs" style={{ height: mobile ? 30 : 40 }}>
            <WeatherIcon size={mobile ? 24 : 36} />
            <Text
              size={mobile ? "xl" : "2rem"}
              fw={700}
              style={{
                minWidth: mobile ? 60 : 85,
                textAlign: "center",
                letterSpacing: "-0.03em",
              }}
            >
              {current_weather.temperature.toFixed(1)}°C
            </Text>
          </Group>
          {!mobile && (
            <Text size="sm" c="rgba(255,255,255,0.8)">
              {weatherType === "sunny"
                ? "Sunny and clear"
                : weatherType === "cloudy"
                ? "Cloudy skies"
                : weatherType === "rainy"
                ? "Rainy weather"
                : "Thunderstorms"}
            </Text>
          )}
        </Stack>

        <Stack
          justify="center"
          gap={mobile ? 2 : 6}
          style={{
            paddingRight: mobile ? "0.5rem" : "1rem",
            textAlign: "right",
            minWidth: mobile ? 80 : 110,
          }}
        >
          <Group gap={4} justify="flex-end">
            <IconWind size={mobile ? 12 : 14} />
            <Text size={mobile ? "xs" : "sm"}>
              {current_weather.windspeed} km/h
            </Text>
          </Group>
          <Group gap={4} justify="flex-end">
            <IconDroplet size={mobile ? 12 : 14} />
            <Text size={mobile ? "xs" : "sm"}>
              {weather.hourly.relative_humidity_2m?.[closestIndex] ?? 0}%
            </Text>
          </Group>
          <Group gap={4} justify="flex-end">
            <IconGauge size={mobile ? 12 : 14} />
            <Text size={mobile ? "xs" : "sm"}>
              {weather.hourly.surface_pressure?.[closestIndex]
                ? `${weather.hourly.surface_pressure[closestIndex].toFixed(
                    0
                  )} hPa`
                : "—"}
            </Text>
          </Group>
        </Stack>
      </Group>

      {/* === WEEK FORECAST === */}
      <ScrollArea
        type="never"
        style={{
          position: "relative",
          zIndex: 1,
          marginTop: mobile ? "0.25rem" : "0.5rem",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(6px)",
          padding: mobile ? "0.25rem" : "0.5rem",
          borderRadius: "1rem",
          overflowY: "hidden",
        }}
      >
        <Group
          gap={mobile ? 4 : "xs"}
          style={{
            width: "max-content",
            padding: "0 0.25rem",
          }}
        >
          {weekData.map((d, i) => {
            const rain = daily.precipitation_sum?.[i] ?? 0;
            const rainProb = daily.precipitation_probability_max?.[i] ?? 0;

            const getIcon = (rain: number, prob: number) => {
              if (prob > 70 || rain > 5)
                return (
                  <IconCloudRain
                    size={mobile ? 16 : 20}
                    style={{ margin: "4px auto" }}
                  />
                );
              if (prob > 30)
                return (
                  <IconCloud
                    size={mobile ? 16 : 20}
                    style={{ margin: "4px auto" }}
                  />
                );
              return (
                <IconSun
                  size={mobile ? 16 : 20}
                  style={{ margin: "4px auto" }}
                />
              );
            };

            return (
              <Card
                key={i}
                radius="md"
                p={mobile ? 4 : "xs"}
                style={{
                  background: "rgba(0,0,0,0.35)",
                  color: "#fff",
                  minWidth: mobile ? 60 : 80,
                  textAlign: "center",
                  flexShrink: 0,
                }}
              >
                <Text fw={600} size={mobile ? "xs" : "sm"}>
                  {d.date}
                </Text>
                {getIcon(rain, rainProb)}
                <Text fw={600} size={mobile ? "sm" : "md"}>
                  {d.temp.toFixed(0)}°C
                </Text>
              </Card>
            );
          })}
        </Group>
      </ScrollArea>
    </Card>
  );
};

export default GlobalWeatherCard;
