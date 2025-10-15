import { useEffect, useState } from "react";
import {
  Card,
  Grid,
  Stack,
  Text,
  Loader,
  Group,
  Center,
  Container,
} from "@mantine/core";
import {
  IconSun,
  IconCloud,
  IconCloudRain,
  IconSnowflake,
  IconWind,
  IconDroplet,
  IconTemperature,
} from "@tabler/icons-react";
import axios from "axios";

interface CityWeather {
  city: string;
  temperature: number;
  weathercode: number;
  windspeed: number;
  winddirection: number;
  apparent_temperature: number;
}

const cities = [
  { name: "Kyiv", lat: 50.45, lon: 30.52 },
  { name: "London", lat: 51.51, lon: -0.13 },
  { name: "Tokyo", lat: 35.68, lon: 139.76 },
  { name: "New York", lat: 40.71, lon: -74.01 },
  //   { name: "Paris", lat: 48.85, lon: 2.35 },
];

const getWeatherIcon = (code: number) => {
  if ([0, 1].includes(code)) return <IconSun size={40} color="#facc15" />;
  if ([2, 3].includes(code)) return <IconCloud size={40} color="#94a3b8" />;
  if ([45, 48, 51, 61, 63, 65, 80, 81].includes(code))
    return <IconCloudRain size={40} color="#60a5fa" />;
  if ([71, 73, 75, 77, 85, 86].includes(code))
    return <IconSnowflake size={40} color="#bae6fd" />;
  return <IconCloud size={40} color="#94a3b8" />;
};

export default function GlobalWeatherOverview() {
  const [data, setData] = useState<CityWeather[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const promises = cities.map((c) =>
          axios.get(
            `https://api.open-meteo.com/v1/forecast?latitude=${c.lat}&longitude=${c.lon}&current_weather=true&hourly=apparent_temperature`
          )
        );
        const results = await Promise.all(promises);

        const formatted = results.map((r, i) => ({
          city: cities[i].name,
          temperature: r.data.current_weather.temperature,
          weathercode: r.data.current_weather.weathercode,
          windspeed: r.data.current_weather.windspeed,
          winddirection: r.data.current_weather.winddirection,
          apparent_temperature:
            r.data.hourly.apparent_temperature?.[0] ??
            r.data.current_weather.temperature,
        }));

        setData(formatted);
      } catch (err) {
        console.error("Weather API error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  if (loading)
    return (
      <Center h="80vh">
        <Loader color="blue" size="xl" />
      </Center>
    );

  return (
    <Container fluid p="xl" style={{ minHeight: "100vh" }}>
      <Grid gutter="xl" align="stretch">
        {data.map((d) => (
          <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 3 }} key={d.city}>
            <Card
              shadow="md"
              radius="lg"
              p="xl"
              style={{
                background: "linear-gradient(135deg, #a8c0ff 0%, #d6baff 100%)",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                cursor: "pointer",
              }}
              onClick={() => (window.location.href = `/city/${d.city}`)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.03)";
                e.currentTarget.style.boxShadow =
                  "0 10px 20px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <Stack align="center" gap="sm">
                <Text fw={700} size="xl" tt="uppercase">
                  {d.city}
                </Text>

                {getWeatherIcon(d.weathercode)}

                <Text size="2rem" fw={700}>
                  {Math.round(d.temperature)}°C
                </Text>

                <Group justify="center" gap="md" mt="sm">
                  <Group gap={4}>
                    <IconTemperature size={20} />
                    <Text size="sm">
                      Feels {Math.round(d.apparent_temperature)}°C
                    </Text>
                  </Group>
                  <Group gap={4}>
                    <IconWind size={20} />
                    <Text size="sm">{d.windspeed} km/h</Text>
                  </Group>
                </Group>

                <Group justify="center" gap="xs" mt="xs">
                  <IconDroplet size={18} />
                  <Text size="sm" c="dimmed">
                    Direction: {Math.round(d.winddirection)}°
                  </Text>
                </Group>
              </Stack>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}
