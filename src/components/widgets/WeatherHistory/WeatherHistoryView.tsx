import {
  Card,
  Text,
  Loader,
  Center,
  Stack,
  Badge,
  Grid,
  ThemeIcon,
} from "@mantine/core";
import { IconSun, IconCloud, IconCloudRain } from "@tabler/icons-react";
import { useWeatherStore } from "../../../store/weatherStore";

export function WeatherHistoryView() {
  const { history, loading, city } = useWeatherStore();

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

  return (
    <Stack gap="md">
      <Text fw={600} size="lg">
        {city ? `Historical Weather for ${city}` : "Historical Weather"}
      </Text>
      <Grid>
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
                shadow="sm"
                radius="md"
                p="md"
                style={{ textAlign: "center" }}
              >
                <Text fw={600}>{date}</Text>
                <ThemeIcon
                  variant="light"
                  size={60}
                  radius="xl"
                  style={{ margin: "10px auto" }}
                >
                  <WeatherIcon size={36} />
                </ThemeIcon>
                <Text>
                  <Badge color="blue" variant="light">
                    Min: {minTemp}°C
                  </Badge>{" "}
                  <Badge color="red" variant="light">
                    Max: {maxTemp}°C
                  </Badge>
                </Text>
                <Text mt={5} c="dimmed">
                  {precipitation} mm precipitation
                </Text>
              </Card>
            </Grid.Col>
          );
        })}
      </Grid>
    </Stack>
  );
}
