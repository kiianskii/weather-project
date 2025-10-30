import {
  Card,
  Text,
  Loader,
  Center,
  Stack,
  Grid,
  Group,
  Box,
  Spoiler,
  useMantineColorScheme,
} from "@mantine/core";
import { useWeatherStore } from "../../../store/weatherStore";
import { IconSun, IconCloud, IconCloudRain } from "@tabler/icons-react";
import { useRef, useState, useEffect } from "react";

export function WeatherHistoryView() {
  const { history, loading, city } = useWeatherStore();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  const cardRef = useRef<HTMLDivElement | null>(null);
  const [cardHeight, setCardHeight] = useState<number>(0);
  const [rowsVisible] = useState<number>(2);
  const rowGap = 16;

  useEffect(() => {
    if (cardRef.current) {
      const height = cardRef.current.getBoundingClientRect().height;
      setCardHeight(height);
    }
  }, [history]);

  if (loading) {
    return (
      <Center style={{ minHeight: 200 }}>
        <Loader size="lg" />
      </Center>
    );
  }

  if (!history?.daily?.time?.length) {
    return (
      <Text c="dimmed" ta="center" mt="md">
        {city
          ? "No historical data available for the selected dates."
          : "Please select a city and date range."}
      </Text>
    );
  }

  const maxHeight = cardHeight > 0 ? rowsVisible * (cardHeight + rowGap) : 300;

  return (
    <Stack gap="lg">
      <Text fw={600} size="lg" ta="center">
        {city ? `Historical Weather for ${city}` : "Historical Weather"}
      </Text>

      <Spoiler
        maxHeight={maxHeight}
        showLabel="Show more"
        hideLabel="Hide"
        transitionDuration={400}
      >
        <Grid gutter="md" align="stretch" justify="center">
          {history.daily.time.map((date: string, i: number) => {
            const minTemp = history.daily.temperature_2m_min[i];
            const maxTemp = history.daily.temperature_2m_max[i];
            const precipitation = history.daily.precipitation_sum[i];

            let WeatherIcon =
              precipitation > 0
                ? IconCloudRain
                : maxTemp > 20
                ? IconSun
                : IconCloud;

            return (
              <Grid.Col key={date} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
                <Card
                  ref={i === 0 ? cardRef : null} // міряємо лише першу картку
                  withBorder
                  radius="lg"
                  p="lg"
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    border: isDark
                      ? "1px solid rgba(140, 140, 140, 0.69)"
                      : "1px solid rgba(0, 0, 0, 0.1)",
                    background: isDark ? "rgba(255,255,255,0.03)" : "#fff",
                  }}
                >
                  <Stack align="center" gap="sm">
                    <Text
                      fw={600}
                      size="sm"
                      style={{ opacity: isDark ? 0.9 : 0.8 }}
                    >
                      {new Date(date).toLocaleDateString("en-US", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </Text>
                    <WeatherIcon
                      size={36}
                      style={{ opacity: isDark ? 0.8 : 0.7 }}
                    />
                  </Stack>

                  <Group
                    justify="space-around"
                    align="center"
                    mt="md"
                    style={{
                      borderTop: isDark
                        ? "1px solid rgba(255,255,255,0.1)"
                        : "1px solid rgba(0,0,0,0.1)",
                      paddingTop: "0.5rem",
                    }}
                  >
                    <Box ta="center">
                      <Text size="xs" c="dimmed">
                        Min
                      </Text>
                      <Text fw={500}>{minTemp.toFixed(1)}°C</Text>
                    </Box>

                    <Box ta="center">
                      <Text size="xs" c="dimmed">
                        Max
                      </Text>
                      <Text fw={500}>{maxTemp.toFixed(1)}°C</Text>
                    </Box>

                    <Box ta="center">
                      <Text size="xs" c="dimmed">
                        Rain
                      </Text>
                      <Text fw={500}>{precipitation.toFixed(1)} mm</Text>
                    </Box>
                  </Group>
                </Card>
              </Grid.Col>
            );
          })}
        </Grid>
      </Spoiler>
    </Stack>
  );
}
