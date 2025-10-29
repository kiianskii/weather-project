import { useState } from "react";
import { Button, TextInput, Box } from "@mantine/core";
import { DatePickerInput, type DatesRangeValue } from "@mantine/dates";
import { IconCalendar, IconSearch } from "@tabler/icons-react";
import { useWeatherStore } from "../../../store/weatherStore";

interface WeatherHistoryFormProps {
  onSubmit: (city: string, startDate: string, endDate: string) => void;
}

export function WeatherHistoryForm({ onSubmit }: WeatherHistoryFormProps) {
  const { city: storedCity } = useWeatherStore();
  const [city, setCity] = useState(storedCity || "");
  const [dateRange, setDateRange] = useState<DatesRangeValue>([null, null]);

  const handleSubmit = () => {
    if (!city || !dateRange?.[0] || !dateRange?.[1]) return;

    const formatDate = (value: string | Date): string => {
      if (typeof value === "string") return value;
      return value.toISOString().split("T")[0];
    };

    const startDate = formatDate(dateRange[0]);
    const endDate = formatDate(dateRange[1]);

    onSubmit(city, startDate, endDate);
  };

  return (
    <Box
      style={{
        display: "flex",
        gap: 12,
        alignItems: "flex-end",
        maxWidth: 650,
        flexWrap: "nowrap",
      }}
    >
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
        label="Select date range"
        value={dateRange}
        onChange={setDateRange}
        valueFormat="YYYY MMM DD"
        allowSingleDateInRange
        clearable
        leftSection={<IconCalendar />}
        style={{ width: 260, minWidth: 260 }}
      />

      <Button
        onClick={handleSubmit}
        variant="filled"
        style={{ width: 140, minWidth: 140 }}
      >
        Show history
      </Button>
    </Box>
  );
}
