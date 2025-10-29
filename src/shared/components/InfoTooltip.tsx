import {
  Tooltip,
  ActionIcon,
  useMantineTheme,
  rem,
  Popover,
  useMantineColorScheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconInfoCircle } from "@tabler/icons-react";
import { useState } from "react";

export function InfoTooltip({ label, size }: { label: string; size: number }) {
  const theme = useMantineTheme();

  const isMobile = useMediaQuery("(pointer: coarse)");
  const [opened, setOpened] = useState(false);

  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  const commonStyles: React.CSSProperties = {
    backgroundColor: isDark ? theme.colors.dark[6] : theme.colors.gray[0],
    color: isDark ? theme.colors.gray[2] : theme.colors.dark[7],
    border: `1px solid ${isDark ? theme.colors.gray[7] : theme.colors.gray[3]}`,
    fontSize: rem(13),
    padding: `${rem(6)} ${rem(10)}`,
    borderRadius: rem(6),
    boxShadow: isDark ? theme.shadows.md : theme.shadows.sm,
    maxWidth: isMobile ? rem(320) : rem(480),
    wordWrap: "break-word",
    whiteSpace: "normal",
    lineHeight: 1.4,
  };

  const icon = (
    <ActionIcon
      variant={isDark ? "subtle" : "light"}
      style={{
        borderRadius: "50%",
        width: size + 3,
        height: size + 3,
        pointerEvents: "all",
        color: isDark ? theme.colors.violet[4] : theme.colors.violet[7],
      }}
      onClick={() => {
        if (isMobile) setOpened((o) => !o);
      }}
      aria-label="Information"
      tabIndex={0}
    >
      <IconInfoCircle size={size} />
    </ActionIcon>
  );

  if (isMobile) {
    return (
      <Popover
        opened={opened}
        onChange={setOpened}
        position="bottom"
        offset={6}
        withArrow
        zIndex={302}
        styles={{
          dropdown: commonStyles,
          arrow: {
            backgroundColor: isDark
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
            borderColor: isDark ? theme.colors.violet[8] : theme.colors.gray[3],
          },
        }}
      >
        <Popover.Target>{icon}</Popover.Target>
        <Popover.Dropdown>{label}</Popover.Dropdown>
      </Popover>
    );
  }

  return (
    <Tooltip
      zIndex={302}
      label={label}
      withArrow
      transitionProps={{ duration: 100, transition: "fade" }}
      arrowSize={6}
      arrowOffset={8}
      position="top"
      offset={6}
      styles={{
        tooltip: commonStyles,
        arrow: {
          backgroundColor: isDark ? theme.colors.dark[6] : theme.colors.gray[0],
          borderColor: isDark ? theme.colors.violet[8] : theme.colors.gray[3],
        },
      }}
    >
      {icon}
    </Tooltip>
  );
}
