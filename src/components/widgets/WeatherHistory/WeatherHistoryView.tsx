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
import { useTranslation } from "react-i18next";

const getDayName = (dateStr: string, locale: string) => {
  const date = new Date(dateStr);

  if (locale.startsWith("uk")) {
    const dayName = new Intl.DateTimeFormat("uk", { weekday: "long" }).format(
      date
    );
    return dayName.charAt(0).toUpperCase() + dayName.slice(1);
  }

  const dayName = new Intl.DateTimeFormat(locale, { weekday: "long" }).format(
    date
  );
  return dayName.charAt(0).toUpperCase() + dayName.slice(1);
};

export function WeatherHistoryView() {
  const { t, i18n } = useTranslation();
  const locale = i18n.language || "en";
  const { history, loadingHistory, historyCity, historyCountry } =
    useWeatherStore();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  const location = [
    historyCountry?.country,
    historyCountry?.relativity1,
    historyCountry?.relativity2,
  ]
    .filter(Boolean)
    .join(", ");

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

  if (loadingHistory) {
    return (
      <Center style={{ minHeight: 200 }}>
        <Loader size="lg" />
      </Center>
    );
  }

  if (!history?.daily?.time?.length) {
    return (
      <Text c="dimmed" ta="center" mt="md">
        {historyCity
          ? t("history.noDataForDates")
          : t("history.selectCityAndDates")}
      </Text>
    );
  }

  const maxHeight = cardHeight > 0 ? rowsVisible * (cardHeight + rowGap) : 300;

  return (
    <Stack gap="lg">
      <Text fw={600} size="lg" ta="center">
        {historyCity
          ? t("history.historicalWeatherFor", { city: historyCity, location })
          : t("history.historicalWeather")}
      </Text>

      <Spoiler
        maxHeight={maxHeight}
        showLabel={t("history.showMore")}
        hideLabel={t("history.hide")}
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

            const formattedDate = `${getDayName(date, locale)}, ${new Date(
              date
            ).toLocaleDateString(locale, {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}`;

            return (
              <Grid.Col key={date} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
                <Card
                  ref={i === 0 ? cardRef : null}
                  withBorder
                  radius="lg"
                  p="lg"
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    background: isDark
                      ? "rgba(30,30,30,0.6)"
                      : "rgba(255,255,255,0.05)",
                    border: isDark
                      ? "1px solid rgba(255,255,255,0.1)"
                      : "1px solid rgba(0,0,0,0.15)",
                  }}
                >
                  <Stack align="center" gap="sm">
                    <Text
                      fw={600}
                      size="sm"
                      style={{ opacity: isDark ? 0.9 : 0.8 }}
                    >
                      {formattedDate}
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
                        {t("history.min")}
                      </Text>
                      <Text fw={500}>{minTemp.toFixed(1)}°C</Text>
                    </Box>

                    <Box ta="center">
                      <Text size="xs" c="dimmed">
                        {t("history.max")}
                      </Text>
                      <Text fw={500}>{maxTemp.toFixed(1)}°C</Text>
                    </Box>

                    <Box ta="center">
                      <Text size="xs" c="dimmed">
                        {t("history.rain")}
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
