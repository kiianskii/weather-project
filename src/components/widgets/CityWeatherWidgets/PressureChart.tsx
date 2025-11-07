import { Card, Text, useMantineColorScheme } from "@mantine/core";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface PressureChartProps {
  hourly: {
    time: string[];
    surface_pressure: number[];
  };
}

const PressureChart = ({ hourly }: PressureChartProps) => {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  if (!hourly?.time?.length || !hourly.surface_pressure?.length) return null;

  const today = new Date().getDate();
  const data = hourly.time
    .map((time, index) => ({
      hour: new Date(time).getHours(),
      pressure: hourly.surface_pressure[index],
      day: new Date(time).getDate(),
    }))
    .filter((h) => h.day === today);

  return (
    <Card
      shadow="sm"
      radius="md"
      p="md"
      style={{
        width: "100%",
        background: isDark
          ? "rgba(255, 255, 255, 0.05)"
          : "rgba(255, 255, 255, 0.8)",
        border: isDark
          ? "1px solid rgba(255,255,255,0.1)"
          : "1px solid rgba(0,0,0,0.15)",
      }}
    >
      <Text fw={600} mb="sm" size="sm">
        Pressure trend today (hPa)
      </Text>

      <div style={{ width: "100%", height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)"}
            />
            <XAxis
              dataKey="hour"
              tick={{ fill: isDark ? "#ddd" : "#333", fontSize: 12 }}
              tickFormatter={(h) => `${h}:00`}
            />
            <YAxis
              domain={["dataMin - 2", "dataMax + 2"]}
              tick={{ fill: isDark ? "#ccc" : "#555", fontSize: 12 }}
              width={40}
            />
            <Tooltip
              contentStyle={{
                background: isDark
                  ? "rgba(40,40,50,0.9)"
                  : "rgba(255,255,255,0.95)",
                borderRadius: "8px",
                border: "1px solid rgba(0,0,0,0.1)",
              }}
              labelFormatter={(h) => `Hour: ${h}:00`}
              formatter={(value) => {
                const val =
                  typeof value === "number" ? value.toFixed(1) : value;
                return [`${val} hPa`, "Pressure"];
              }}
            />
            <Line
              type="monotone"
              dataKey="pressure"
              stroke={isDark ? "#a88bff" : "#7b61ff"}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default PressureChart;
