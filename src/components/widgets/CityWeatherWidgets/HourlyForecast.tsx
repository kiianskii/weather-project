import { useEffect, useRef } from "react";
import {
  ScrollArea,
  Group,
  Stack,
  Text,
  Card,
  useMantineColorScheme,
} from "@mantine/core";
import { IconCloud, IconCloudRain, IconSun } from "@tabler/icons-react";

interface HourlyWeather {
  time: string[];
  temperature_2m: number[];
  precipitation: number[];
  precipitation_probability?: number[];
  cloudcover: number[];
}

interface HourlyForecastProps {
  hourly: HourlyWeather;
}

const HourlyForecast = ({ hourly }: HourlyForecastProps) => {
  if (!hourly?.time?.length) return null;

  const today = new Date().getDate();
  const currentHour = new Date().getHours();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { colorScheme } = useMantineColorScheme();

  const isDark = colorScheme === "dark";

  const hours = hourly.time
    .map((time, index) => ({
      date: new Date(time),
      time: new Date(time).getHours(),
      day: new Date(time).getDate(),
      temp: hourly.temperature_2m[index],
      rain: hourly.precipitation[index],
      rainProb: hourly.precipitation_probability?.[index] ?? 0,
      clouds: hourly.cloudcover[index],
    }))
    .filter((h) => h.day === today);

  useEffect(() => {
    const currentIndex = hours.findIndex((h) => h.time === currentHour);
    if (
      currentIndex !== -1 &&
      scrollAreaRef.current &&
      cardRefs.current[currentIndex]
    ) {
      cardRefs.current[currentIndex]?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [hours]);

  const getIcon = (rain: number, rainProb: number, clouds: number) => {
    if (rain > 0.2 || rainProb > 50) return <IconCloudRain size={20} />;
    if (clouds > 75) return <IconCloud size={20} />;
    return <IconSun size={20} />;
  };

  return (
    <Card
      shadow="sm"
      radius="md"
      p="sm"
      style={{
        flex: 1,
        background: "rgba(255, 255, 255, 0.08)",
        border: isDark
          ? "1px solid rgba(255,255,255,0.1)"
          : "1px solid rgba(0,0,0,0.15)",
      }}
    >
      <Text size="sm" fw={600} mb="xs">
        Hourly Forecast
      </Text>

      <ScrollArea viewportRef={scrollAreaRef} type="always" offsetScrollbars>
        <Group gap="xs" wrap="nowrap" p="xs" pb="sm">
          {hours.map((h, i) => {
            const isCurrent = h.time === currentHour;
            return (
              <Card
                key={i}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                shadow="xs"
                p="xs"
                radius="md"
                style={{
                  minWidth: 75,
                  textAlign: "center",
                  background: isCurrent
                    ? isDark
                      ? "linear-gradient(135deg, #4b4b5f, #6a5acd)"
                      : "linear-gradient(135deg, #b5d0ff, #d6c4ff)"
                    : isDark
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(255, 255, 255, 0.15)",
                  border: isCurrent
                    ? isDark
                      ? "1px solid rgba(255,255,255,0.4)"
                      : "1px solid rgba(0,0,0,0.2)"
                    : isDark
                    ? "1px solid rgba(255,255,255,0.2)"
                    : "1px solid rgba(0,0,0,0.1)",
                  color: isDark ? "#fff" : "#000",
                  transition: "all 0.3s ease",
                }}
              >
                <Stack gap={3} align="center">
                  <Text size="xs">{h.time}:00</Text>
                  {getIcon(h.rain, h.rainProb, h.clouds)}
                  <Text size="sm" fw={600}>
                    {Math.round(h.temp)}°
                  </Text>
                </Stack>
              </Card>
            );
          })}
        </Group>
      </ScrollArea>
    </Card>
  );
};

export default HourlyForecast;
