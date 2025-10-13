import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface WeatherChartProps {
  weather: any;
}

const WeatherChart = ({ weather }: WeatherChartProps) => {
  const data = weather.daily.time.map((time: string, index: number) => ({
    date: new Date(time).toLocaleDateString("en-US", { weekday: "short" }),
    max: weather.daily.temperature_2m_max[index],
    min: weather.daily.temperature_2m_min[index],
  }));

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="max" stroke="#007bff" />
        <Line type="monotone" dataKey="min" stroke="#66b2ff" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default WeatherChart;
