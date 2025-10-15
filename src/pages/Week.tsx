import WeeklyForecast from "../components/widgets/WeeklyForecast";
import { Stack, Text } from "@mantine/core";
import { useWeatherStore } from "../store/weatherStore";

const Week = () => {
  const { weather, loading, error } = useWeatherStore();

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text c="red">{error}</Text>;
  if (!weather?.daily) return null;

  return (
    <Stack p="md">
      <WeeklyForecast daily={weather.daily} city={weather.city} />
    </Stack>
  );
};

export default Week;
