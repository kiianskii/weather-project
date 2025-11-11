import { useEffect } from "react";
import { notifications } from "@mantine/notifications";
import { IconAlertCircle } from "@tabler/icons-react";
import { useMantineColorScheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export const useWeatherNotifications = (
  weatherError: string | null,
  clearWeatherError: () => void
) => {
  const { colorScheme } = useMantineColorScheme();
  const mobile = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    if (!weatherError) return;

    notifications.clean();
    notifications.show({
      id: "weather-error",
      color: "red",
      title: "Weather request failed",
      icon: <IconAlertCircle size={20} />,
      autoClose: 8000,
      withCloseButton: true,
      message:
        weatherError === "City not found" ? (
          <div style={{ lineHeight: 1.5 }}>
            <span>
              No results found. Please check for <strong>typos</strong> or try a
              different <strong>spelling</strong>.
            </span>
            <br />
            <span>
              Ensure the city name is written in{" "}
              <strong>English letters</strong>.
            </span>
          </div>
        ) : (
          weatherError
        ),
      styles: (theme) => ({
        root: {
          maxWidth: mobile ? 340 : 440,
          padding: "16px 18px",
          borderRadius: theme.radius.md,
          backgroundColor:
            colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.red[0],
          border: `1px solid ${
            colorScheme === "dark" ? theme.colors.red[7] : theme.colors.red[4]
          }`,
        },
        title: { fontWeight: 700, marginBottom: 6 },
        description: { fontSize: theme.fontSizes.sm },
        icon: { marginTop: 4 },
        position: "fixed",
        top: 20,
        right: 20,
        zIndex: 2077,
      }),
    });

    clearWeatherError();
  }, [weatherError, clearWeatherError, colorScheme]);
};
