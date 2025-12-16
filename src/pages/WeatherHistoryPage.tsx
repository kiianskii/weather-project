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
import { useTranslation } from "react-i18next";

import { useWeatherStore } from "../store/weatherStore";
import { WeatherHistoryForm } from "../components/widgets/WeatherHistory/WeatherHistoryForm";
import { WeatherHistoryView } from "../components/widgets/WeatherHistory/WeatherHistoryView";
import { WeatherTrendsDashboard } from "../components/widgets/WeatherHistory/WeatherTrends";
import WeatherPlaceholder from "../components/utils/WeatherPlaceholder";

export default function WeatherHistoryPage() {
  const { t } = useTranslation();
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
        title: t("history.errorTitle"),
        color: "red",
        icon: <IconAlertCircle size={20} />,
        message:
          historyError === "City not found" ? (
            <div style={{ lineHeight: 1.5 }}>
              <span>{t("history.errorCityNotFound1")}</span>
              <br />
              <span>{t("history.errorCityNotFound2")}</span>
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
  }, [historyError, clearHistoryError, t]);

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
      style={{ marginInline: 0 }}
    >
      <Stack gap={mobile ? "sm" : "md"}>
        <Title order={mobile ? 3 : 2} ta={mobile ? "center" : "left"}>
          {t("history.pageTitle")}
        </Title>

        <Text
          c="dimmed"
          size={mobile ? "xs" : "sm"}
          ta={mobile ? "center" : "left"}
        >
          {t("history.pageDescription")}
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
            <Loader size="lg" />
          </Center>
        ) : (
          <WeatherPlaceholder
            title={t("history.placeholderTitle")}
            description={t("history.placeholderDescription")}
          />
        )}
      </Stack>
    </Container>
  );
}
