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
import { useMediaQuery } from "@mantine/hooks";

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
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

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

  // Адаптивні марджини для графіків
  const chartMargin = isMobile
    ? { top: 10, right: 10, left: -15, bottom: 0 }
    : { top: 10, right: 20, left: 0, bottom: 0 };

  return (
    <Stack gap="lg">
      <Text fw={600} size={isMobile ? "md" : "lg"} ta="center">
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
        size={isMobile ? "xs" : "sm"}
      />

      <Card
        withBorder
        radius="lg"
        p={isMobile ? "sm" : "lg"}
        style={{
          ...cardStyle,
          paddingLeft: isMobile ? 4 : undefined,
          paddingRight: isMobile ? 4 : undefined,
        }}
      >
        {active === "temperature" && (
          <>
            <Text fw={500} mb="sm" ta={isMobile ? "center" : "left"}>
              Temperature (°C)
            </Text>
            <ResponsiveContainer width="100%" height={isMobile ? 220 : 250}>
              <LineChart data={tempData} margin={chartMargin}>
                <CartesianGrid stroke={gridColor} vertical={false} />
                <XAxis
                  dataKey="date"
                  stroke={axisColor}
                  tickLine={false}
                  tick={{ fontSize: isMobile ? 10 : 12 }}
                />
                <YAxis
                  stroke={axisColor}
                  tickLine={false}
                  tick={{ fontSize: isMobile ? 10 : 12 }}
                  width={isMobile ? 30 : 40}
                />
                <Tooltip
                  contentStyle={{
                    background: tooltipBg,
                    borderRadius: 8,
                    fontSize: isMobile ? 12 : 14,
                  }}
                  labelStyle={{ color: tooltipLabel }}
                />
                <Line
                  type="monotone"
                  dataKey="min"
                  stroke={theme.colors.blue[5]}
                  name="Min"
                  dot={false}
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="mean"
                  stroke={theme.colors.red[5]}
                  name="Mean"
                  dot={false}
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="max"
                  stroke={theme.colors.orange[5]}
                  name="Max"
                  dot={false}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </>
        )}

        {active === "precipitation" && (
          <>
            <Text fw={500} mb="sm" ta={isMobile ? "center" : "left"}>
              Precipitation (mm)
            </Text>
            <ResponsiveContainer width="100%" height={isMobile ? 200 : 220}>
              <BarChart data={precipitationData} margin={chartMargin}>
                <CartesianGrid stroke={gridColor} vertical={false} />
                <XAxis
                  dataKey="date"
                  stroke={axisColor}
                  tickLine={false}
                  tick={{ fontSize: isMobile ? 10 : 12 }}
                />
                <YAxis
                  stroke={axisColor}
                  tickLine={false}
                  tick={{ fontSize: isMobile ? 10 : 12 }}
                  width={isMobile ? 30 : 40}
                />
                <Tooltip
                  contentStyle={{
                    background: tooltipBg,
                    borderRadius: 8,
                    fontSize: isMobile ? 12 : 14,
                  }}
                  labelStyle={{ color: tooltipLabel }}
                />
                <Bar
                  dataKey="precipitation"
                  fill={theme.colors.blue[6]}
                  opacity={0.6}
                  barSize={isMobile ? 8 : 14}
                />
              </BarChart>
            </ResponsiveContainer>
          </>
        )}

        {active === "sunshine" && (
          <>
            <Text fw={500} mb="sm" ta={isMobile ? "center" : "left"}>
              Sunshine Hours (h)
            </Text>
            <ResponsiveContainer width="100%" height={isMobile ? 200 : 220}>
              <LineChart data={sunshineData} margin={chartMargin}>
                <CartesianGrid stroke={gridColor} vertical={false} />
                <XAxis
                  dataKey="date"
                  stroke={axisColor}
                  tickLine={false}
                  tick={{ fontSize: isMobile ? 10 : 12 }}
                />
                <YAxis
                  stroke={axisColor}
                  tickLine={false}
                  tick={{ fontSize: isMobile ? 10 : 12 }}
                  width={isMobile ? 30 : 40}
                />
                <Tooltip
                  contentStyle={{
                    background: tooltipBg,
                    borderRadius: 8,
                    fontSize: isMobile ? 12 : 14,
                  }}
                  labelStyle={{ color: tooltipLabel }}
                />
                <Line
                  type="monotone"
                  dataKey="sunshine"
                  stroke={theme.colors.yellow[5]}
                  dot={false}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </>
        )}
      </Card>
    </Stack>
  );
}
