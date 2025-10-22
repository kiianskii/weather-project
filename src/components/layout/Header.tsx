import { Group, Text, ActionIcon } from "@mantine/core";
import { IconSun, IconLanguage } from "@tabler/icons-react";
import SearchBar from "../widgets/SearchBar";

const Header = () => {
  return (
    <Group justify="space-between" px="md" h="100%">
      <Text fw={700} size="lg">
        Weatherly ☀️
      </Text>

      <Group>
        <SearchBar />
        <ActionIcon variant="light" radius="xl" aria-label="Change language">
          <IconLanguage size={18} />
        </ActionIcon>
        <ActionIcon variant="light" radius="xl" aria-label="Toggle theme">
          <IconSun size={18} />
        </ActionIcon>
      </Group>
    </Group>
  );
};

export default Header;
