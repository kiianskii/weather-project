import { useState } from "react";
import {
  Button,
  TextInput,
  Box,
  Group,
  Stack,
  useMantineTheme,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar, IconSearch, IconX } from "@tabler/icons-react";
import { useWeatherStore } from "../../../store/weatherStore";
import { useMediaQuery } from "@mantine/hooks";

interface WeatherHistoryFormProps {
  onSubmit: (city: string, startDate: string, endDate: string) => void;
}

export function WeatherHistoryForm({ onSubmit }: WeatherHistoryFormProps) {
  const { historyCity, dateRange, setDateRange, setHistoryCity, clearHistory } =
    useWeatherStore();

  const [city, setCity] = useState(historyCity || "");
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const handleSubmit = () => {
    if (!city || !dateRange?.[0] || !dateRange?.[1]) return;

    const formatDate = (value: string | Date): string => {
      if (typeof value === "string") return value;
      return value.toISOString().split("T")[0];
    };

    const startDate = formatDate(dateRange[0]);
    const endDate = formatDate(dateRange[1]);

    onSubmit(city, startDate, endDate);
    setHistoryCity(city);
  };

  const handleClear = () => {
    setCity("");
    setDateRange([null, null]);
    setHistoryCity(null);
    clearHistory();
  };

  return (
    <Box
      style={{
        display: mobile ? "block" : "flex",
        gap: mobile ? 8 : 12,
        alignItems: mobile ? "stretch" : "flex-end",
        maxWidth: 750,
        width: "100%",
      }}
    >
      {mobile ? (
        <Stack gap="sm">
          <TextInput
            label="City"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.currentTarget.value)}
            leftSection={<IconSearch size={16} />}
          />

          <DatePickerInput
            type="range"
            label="Start date / End date"
            value={dateRange}
            onChange={setDateRange}
            valueFormat="YYYY MMM DD"
            allowSingleDateInRange
            clearable
            leftSection={<IconCalendar />}
            maxDate={new Date()}
            placeholder="Pick date range"
          />

          <Group grow gap="sm">
            <Button onClick={handleSubmit} variant="light">
              Show history
            </Button>

            <Button
              onClick={handleClear}
              variant="light"
              color="gray"
              leftSection={<IconX size={16} />}
              disabled={!city && !dateRange[0]}
            >
              Clear
            </Button>
          </Group>
        </Stack>
      ) : (
        <>
          <TextInput
            label="City"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.currentTarget.value)}
            leftSection={<IconSearch size={16} />}
            style={{ width: 180, minWidth: 180 }}
          />

          <DatePickerInput
            type="range"
            label="Start date / End date"
            value={dateRange}
            onChange={setDateRange}
            valueFormat="YYYY MMM DD"
            allowSingleDateInRange
            clearable
            leftSection={<IconCalendar />}
            style={{ width: 260, minWidth: 260 }}
            maxDate={new Date()}
            placeholder="Pick date range"
          />

          <Group gap="xs" align="end">
            <Button
              onClick={handleSubmit}
              variant="light"
              style={{ width: 140, minWidth: 140 }}
            >
              Show history
            </Button>

            <Button
              onClick={handleClear}
              variant="light"
              color="gray"
              leftSection={<IconX size={16} />}
              style={{ width: 100, minWidth: 100 }}
              disabled={!city && !dateRange[0]}
            >
              Clear
            </Button>
          </Group>
        </>
      )}
    </Box>
  );
}
