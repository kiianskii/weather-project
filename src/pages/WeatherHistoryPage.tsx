import { useState } from "react";
import {
  Container,
  Stack,
  Title,
  Text,
  Card,
  Divider,
  useMantineColorScheme,
} from "@mantine/core";
import { useWeatherStore } from "../store/weatherStore";
import { WeatherHistoryForm } from "../components/widgets/WeatherHistory/WeatherHistoryForm";
import { WeatherHistoryView } from "../components/widgets/WeatherHistory/WeatherHistoryView";
import { WeatherTrendsDashboard } from "../components/widgets/WeatherHistory/WeatherTrends";

export default function WeatherHistoryPage() {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  const { setCity, fetchHistoricalWeatherData } = useWeatherStore();

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (
    city: string,
    startDate: string,
    endDate: string
  ) => {
    try {
      setError(null);
      setCity(city);
      await fetchHistoricalWeatherData(city, startDate, endDate);
    } catch (err: any) {
      setError(err.message || "Failed to fetch historical weather");
    } finally {
    }
  };

  // Спільний стиль для Card з адаптацією під теми
  const cardStyle = {
    background: isDark ? "rgba(30,30,30,0.6)" : "rgba(255, 255, 255, 0.05)",
    border: isDark
      ? "1px solid rgba(255,255,255,0.1)"
      : "1px solid rgba(0, 0, 0, 0.15)",
  };

  return (
    <Container py="xl" maw="100%">
      <Stack gap="md">
        <Title order={2}>Weather History</Title>
        <Text c="dimmed" size="sm">
          Select a city and a date range to view past weather data.
        </Text>

        <Card withBorder my="sm" radius="md" p="md" style={cardStyle}>
          <WeatherHistoryForm onSubmit={handleSubmit} />
        </Card>

        {/* <Divider my="md" /> */}

        {error && (
          <Text c="red" ta="center">
            {error}
          </Text>
        )}

        <Card my="sm" withBorder radius="md" p="md" style={cardStyle}>
          <WeatherHistoryView />
        </Card>

        <Card my="sm" withBorder radius="md" p="md" style={cardStyle}>
          <WeatherTrendsDashboard />
        </Card>
      </Stack>
    </Container>
  );
}
