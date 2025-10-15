import { Card, Stack, Text, Group, ScrollArea, Tooltip } from "@mantine/core";
import {
  IconCloud,
  IconSun,
  IconCloudRain,
  IconDroplet,
  IconSunrise,
  IconSunset,
} from "@tabler/icons-react";

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
    if (prob > 70 || rain > 5) return <IconCloudRain size={20} />;
    if (prob > 30) return <IconCloud size={20} />;
    return <IconSun size={20} />;
  };

  return (
    <Card
      shadow="sm"
      radius="md"
      p="md"
      style={{
        flex: 1,
        background: "rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(6px)",
      }}
    >
      <Stack gap="sm">
        <Text size="sm" fw={600}>
          Weekly Forecast {city ? `– ${city}` : ""}
        </Text>

        <ScrollArea offsetScrollbars type="always">
          <Group
            gap="sm"
            wrap="nowrap"
            p="xs"
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "nowrap",
            }}
          >
            {days.map((d, i) => (
              <Card
                key={i}
                shadow="xs"
                radius="md"
                p="sm"
                style={{
                  flex: "1 1 120px",
                  textAlign: "center",
                  background: "linear-gradient(135deg, #9dbafc, #c6b5ff)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: "#000",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                  transition: "transform 0.15s ease, box-shadow 0.15s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(0,0,0,0.25)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 2px 6px rgba(0,0,0,0.15)")
                }
              >
                <Stack gap={3} align="center">
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
                    <Text size="xs">{d.rainProb}%</Text>
                  </Group>
                </Stack>
              </Card>
            ))}
          </Group>
        </ScrollArea>
      </Stack>
    </Card>
  );
};

export default WeeklyForecast;
