import { useState } from "react";
import { Container, Stack, Title, Text, Card, Divider } from "@mantine/core";
import { useWeatherStore } from "../store/weatherStore";
import { WeatherHistoryForm } from "../components/widgets/WeatherHistory/WeatherHistoryForm";
import { WeatherHistoryView } from "../components/widgets/WeatherHistory/WeatherHistoryView";
import { WeatherTrendsDashboard } from "../components/widgets/WeatherHistory/WeatherTrends";

export default function WeatherHistoryPage() {
  const {
    city: storedCity,
    setCity,
    fetchHistoricalWeatherData,
  } = useWeatherStore();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<[string | null, string | null]>([
    null,
    null,
  ]);

  const handleSubmit = async (
    city: string,
    startDate: string,
    endDate: string
  ) => {
    try {
      setLoading(true);
      setError(null);
      setCity(city);
      setDateRange([startDate, endDate]);

      await fetchHistoricalWeatherData(city, startDate, endDate);
    } catch (err: any) {
      setError(err.message || "Failed to fetch historical weather");
    } finally {
      setLoading(false);
    }
  };

  const isReady =
    storedCity && dateRange[0] !== null && dateRange[1] !== null && !loading;

  return (
    <Container py="xl" maw="100%">
      <Stack gap="md">
        <Title order={2}>Weather History</Title>
        <Text c="dimmed" size="sm">
          Select a city and a date range to view past weather data.
        </Text>

        <Card
          withBorder
          radius="md"
          p="md"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <WeatherHistoryForm onSubmit={handleSubmit} />
        </Card>

        <Divider my="md" />

        {error && (
          <Text c="red" ta="center">
            {error}
          </Text>
        )}

        <Card
          withBorder
          radius="md"
          p="md"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <WeatherHistoryView />
        </Card>
        <WeatherTrendsDashboard />
      </Stack>
    </Container>
  );
}
