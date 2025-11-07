import { useState, useEffect } from "react";
import {
  Container,
  Stack,
  Title,
  Text,
  Card,
  useMantineColorScheme,
  Center,
  Loader,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconAlertCircle } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";

import { useWeatherStore } from "../store/weatherStore";
import { WeatherHistoryForm } from "../components/widgets/WeatherHistory/WeatherHistoryForm";
import { WeatherHistoryView } from "../components/widgets/WeatherHistory/WeatherHistoryView";
import { WeatherTrendsDashboard } from "../components/widgets/WeatherHistory/WeatherTrends";
import WeatherPlaceholder from "../components/utils/WeatherPlaceholder";

export default function WeatherHistoryPage() {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";
  const mobile = useMediaQuery("(max-width: 767px)");

  const {
    setHistoryCity,
    fetchHistoricalWeatherData,
    history,
    historyError,
    clearHistoryError,
  } = useWeatherStore();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    city: string,
    startDate: string,
    endDate: string
  ) => {
    setLoading(true);
    try {
      setHistoryCity(city);
      await fetchHistoricalWeatherData(city, startDate, endDate);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (historyError) {
      notifications.show({
        id: "history-error",
        title: "Historical weather request failed",
        color: "red",
        icon: <IconAlertCircle size={20} />,
        message:
          historyError === "City not found" ? (
            <div style={{ lineHeight: 1.5 }}>
              <span>
                No matching results. Try another spelling or date range and
                check for <strong>typos</strong>.
              </span>
              <br />
              <span>
                Make sure the city name is written in{" "}
                <strong>English letters</strong>.
              </span>
            </div>
          ) : (
            historyError
          ),
        autoClose: 5000,
        radius: "md",
        withBorder: true,
        style: {
          maxWidth: 420,
          whiteSpace: "normal",
          lineHeight: 1.5,
        },
      });

      clearHistoryError();
    }
  }, [historyError, clearHistoryError]);

  const cardStyle = {
    border: isDark
      ? "1px solid rgba(140, 140, 140, 0.69)"
      : "1px solid rgba(0, 0, 0, 0.1)",
    background: isDark ? "rgba(255,255,255,0.03)" : "#fff",
    transition: "background 0.3s ease, border 0.3s ease, transform 0.2s ease",
  };

  return (
    <Container
      py={mobile ? "md" : "xl"}
      px={mobile ? "xs" : "md"}
      maw="100%"
      style={{ maxWidth: mobile ? "100%" : 960 }}
    >
      <Stack gap={mobile ? "sm" : "md"}>
        <Title order={mobile ? 3 : 2} ta={mobile ? "center" : "left"}>
          Weather History
        </Title>

        <Text
          c="dimmed"
          size={mobile ? "xs" : "sm"}
          ta={mobile ? "center" : "left"}
        >
          Select a city and a date range to view past weather data.
        </Text>

        <Card
          withBorder
          my={mobile ? "xs" : "sm"}
          radius={mobile ? "sm" : "md"}
          p={mobile ? "sm" : "md"}
          style={cardStyle}
        >
          <WeatherHistoryForm onSubmit={handleSubmit} />
        </Card>

        {history ? (
          <>
            <Card
              my={mobile ? "xs" : "sm"}
              withBorder
              radius={mobile ? "sm" : "md"}
              p={mobile ? "sm" : "md"}
              style={cardStyle}
            >
              <WeatherHistoryView />
            </Card>

            <Card
              my={mobile ? "xs" : "sm"}
              withBorder
              radius={mobile ? "sm" : "md"}
              p={mobile ? "sm" : "md"}
              style={cardStyle}
            >
              <WeatherTrendsDashboard />
            </Card>
          </>
        ) : loading ? (
          <Center h="40vh">
            <Loader size={mobile ? "lg" : "xl"} />
          </Center>
        ) : (
          <WeatherPlaceholder
            title="No data yet"
            description="Please select a city and date range to begin exploring historical weather data."
          />
        )}
      </Stack>
    </Container>
  );
}
