import { useState } from "react";
import {
  Select,
  Popover,
  ActionIcon,
  CloseButton,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useWeatherStore } from "../../store/weatherStore";
import { IconWorld } from "@tabler/icons-react";

const LangSelectPopover = () => {
  const { i18n, t } = useTranslation();
  const { setLanguage } = useWeatherStore();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  const [opened, setOpened] = useState(false);

  const handleLanguageChange = async (value: string | null) => {
    if (value) {
      i18n.changeLanguage(value);
      setLanguage(value);
      setOpened(false);
    }
  };

  const dropdownBg = isDark ? "rgba(30,30,30,0.95)" : "#f8f9fa";
  const textColor = isDark ? "#fff" : "#000";

  return (
    <Popover
      opened={opened}
      onClose={() => setOpened(false)}
      position="bottom"
      withArrow
      shadow="md"
      closeOnClickOutside
      closeOnEscape
    >
      <Popover.Target>
        <ActionIcon
          variant="light"
          onClick={() => setOpened((o) => !o)}
          size="lg"
        >
          <IconWorld size={20} />
        </ActionIcon>
      </Popover.Target>

      <Popover.Dropdown
        style={{
          minWidth: 180,
          padding: 16,
          borderRadius: 8,
          backgroundColor: dropdownBg,
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}
      >
        <CloseButton
          onClick={() => setOpened(false)}
          size="xs"
          iconSize={16}
          style={{ position: "absolute", top: 8, right: 8 }}
        />
        <Text size="sm" fw={500} mb={6} style={{ color: textColor }}>
          {t("language")}
        </Text>
        <Select
          value={i18n.language}
          onChange={handleLanguageChange}
          data={[
            { value: "en", label: t("english") },
            { value: "uk", label: t("ukrainian") },
          ]}
          size="sm"
          radius="md"
        />
      </Popover.Dropdown>
    </Popover>
  );
};

export default LangSelectPopover;
