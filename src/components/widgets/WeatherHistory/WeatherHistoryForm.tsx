import { useState } from "react";
import { Button, TextInput, Box, Group, Stack } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar, IconSearch, IconX } from "@tabler/icons-react";
import { useWeatherStore } from "../../../store/weatherStore";
import { useMediaQuery } from "@mantine/hooks";
import { useTranslation } from "react-i18next";

interface WeatherHistoryFormProps {
  onSubmit: (city: string, startDate: string, endDate: string) => void;
}

export function WeatherHistoryForm({ onSubmit }: WeatherHistoryFormProps) {
  const { historyCity, dateRange, setDateRange, setHistoryCity, clearHistory } =
    useWeatherStore();

  const [city, setCity] = useState(historyCity || "");

  const mobile = useMediaQuery(`(max-width: 1080px)`);
  const { t } = useTranslation();

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
        maxWidth: 850,
        width: "100%",
      }}
    >
      {mobile ? (
        <Stack gap="sm">
          <TextInput
            label={t("history.cityLabel")}
            placeholder={t("history.cityPlaceholder")}
            value={city}
            onChange={(e) => setCity(e.currentTarget.value)}
            leftSection={<IconSearch size={16} />}
          />

          <DatePickerInput
            type="range"
            label={t("history.dateRangeLabel")}
            value={dateRange}
            onChange={setDateRange}
            valueFormat="YYYY MMM DD"
            allowSingleDateInRange
            clearable
            leftSection={<IconCalendar />}
            maxDate={new Date()}
            placeholder={t("history.dateRangePlaceholder")}
          />

          <Group grow gap="sm">
            <Button onClick={handleSubmit} variant="light">
              {t("history.showHistory")}
            </Button>

            <Button
              onClick={handleClear}
              variant="light"
              color="gray"
              leftSection={<IconX size={16} />}
              disabled={!city && !dateRange[0]}
            >
              {t("history.clear")}
            </Button>
          </Group>
        </Stack>
      ) : (
        <>
          <TextInput
            label={t("history.cityLabel")}
            placeholder={t("history.cityPlaceholder")}
            value={city}
            onChange={(e) => setCity(e.currentTarget.value)}
            leftSection={<IconSearch size={16} />}
            style={{ width: 180, minWidth: 180 }}
          />

          <DatePickerInput
            type="range"
            label={t("history.dateRangeLabel")}
            value={dateRange}
            onChange={setDateRange}
            valueFormat="YYYY MMM DD"
            allowSingleDateInRange
            clearable
            leftSection={<IconCalendar />}
            style={{ width: 260, minWidth: 260 }}
            maxDate={new Date()}
            placeholder={t("history.dateRangePlaceholder")}
          />

          <Group gap="xs" align="end">
            <Button
              onClick={handleSubmit}
              variant="light"
              style={{ maxWidthwidth: 200, minWidth: 140 }}
            >
              {t("history.showHistory")}
            </Button>

            <Button
              onClick={handleClear}
              variant="light"
              color="gray"
              leftSection={<IconX size={16} />}
              style={{ maxWidth: 130, minWidth: 100 }}
              disabled={!city && !dateRange[0]}
            >
              {t("history.clear")}
            </Button>
          </Group>
        </>
      )}
    </Box>
  );
}
