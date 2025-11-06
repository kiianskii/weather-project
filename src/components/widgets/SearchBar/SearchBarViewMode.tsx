import { Badge, Box, Group, ActionIcon } from "@mantine/core";
import { IconPencil, IconX } from "@tabler/icons-react";
import { useMantineColorScheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

interface SearchBarViewModeProps {
  city: string;
  onEdit: () => void;
  onClear: () => void;
}

const SearchBarViewMode = ({
  city,
  onEdit,
  onClear,
}: SearchBarViewModeProps) => {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";
  const mobile = useMediaQuery("(max-width: 767px)");

  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        gap: mobile ? 4 : 6,
        maxWidth: mobile ? 220 : 280,
        border: `1px solid ${
          isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)"
        }`,
        borderRadius: "999px",
        padding: mobile ? "3px 6px" : "4px 8px",
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
          fontSize: mobile ? "0.65rem" : "0.75rem",
        }}
      >
        {city}
      </Badge>

      <Group gap={mobile ? 2 : 4} style={{ flexShrink: 0 }}>
        <ActionIcon
          size={mobile ? "xs" : "sm"}
          radius="xl"
          color={isDark ? "gray" : "dark"}
          variant="subtle"
          onClick={onEdit}
          title="Edit city"
        >
          <IconPencil size={mobile ? 10 : 12} />
        </ActionIcon>

        <ActionIcon
          size={mobile ? "xs" : "sm"}
          radius="xl"
          color={isDark ? "gray" : "dark"}
          variant="subtle"
          onClick={onClear}
          title="Clear city"
        >
          <IconX size={mobile ? 12 : 14} />
        </ActionIcon>
      </Group>
    </Box>
  );
};

export default SearchBarViewMode;
