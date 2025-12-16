import { Card, Stack, Text, Group, useMantineColorScheme } from "@mantine/core";
import {
  IconSun,
  IconCloud,
  IconCloudRain,
  IconWind,
  IconDroplet,
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

interface WeatherPlaceholderProps {
  title: string;
  description: string;
}

const WeatherPlaceholder = ({
  title,
  description,
}: WeatherPlaceholderProps) => {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  const cardStyle = {
    minHeight: 300,
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    border: isDark
      ? "1px solid rgba(255, 255, 255, 0.1)"
      : "1px solid rgba(0,0,0,0.1)",
    background: isDark ? "rgba(255,255,255,0.04)" : "rgba(255, 255, 255, 0.5)",
    backdropFilter: "blur(8px)",
    transition: "background 0.3s ease, border 0.3s ease",
  };

  const { t } = useTranslation();
  const textColor = isDark ? "#f1f1f1" : "#1a1a1a";
  const dimmedColor = isDark ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.55)";

  return (
    <Card p="xl" style={cardStyle} withBorder>
      <Stack
        gap="md"
        p="lg"
        style={{
          textAlign: "center",
          borderRadius: "1rem",
        }}
      >
        <Text size="lg" fw={700} style={{ color: textColor }}>
          {title}
        </Text>

        <Text
          size="sm"
          style={{ color: dimmedColor, maxWidth: 320, margin: "0 auto" }}
        >
          {description}
        </Text>

        <Group gap="xl" mt="md" justify="center">
          <Stack gap={4} align="center">
            <IconSun size={32} color="#FFD93D" />
            <Text size="xs" c="dimmed">
              {t("weatherConditions.sunny")}
            </Text>
          </Stack>

          <Stack gap={4} align="center">
            <IconCloud size={32} color="#90A4AE" />
            <Text size="xs" c="dimmed">
              {t("weatherConditions.cloudy")}
            </Text>
          </Stack>

          <Stack gap={4} align="center">
            <IconCloudRain size={32} color="#4FC3F7" />
            <Text size="xs" c="dimmed">
              {t("weatherConditions.rainy")}
            </Text>
          </Stack>

          <Stack gap={4} align="center">
            <IconWind size={32} color="#81D4FA" />
            <Text size="xs" c="dimmed">
              {t("weatherConditions.wind")}
            </Text>
          </Stack>

          <Stack gap={4} align="center">
            <IconDroplet size={32} color="#29B6F6" />
            <Text size="xs" c="dimmed">
              {t("weatherConditions.humidity")}
            </Text>
          </Stack>
        </Group>
      </Stack>
    </Card>
  );
};

export default WeatherPlaceholder;
