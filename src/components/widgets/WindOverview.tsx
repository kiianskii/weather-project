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
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";
import { IconArrowUp } from "@tabler/icons-react";

interface WindOverviewProps {
  weather: any;
}

interface WindDataPoint {
  hour: string; // "08:00"
  speed: number;
  direction: number;
}

const getWindDirectionLabel = (deg: number) => {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
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
  if (active && payload && payload.length > 0) {
    const entry = payload[0].payload as WindDataPoint;
    return (
      <Box
        p={8}
        style={{
          background: "rgba(0,0,0,0.75)",
          color: "#fff",
          borderRadius: 8,
          fontSize: 12,
          minWidth: 100,
        }}
      >
        <Text fw={600}>{label}</Text>
        <Text>Speed: {entry.speed.toFixed(1)} km/h</Text>
        <Group gap={4}>
          <Text>Direction: {getWindDirectionLabel(entry.direction)}</Text>
          <IconArrowUp
            size={12}
            style={{
              transform: `rotate(${entry.direction}deg)`,
              color: "#74c0fc",
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

  // Формуємо дані по цілих годинах
  const data: WindDataPoint[] = [];
  (weather?.hourly?.time ?? []).forEach((t: string, i: number) => {
    const date = new Date(t);
    const hourStr = `${date.getHours()}:00`;
    // Перевіряємо, чи вже є така година
    if (!data.some((d) => d.hour === hourStr)) {
      data.push({
        hour: hourStr,
        speed: weather.hourly.windspeed_10m[i] ?? 0,
        direction: weather.hourly.winddirection_10m[i] ?? 0,
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
            Wind Overview (24h)
          </Text>
          <Text size="xs" c="dimmed">
            Speed & direction per hour
          </Text>
        </Group>

        <Box style={{ width: "100%", height: 250 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
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
                unit=" km/h"
              />
              <Tooltip content={<CustomTooltip />} />

              <Line
                type="monotone"
                dataKey="speed"
                stroke={isDark ? "#74c0fc" : "#1c7ed6"}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Stack>
    </Card>
  );
};

export default WindOverview;
