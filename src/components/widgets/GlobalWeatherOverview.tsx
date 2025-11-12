import { useEffect, useState } from "react";
import {
  Grid,
  Center,
  Loader,
  Container,
  Title,
  Divider,
  Group,
  Text,
  Box,
  useMantineColorScheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import GlobalWeatherCard from "./cards/GlobalWeatherCard";
import { fetchWeather } from "../../api/weatherApi";

interface CityWeatherAPI {
  current_weather: {
    temperature: number;
    weathercode: number;
    windspeed: number;
    winddirection: number;
    time: string;
  };
  hourly: {
    time: string[];
    temperature_2m?: number[];
    relative_humidity_2m?: number[];
    cloudcover?: number[];
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
    precipitation_probability_max: number[];
  };
  city: string;
}

const cities = [
  { name: "Kyiv", lat: 50.45, lon: 30.52 },
  { name: "London", lat: 51.51, lon: -0.13 },
  { name: "Tokyo", lat: 35.68, lon: 139.76 },
  { name: "New York", lat: 40.71, lon: -74.01 },
];

export default function GlobalWeatherOverview() {
  const [data, setData] = useState<CityWeatherAPI[]>([]);
  const [loading, setLoading] = useState(true);

  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  const mobile = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const promises = cities.map((c) => fetchWeather(c.lat, c.lon));
        const results = await Promise.all(promises);

        const formatted = results.map((r, i) => ({
          current_weather: r.current_weather,
          hourly: r.hourly,
          daily: r.daily,
          city: cities[i].name,
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
        <Loader size="lg" />
      </Center>
    );

  return (
    <Container
      fluid
      px={mobile ? "sm" : "xl"}
      py={mobile ? "md" : "xl"}
      style={{
        minHeight: "100%",
        transition: "background 0.3s ease",
        marginInline: 0,
      }}
    >
      <Box mb={mobile ? "md" : "xl"}>
        <Group justify="space-between" align="center">
          <Box>
            <Title
              order={mobile ? 3 : 2}
              style={{
                letterSpacing: "-0.02em",
                fontWeight: 700,
              }}
            >
              Global Weather Overview 🌍
            </Title>
            <Text
              size="sm"
              c="dimmed"
              mt={4}
              style={{ maxWidth: 480, lineHeight: 1.4 }}
            >
              Stay informed with real-time weather updates for major cities
              around the world.
            </Text>
          </Box>
        </Group>

        <Divider
          my={mobile ? "md" : "lg"}
          variant="dashed"
          color={isDark ? "gray.7" : "gray.3"}
        />
      </Box>
      <Grid gutter="lg" justify="center">
        {data.map((weather) => (
          <Grid.Col span={{ base: 12, md: 6 }} key={weather.city}>
            <GlobalWeatherCard weather={weather} />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}
