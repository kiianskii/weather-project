import {
  Card,
  Text,
  Stack,
  SegmentedControl,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useState } from "react";
import { useWeatherStore } from "../../../store/weatherStore";

interface DailyWeather {
  time: string[];
  temperature_2m_min: number[];
  temperature_2m_max: number[];
  temperature_2m_mean: number[];
  precipitation_sum: number[];
  sunshine_duration?: number[];
}

interface WeatherHistory {
  daily: DailyWeather;
  city?: string;
}

export function WeatherTrendsDashboard() {
  const { history, historyCity } = useWeatherStore() as {
    history: WeatherHistory | null;
    historyCity?: string;
  };
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  const [active, setActive] = useState<
    "temperature" | "precipitation" | "sunshine"
  >("temperature");

  if (!history?.daily?.time?.length) return null;

  const { daily } = history;

  const dates = daily.time.map((d) =>
    new Date(d).toLocaleDateString("en-US", { day: "numeric", month: "short" })
  );

  const tempData = daily.time.map((_, i) => ({
    date: dates[i],
    min: daily.temperature_2m_min[i],
    max: daily.temperature_2m_max[i],
    mean: daily.temperature_2m_mean[i],
  }));

  const precipitationData = daily.time.map((_, i) => ({
    date: dates[i],
    precipitation: daily.precipitation_sum[i],
  }));

  const sunshineData = daily.time.map((_, i) => ({
    date: dates[i],
    sunshine:
      daily.sunshine_duration?.[i] != null
        ? +(daily.sunshine_duration[i] / 3600).toFixed(1)
        : 0,
  }));

  const axisColor = isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.7)";
  const gridColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const tooltipBg = isDark ? "rgba(30,30,30,0.8)" : "#fff";
  const tooltipLabel = isDark ? "#fff" : "#000";

  const cardStyle = {
    backdropFilter: "blur(4px)",
    background: isDark ? "rgba(30,30,30,0.6)" : "rgba(255,255,255,0.05)",
    border: isDark
      ? "1px solid rgba(255,255,255,0.1)"
      : "1px solid rgba(0,0,0,0.15)",
  };

  return (
    <Stack gap="lg">
      <Text fw={600} size="lg" ta="center">
        {historyCity ? `Weather Trends for ${historyCity}` : "Weather Trends"}
      </Text>

      <SegmentedControl
        value={active}
        onChange={(val) => setActive(val as typeof active)}
        data={[
          { label: "Temperature", value: "temperature" },
          { label: "Precipitation", value: "precipitation" },
          { label: "Sunshine", value: "sunshine" },
        ]}
        fullWidth
        radius="xl"
      />

      <Card withBorder radius="lg" p="lg" style={cardStyle}>
        {active === "temperature" && (
          <>
            <Text fw={500} mb="sm">
              Temperature (°C)
            </Text>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart
                data={tempData}
                margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
              >
                <CartesianGrid stroke={gridColor} vertical={false} />
                <XAxis dataKey="date" stroke={axisColor} tickLine={false} />
                <YAxis stroke={axisColor} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: tooltipBg, borderRadius: 8 }}
                  labelStyle={{ color: tooltipLabel }}
                />
                <Line
                  type="monotone"
                  dataKey="min"
                  stroke={theme.colors.blue[5]}
                  name="Min"
                />
                <Line
                  type="monotone"
                  dataKey="mean"
                  stroke={theme.colors.red[5]}
                  name="Mean"
                />
                <Line
                  type="monotone"
                  dataKey="max"
                  stroke={theme.colors.orange[5]}
                  name="Max"
                />
              </LineChart>
            </ResponsiveContainer>
          </>
        )}

        {active === "precipitation" && (
          <>
            <Text fw={500} mb="sm">
              Precipitation (mm)
            </Text>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={precipitationData}
                margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
              >
                <CartesianGrid stroke={gridColor} vertical={false} />
                <XAxis dataKey="date" stroke={axisColor} tickLine={false} />
                <YAxis stroke={axisColor} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: tooltipBg, borderRadius: 8 }}
                  labelStyle={{ color: tooltipLabel }}
                />
                <Bar
                  dataKey="precipitation"
                  fill={theme.colors.blue[6]}
                  opacity={0.6}
                />
              </BarChart>
            </ResponsiveContainer>
          </>
        )}

        {active === "sunshine" && (
          <>
            <Text fw={500} mb="sm">
              Sunshine Hours (h)
            </Text>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart
                data={sunshineData}
                margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
              >
                <CartesianGrid stroke={gridColor} vertical={false} />
                <XAxis dataKey="date" stroke={axisColor} tickLine={false} />
                <YAxis stroke={axisColor} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: tooltipBg, borderRadius: 8 }}
                  labelStyle={{ color: tooltipLabel }}
                />
                <Line
                  type="monotone"
                  dataKey="sunshine"
                  stroke={theme.colors.yellow[5]}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </>
        )}
      </Card>
    </Stack>
  );
}
