// import { Card, Stack, Text, Box } from "@mantine/core";
// import { IconSun, IconCloud, IconCloudRain } from "@tabler/icons-react";

// const WeatherPlaceholder = () => {
//   return (
//     <Card
//       p="xl"
//       style={{
//         minHeight: 300,
//         color: "#333",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Stack align="center" gap="md">
//         <Box style={{ display: "flex", gap: 16 }}>
//           <IconSun size={48} color="#FFD93D" />
//           <IconCloud size={48} color="#90A4AE" />
//           <IconCloudRain size={48} color="#4FC3F7" />
//         </Box>
//         <Text size="xl" fw={700} style={{ textAlign: "center" }}>
//           Weather is waiting for you!
//         </Text>
//         <Text size="sm" color="dimmed" style={{ textAlign: "center" }}>
//           Enter a city name in the search bar to see the forecast.
//         </Text>
//       </Stack>
//     </Card>
//   );
// };

// export default WeatherPlaceholder;
import { Card, Stack, Text, Box, Group } from "@mantine/core";
import {
  IconSun,
  IconCloud,
  IconCloudRain,
  IconWind,
  IconDroplet,
} from "@tabler/icons-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const placeholderData = [
  { day: "Mon", temp: 20 },
  { day: "Tue", temp: 22 },
  { day: "Wed", temp: 18 },
  { day: "Thu", temp: 21 },
  { day: "Fri", temp: 19 },
  { day: "Sat", temp: 23 },
  { day: "Sun", temp: 20 },
];

const WeatherPlaceholder = () => {
  return (
    <Card
      p="xl"
      style={{
        minHeight: 350,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16,
      }}
    >
      <Stack
        gap="md"
        p="lg"
        style={{
          background: "#f5f5f5",
          textAlign: "center",
          borderRadius: "1rem",
        }}
      >
        <Text size="2xl" fw={700}>
          Weather Forecast
        </Text>
        <Text size="md" color="dimmed" style={{ maxWidth: 320 }}>
          Enter a city name in the search bar above to see detailed weather
          information.
        </Text>

        {/* Іконки */}
        <Group gap="xl" style={{ marginTop: 16, justifyContent: "center" }}>
          <Stack gap="xs" style={{ textAlign: "center" }}>
            <IconSun size={36} color="#FFD93D" />
            <Text size="sm">Sunny</Text>
          </Stack>
          <Stack gap="xs" style={{ textAlign: "center" }}>
            <IconCloud size={36} color="#90A4AE" />
            <Text size="sm">Cloudy</Text>
          </Stack>
          <Stack gap="xs" style={{ textAlign: "center" }}>
            <IconCloudRain size={36} color="#4FC3F7" />
            <Text size="sm">Rainy</Text>
          </Stack>
          <Stack gap="xs" style={{ textAlign: "center" }}>
            <IconWind size={36} color="#81D4FA" />
            <Text size="sm">Wind</Text>
          </Stack>
          <Stack gap="xs" style={{ textAlign: "center" }}>
            <IconDroplet size={36} color="#29B6F6" />
            <Text size="sm">Humidity</Text>
          </Stack>
        </Group>

        {/* Міні-графік температур */}
        <Box
          style={{ width: "100%", maxWidth: 500, height: 100, marginTop: 20 }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={placeholderData}>
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis hide domain={[0, 30]} />
              <Tooltip />
              <Bar
                dataKey="temp"
                fill="#FFA726"
                radius={[4, 4, 0, 0]}
                barSize={12}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Stack>
    </Card>
  );
};

export default WeatherPlaceholder;
