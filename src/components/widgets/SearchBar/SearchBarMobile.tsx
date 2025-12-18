import { useState } from "react";
import {
  Dialog,
  Text,
  Button,
  Box,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMapPin, IconChevronDown } from "@tabler/icons-react";
import SearchBarEditMode from "../SearchBar/SearchBarEditMode";
import { useWeatherStore } from "../../../store/weatherStore";
import { useNavigate } from "react-router-dom";
import { useWeatherNotifications } from "../../../hooks/useWeatherNotifications";
import { useTranslation } from "react-i18next";

const SearchBarMobile = () => {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";
  const { city, fetchWeatherData, weatherError, clearWeatherError } =
    useWeatherStore();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [opened, setOpened] = useState(false);
  const [query, setQuery] = useState("");

  useWeatherNotifications(weatherError, clearWeatherError);

  const handleSearch = async () => {
    const trimmed = query.trim();
    if (!trimmed) return;

    try {
      await fetchWeatherData(trimmed);
      setOpened(false);
      navigate("/city");
      setQuery("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box>
      <Button
        variant="subtle"
        size="compact-sm"
        onClick={() => setOpened(true)}
        leftSection={<IconMapPin size={16} />}
        rightSection={<IconChevronDown size={14} />}
        style={{
          fontWeight: 600,
          textTransform: "capitalize",
          color: isDark ? "#fff" : "#333",
        }}
      >
        {city || t("searchBar.chooseCity")}
      </Button>

      <Dialog
        opened={opened}
        withCloseButton
        onClose={() => setOpened(false)}
        radius="md"
        p="md"
        style={{
          maxWidth: 325,
          marginInline: "auto",
          background: isDark ? "rgba(30,30,30,0.95)" : "#fff",
          boxShadow:
            "0 4px 20px rgba(0,0,0,0.25), 0 0 1px rgba(255,255,255,0.15)",
        }}
        position={{ top: 50, right: 10 }}
      >
        <Text fw={600} mb="sm" size="sm" ta="center">
          {city ? t("searchBar.searchAnotherCity") : t("searchBar.searchCity")}
        </Text>

        <SearchBarEditMode
          query={query}
          onQueryChange={setQuery}
          onSearch={handleSearch}
          onCancel={() => setOpened(false)}
        />
      </Dialog>
    </Box>
  );
};

export default SearchBarMobile;
