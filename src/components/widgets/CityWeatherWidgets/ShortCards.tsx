import { Stack, Text, Group, Grid, Card } from "@mantine/core";
import {
  IconWind,
  IconDroplet,
  IconGauge,
  IconCloudRain,
  IconSun,
  IconArrowUp,
} from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";
import { useTranslation } from "react-i18next";

interface WeatherCardProps {
  weather: any;
}

const ShortCards = ({ weather }: WeatherCardProps) => {
  const mobile = useMediaQuery("(max-width: 767px)");
  const { t } = useTranslation();

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

  const getWindDirection = (deg: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const key = directions[Math.round(deg / 45) % 8];
    return t(`windDirections.${key}`);
  };

  const windDeg = weather.hourly.winddirection_10m?.[closestIndex] ?? 0;
  const windDir = getWindDirection(windDeg);

  const cards = [
    {
      label: t("shortCards.wind"),
      icon: <IconWind />,
      value: t("shortCards.windValue", {
        value: weather.current_weather.windspeed,
      }),
      extra: (
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
      ),
    },
    {
      label: t("shortCards.humidity"),
      icon: <IconDroplet />,
      value: t("shortCards.percentValue", {
        value: weather.hourly.relative_humidity_2m?.[closestIndex] ?? 0,
      }),
    },
    {
      label: t("shortCards.pressure"),
      icon: <IconGauge />,
      value: weather.hourly.surface_pressure?.[closestIndex]
        ? t("shortCards.pressureValue", {
            value: weather.hourly.surface_pressure[closestIndex].toFixed(0),
          })
        : "—",
    },
    {
      label: t("shortCards.precipitation"),
      icon:
        weather.hourly.precipitation_probability?.[closestIndex] > 30 ? (
          <IconCloudRain />
        ) : (
          <IconSun />
        ),
      value: t("shortCards.percentValue", {
        value: weather.hourly.precipitation_probability?.[closestIndex] ?? 0,
      }),
    },
  ];

  return (
    <Grid
      gutter={mobile ? "sm" : "md"}
      grow
      mt={mobile ? "sm" : "md"}
      justify="center"
    >
      {cards.map((card, index) => (
        <Grid.Col key={index} span={{ base: 6, sm: 6, md: 3 }}>
          <Card
            shadow="sm"
            p={mobile ? "sm" : "md"}
            radius="md"
            withBorder
            style={{
              height: mobile ? 110 : 120,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-3px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            <Group justify="space-between" align="center" gap="xs">
              <Group gap="xs" align="center">
                {card.icon}
                <Stack gap={2} style={{ minWidth: 60 }}>
                  <Text size={mobile ? "xs" : "sm"}>{card.label}</Text>
                  <Text fw={600} size={mobile ? "sm" : "md"}>
                    {card.value}
                  </Text>
                </Stack>
              </Group>
              {card.extra}
            </Group>
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  );
};

export default ShortCards;
