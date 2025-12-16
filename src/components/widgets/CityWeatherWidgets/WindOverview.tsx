import React from "react";
import {
  Card,
  Text,
  useMantineColorScheme,
  Stack,
  Group,
  Box,
} from "@mantine/core";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { IconArrowUp } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

interface WindOverviewProps {
  weather: any;
}

interface WindDataPoint {
  hour: string;
  speed: number;
  direction: number;
}

const getWindDirectionLabel = (deg: number, t: any) => {
  const directions = [
    t("windDirections.n"),
    t("windDirections.ne"),
    t("windDirections.e"),
    t("windDirections.se"),
    t("windDirections.s"),
    t("windDirections.sw"),
    t("windDirections.w"),
    t("windDirections.nw"),
  ];
  const index = Math.round(deg / 45) % 8;
  return directions[index];
};

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: any[];
  label?: string;
}) => {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";
  const { t } = useTranslation();

  if (active && payload && payload.length > 0) {
    const entry = payload[0].payload as WindDataPoint;

    return (
      <Box
        p={8}
        style={{
          background: isDark ? "rgba(40,40,50,0.9)" : "rgba(255,255,255,0.95)",
          borderRadius: "8px",
          border: isDark
            ? "1px solid rgba(255,255,255,0.1)"
            : "1px solid rgba(0,0,0,0.15)",
        }}
      >
        <Text fw={600}>{label}</Text>
        <Text>
          {t("wind.speed")}: {entry.speed.toFixed(1)} {t("units.kmh")}
        </Text>
        <Group gap={4}>
          <Text>
            {t("wind.direction")}: {getWindDirectionLabel(entry.direction, t)}
          </Text>
          <IconArrowUp
            size={20}
            style={{
              transform: `rotate(${entry.direction}deg)`,
              color: "#b197fc",
            }}
          />
        </Group>
      </Box>
    );
  }
  return null;
};

const WindOverview: React.FC<WindOverviewProps> = ({ weather }) => {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";
  const { t } = useTranslation();

  const data: WindDataPoint[] = [];

  (weather?.hourly?.time ?? []).forEach((tStr: string, i: number) => {
    const date = new Date(tStr);
    const hourStr = `${date.getHours()}:00`;

    if (!data.some((d) => d.hour === hourStr)) {
      data.push({
        hour: hourStr,
        speed: weather.hourly.windspeed_10m?.[i] ?? 0,
        direction: weather.hourly.winddirection_10m?.[i] ?? 0,
      });
    }
  });

  return (
    <Card
      radius="md"
      shadow="sm"
      p="md"
      style={{
        width: "100%",
        background: isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.8)",
        backdropFilter: "blur(8px)",
        border: isDark
          ? "1px solid rgba(255,255,255,0.15)"
          : "1px solid rgba(0,0,0,0.1)",
      }}
    >
      <Stack gap="xs">
        <Group justify="space-between">
          <Text fw={600} size="sm">
            {t("wind.title")}
          </Text>
          <Text size="xs" c="dimmed">
            {t("wind.subtitle")}
          </Text>
        </Group>

        <Box style={{ width: "100%", height: 260 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, bottom: 40 }}>
              <XAxis
                dataKey="hour"
                tick={{ fontSize: 10, fill: isDark ? "#ddd" : "#333" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[0, "dataMax + 5"]}
                tick={{ fontSize: 10, fill: isDark ? "#ddd" : "#333" }}
                axisLine={false}
                tickLine={false}
                unit={` ${t("units.kmh")}`}
              />
              <Tooltip content={<CustomTooltip />} />

              <Bar dataKey="speed" radius={[6, 6, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={`hsl(${270 + entry.speed}, 70%, ${
                      isDark ? "65%" : "55%"
                    })`}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Stack>
    </Card>
  );
};

export default WindOverview;
