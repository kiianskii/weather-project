import { Card, Stack, Text, Group } from "@mantine/core";
import {
  IconSun,
  IconCloud,
  IconCloudRain,
  IconWind,
  IconDroplet,
} from "@tabler/icons-react";

const WeatherPlaceholder = () => {
  return (
    <Card
      p="xl"
      style={{
        minHeight: 300,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16,
      }}
    >
      <Stack
        gap="md"
        p="lg"
        style={{
          //   background: "#f5f5f5",
          textAlign: "center",
          borderRadius: "1rem",
        }}
      >
        <Text size="2xl" fw={700}>
          Weather Forecast
        </Text>
        <Text size="md" color="dimmed" style={{ maxWidth: 320 }}>
          Enter a city name in the search bar above to see detailed weather
          information.
        </Text>

        {/* Іконки */}
        <Group gap="xl" style={{ marginTop: 16, justifyContent: "center" }}>
          <Stack gap="xs" style={{ textAlign: "center" }}>
            <IconSun size={36} color="#FFD93D" />
            <Text size="sm">Sunny</Text>
          </Stack>
          <Stack gap="xs" style={{ textAlign: "center" }}>
            <IconCloud size={36} color="#90A4AE" />
            <Text size="sm">Cloudy</Text>
          </Stack>
          <Stack gap="xs" style={{ textAlign: "center" }}>
            <IconCloudRain size={36} color="#4FC3F7" />
            <Text size="sm">Rainy</Text>
          </Stack>
          <Stack gap="xs" style={{ textAlign: "center" }}>
            <IconWind size={36} color="#81D4FA" />
            <Text size="sm">Wind</Text>
          </Stack>
          <Stack gap="xs" style={{ textAlign: "center" }}>
            <IconDroplet size={36} color="#29B6F6" />
            <Text size="sm">Humidity</Text>
          </Stack>
        </Group>
      </Stack>
    </Card>
  );
};

export default WeatherPlaceholder;
