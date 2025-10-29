import { useState } from "react";
import {
  TextInput,
  ActionIcon,
  Group,
  Button,
  Transition,
  Flex,
  Badge,
  Box,
  useMantineColorScheme,
} from "@mantine/core";
import { IconSearch, IconX, IconPencil } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useWeatherStore } from "../../store/weatherStore";
import { InfoTooltip } from "../../shared/components/InfoTooltip";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();
  const { city, setCity } = useWeatherStore();

  const label = "Search works with English names only.";

  const handleSearch = () => {
    const trimmed = query.trim();
    if (trimmed) {
      setCity(trimmed);
      navigate(`/city`);
      setQuery("");
      setEditing(false);
    }
  };

  const handleClear = () => setQuery("");

  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  if (city && !editing) {
    return (
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          maxWidth: 280,
          border: `1px solid ${
            isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)"
          }`,
          borderRadius: "999px",
          padding: "4px 8px",
          background: isDark ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.7)",
          backdropFilter: "blur(6px)",
        }}
      >
        <Badge
          variant="light"
          radius="xl"
          style={{
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.03em",
            flexGrow: 1,
            color: isDark ? "#fff" : "#333",
            background: "transparent",
            border: "none",
            boxShadow: "none",
          }}
        >
          {city}
        </Badge>

        <Group gap={4} style={{ flexShrink: 0 }}>
          <ActionIcon
            size="sm"
            radius="xl"
            color={isDark ? "gray" : "dark"}
            variant="subtle"
            onClick={() => setEditing(true)}
            title="Edit city"
          >
            <IconPencil size={12} />
          </ActionIcon>

          <ActionIcon
            size="sm"
            radius="xl"
            color={isDark ? "gray" : "dark"}
            variant="subtle"
            onClick={() => setCity(null)}
            title="Clear city"
          >
            <IconX size={14} />
          </ActionIcon>
        </Group>
      </Box>
    );
  }

  return (
    <Transition mounted={editing || !city} transition="fade" duration={200}>
      {(styles) => (
        <Flex style={{ ...styles, maxWidth: "100%" }} align="center" gap={6}>
          <InfoTooltip size={20} label={label} />
          <TextInput
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Enter city name..."
            size="xs"
            radius="xl"
            leftSection={
              <ActionIcon
                size="sm"
                radius="xl"
                color="blue"
                variant="subtle"
                onClick={handleSearch}
                title="Search"
              >
                <IconSearch size={16} />
              </ActionIcon>
            }
            rightSection={
              query ? (
                <ActionIcon
                  size="sm"
                  radius="xl"
                  color="gray"
                  variant="subtle"
                  onClick={handleClear}
                  title="Clear"
                >
                  <IconX size={14} />
                </ActionIcon>
              ) : null
            }
            styles={{
              input: {
                textAlign: "start",
                fontWeight: 500,
                paddingLeft: "2.25rem",
                paddingRight: query ? "2.25rem" : "0.75rem",
              },
            }}
            style={{
              width: "100%",
              maxWidth: 280,
            }}
          />

          {city && (
            <Button
              variant="subtle"
              color="gray"
              size="xs"
              radius="xl"
              onClick={() => setEditing(false)}
              style={{
                flexShrink: 0,
                display: "block",
              }}
            >
              Cancel
            </Button>
          )}
        </Flex>
      )}
    </Transition>
  );
};

export default SearchBar;
