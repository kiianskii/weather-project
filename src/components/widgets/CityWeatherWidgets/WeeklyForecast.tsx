import {
  Card,
  Stack,
  Text,
  Group,
  ScrollArea,
  Tooltip,
  useMantineColorScheme,
} from "@mantine/core";
import {
  IconCloud,
  IconSun,
  IconCloudRain,
  IconDroplet,
  IconSunrise,
  IconSunset,
} from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";

interface DailyWeather {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_sum: number[];
  precipitation_probability_max: number[];
  sunrise: string[];
  sunset: string[];
}

interface WeeklyForecastProps {
  daily: DailyWeather;
  city?: string;
}

const WeeklyForecast = ({ daily, city }: WeeklyForecastProps) => {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";
  const mobile = useMediaQuery("(max-width: 767px)");

  if (!daily?.time?.length) return null;

  const days = daily.time.map((date, index) => ({
    date: new Date(date),
    day: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
    max: daily.temperature_2m_max[index],
    min: daily.temperature_2m_min[index],
    rain: daily.precipitation_sum[index],
    rainProb: daily.precipitation_probability_max[index],
    sunrise: new Date(daily.sunrise[index]).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    sunset: new Date(daily.sunset[index]).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  }));

  const getIcon = (rain: number, prob: number) => {
    if (prob > 70 || rain > 5) return <IconCloudRain size={mobile ? 16 : 20} />;
    if (prob > 30) return <IconCloud size={mobile ? 16 : 20} />;
    return <IconSun size={mobile ? 16 : 20} />;
  };

  return (
    <Card
      shadow="sm"
      radius="md"
      p={mobile ? "sm" : "md"}
      style={{
        flex: 1,
        background: isDark ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.6)",
        border: isDark
          ? "1px solid rgba(255,255,255,0.1)"
          : "1px solid rgba(0,0,0,0.15)",
      }}
    >
      <Stack gap={mobile ? "xs" : "sm"}>
        <Text size={mobile ? "sm" : "md"} fw={600}>
          Weekly Forecast {city ? `– ${city}` : ""}
        </Text>

        {mobile ? (
          <ScrollArea
            offsetScrollbars
            type="always"
            scrollbarSize={6}
            style={{ overflowY: "hidden", paddingBottom: "0.25rem" }}
          >
            <Group
              gap="sm"
              wrap="nowrap"
              p={4}
              style={{ display: "flex", flexWrap: "nowrap" }}
            >
              {days.map((d, i) => (
                <Card
                  key={i}
                  shadow="xs"
                  radius="md"
                  p="xs"
                  style={{
                    flex: "0 0 90px",
                    textAlign: "center",
                    background: isDark
                      ? "linear-gradient(135deg, #2c2c3e, #3f3a56)"
                      : "linear-gradient(135deg, #a8bfff, #cbb5ff)",
                    border: isDark
                      ? "1px solid rgba(255,255,255,0.15)"
                      : "1px solid rgba(255,255,255,0.3)",
                    color: isDark ? "#fff" : "#000",
                    boxShadow: isDark
                      ? "0 2px 5px rgba(0,0,0,0.25)"
                      : "0 2px 5px rgba(0,0,0,0.15)",
                    transition: "transform 0.15s ease, box-shadow 0.15s ease",
                    minHeight: 120,
                  }}
                >
                  <Stack gap={2} align="center">
                    <Text size="xs" fw={600}>
                      {d.day}
                    </Text>
                    {getIcon(d.rain, d.rainProb)}
                    <Text size="xs">
                      {Math.round(d.min)}° / {Math.round(d.max)}°
                    </Text>
                    <Group gap={4} justify="center">
                      <Tooltip label={`Sunrise: ${d.sunrise}`} withArrow>
                        <IconSunrise size={12} />
                      </Tooltip>
                      <Tooltip label={`Sunset: ${d.sunset}`} withArrow>
                        <IconSunset size={12} />
                      </Tooltip>
                    </Group>
                    <Group gap={3} justify="center">
                      <IconDroplet size={12} />
                      <Text size="xs">{d.rainProb}%</Text>
                    </Group>
                  </Stack>
                </Card>
              ))}
            </Group>
          </ScrollArea>
        ) : (
          <Group
            gap="md"
            wrap="nowrap"
            style={{
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            {days.map((d, i) => (
              <Card
                key={i}
                shadow="xs"
                radius="md"
                p="sm"
                style={{
                  flex: `1 1 ${100 / days.length}%`,
                  textAlign: "center",
                  background: isDark
                    ? "linear-gradient(135deg, #2c2c3e, #3f3a56)"
                    : "linear-gradient(135deg, #a8bfff, #cbb5ff)",
                  border: isDark
                    ? "1px solid rgba(255,255,255,0.15)"
                    : "1px solid rgba(255,255,255,0.3)",
                  color: isDark ? "#fff" : "#000",
                  boxShadow: isDark
                    ? "0 2px 5px rgba(0,0,0,0.25)"
                    : "0 2px 5px rgba(0,0,0,0.15)",
                  transition: "transform 0.15s ease, box-shadow 0.15s ease",
                  minHeight: 140,
                }}
              >
                <Stack gap={4} align="center">
                  <Text size="sm" fw={600}>
                    {d.day}
                  </Text>
                  {getIcon(d.rain, d.rainProb)}
                  <Text size="sm">
                    {Math.round(d.min)}° / {Math.round(d.max)}°
                  </Text>
                  <Group gap={6} justify="center">
                    <Tooltip label={`Sunrise: ${d.sunrise}`} withArrow>
                      <IconSunrise size={16} />
                    </Tooltip>
                    <Tooltip label={`Sunset: ${d.sunset}`} withArrow>
                      <IconSunset size={16} />
                    </Tooltip>
                  </Group>
                  <Group gap={4} justify="center">
                    <IconDroplet size={14} />
                    <Text size="sm">{d.rainProb}%</Text>
                  </Group>
                </Stack>
              </Card>
            ))}
          </Group>
        )}
      </Stack>
    </Card>
  );
};

export default WeeklyForecast;
