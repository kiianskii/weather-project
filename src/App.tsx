import { useEffect } from "react";
import { Container, Title, Loader, Card, Text } from "@mantine/core";
import { useWeatherStore } from "./store/weatherStore";
import { fetchWeather } from "./api/weatherApi";

function App() {
  const { city, lat, lon, current, setWeather } = useWeatherStore();

  useEffect(() => {
    fetchWeather(lat, lon).then((data) => {
      setWeather(data.current_weather);
    });
  }, [lat, lon, setWeather]);

  return (
    <Container p="md">
      <Title order={2} style={{ textAlign: "center" }} mb="lg">
        Weather in {city}
      </Title>
      {!current ? (
        <Loader />
      ) : (
        <Card shadow="md" p="lg" radius="md" withBorder>
          <Text>🌡 Temperature: {current.temperature}°C</Text>
          <Text>💨 Wind: {current.windspeed} km/h</Text>
          <Text>🕒 Time: {new Date(current.time).toLocaleTimeString()}</Text>
        </Card>
      )}
    </Container>
  );
}

export default App;
