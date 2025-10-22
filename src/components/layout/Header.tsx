import {
  Group,
  Text,
  ActionIcon,
  useMantineColorScheme,
  Switch,
} from "@mantine/core";
import SearchBar from "../widgets/SearchBar";
import { IconSun, IconMoonStars, IconLanguage } from "@tabler/icons-react";
import { useEffect, useState } from "react";

const Header = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  const [checked, setChecked] = useState(isDark);
  useEffect(() => {
    setChecked(isDark);
  }, [isDark]);

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.currentTarget.checked;
    setChecked(newChecked);
    setColorScheme(newChecked ? "dark" : "light");
  };

  return (
    <Group justify="space-between" px="md" h="100%" align="center">
      <Text fw={700} size="lg" style={{ letterSpacing: "-0.02em" }}>
        Weatherly ☀️
      </Text>

      <Group gap="sm">
        <SearchBar />

        <ActionIcon variant="light" radius="xl" aria-label="Change language">
          <IconLanguage size={18} />
        </ActionIcon>

        <Switch
          checked={checked}
          onChange={handleSwitchChange}
          size="md"
          color="dark.4"
          onLabel={
            <IconSun
              size={16}
              stroke={2.5}
              color="var(--mantine-color-yellow-4)"
            />
          }
          offLabel={
            <IconMoonStars
              size={16}
              stroke={2.5}
              color="var(--mantine-color-blue-6)"
            />
          }
        />
      </Group>
    </Group>
  );
};

export default Header;
