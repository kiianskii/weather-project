import {
  Group,
  Text,
  useMantineColorScheme,
  Switch,
  ActionIcon,
  Drawer,
  Box,
} from "@mantine/core";
import SearchBar from "../widgets/SearchBar/SearchBar";
import { IconSun, IconMoonStars, IconMenu2 } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import Sidebar from "./Sidebar";
import SearchBarMobile from "../widgets/SearchBar/SearchBarMobile";
import { useNavigate } from "react-router-dom";
import { WeatherIcon } from "../../shared/icons/WeatherIcon";


const Header = () => {
  const mobile = useMediaQuery("(max-width: 767px)");
  const navigate = useNavigate();

  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  const [checked, setChecked] = useState(isDark);
  const [drawerOpened, setDrawerOpened] = useState(false);

  useEffect(() => {
    setChecked(isDark);
  }, [isDark]);

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.currentTarget.checked;
    setChecked(newChecked);
    setColorScheme(newChecked ? "dark" : "light");
  };

  return (
    <Group justify="space-between" px="lg" h="100%" align="center">
      <Group align="center" gap="xs">
        {mobile && (
          <ActionIcon
            size="lg"
            variant="subtle"
            onClick={() => setDrawerOpened(true)}
            aria-label="Open menu"
          >
            <IconMenu2 size={22} />
          </ActionIcon>
        )}
        <Text
          fw={700}
          size="lg"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          <WeatherIcon size={24} />
          Weatherly
        </Text>
      </Group>
      {mobile && <SearchBarMobile />}
      {!mobile && (
        <Group gap="sm">
          <SearchBar />
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
      )}

      {mobile && (
        <Drawer
          opened={drawerOpened}
          onClose={() => setDrawerOpened(false)}
          padding="md"
          size="70%"
          overlayProps={{ opacity: 0.4, blur: 3 }}
          position="left"
          title={
            <Text
              fw={700}
              size="lg"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <WeatherIcon size={24} />
              Weatherly
            </Text>
          }
        >
          <Sidebar onNavigate={() => setDrawerOpened(false)} />

          <Box
            mt="lg"
            pt="md"
            style={{
              borderTop: "1px solid var(--mantine-color-gray-3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingInline: "0.5rem",
            }}
          >
            <Text fw={500} size="sm">
              Theme
            </Text>
            <Switch
              checked={checked}
              onChange={handleSwitchChange}
              size="md"
              color="dark.4"
              thumbIcon={
                checked ? (
                  <IconSun
                    size={14}
                    stroke={2.5}
                    color="var(--mantine-color-yellow-4)"
                  />
                ) : (
                  <IconMoonStars
                    size={14}
                    stroke={2.5}
                    color="var(--mantine-color-blue-6)"
                  />
                )
              }
              styles={{
                track: {
                  backgroundColor: checked
                    ? "var(--mantine-color-dark-6)"
                    : "var(--mantine-color-gray-3)",
                  borderColor: "transparent",
                },
              }}
            />
          </Box>
        </Drawer>
      )}
    </Group>
  );
};

export default Header;
