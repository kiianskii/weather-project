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

interface WindOverviewProps {
  weather: any;
}

interface WindDataPoint {
  hour: string;
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
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";
  if (active && payload && payload.length > 0) {
    const entry = payload[0].payload as WindDataPoint;
    return (
      <Box
        p={8}
        style={{
          background: isDark ? "rgba(40,40,50,0.9)" : "rgba(255,255,255,0.95)",
          borderRadius: "8px",
          border: "1px solid rgba(0,0,0,0.1)",
        }}
      >
        <Text fw={600}>{label}</Text>
        <Text>Speed: {entry.speed.toFixed(1)} km/h</Text>
        <Group gap={4}>
          <Text>Dir: {getWindDirectionLabel(entry.direction)}</Text>
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

  const data: WindDataPoint[] = [];
  (weather?.hourly?.time ?? []).forEach((t: string, i: number) => {
    const date = new Date(t);
    const hourStr = `${date.getHours()}:00`;
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
            Wind Flow (24h)
          </Text>
          <Text size="xs" c="dimmed">
            Speed & direction
          </Text>
        </Group>

        <Box style={{ width: "100%", height: 260, position: "relative" }}>
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
                unit=" km/h"
              />
              <Tooltip content={<CustomTooltip />} />

              <Bar
                dataKey="speed"
                radius={[6, 6, 0, 0]}
                animationDuration={700}
                animationBegin={200}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
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
