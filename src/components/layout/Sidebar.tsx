import { NavLink, Stack } from "@mantine/core";
import { IconHome, IconCalendar, IconHistory } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

interface SidebarProps {
  onNavigate?: () => void;
}

const Sidebar = ({ onNavigate }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <Stack gap="xs" style={{ width: "100%" }}>
      <NavLink
        label={t("sidebar.home")}
        leftSection={<IconHome size={16} />}
        active={location.pathname === "/"}
        onClick={() => {
          onNavigate?.();
          navigate("/");
        }}
      />

      <NavLink
        label={t("sidebar.cityForecast")}
        leftSection={<IconCalendar size={16} />}
        active={location.pathname === "/city"}
        onClick={() => {
          onNavigate?.();
          navigate("/city");
        }}
      />

      <NavLink
        label={t("sidebar.weatherHistory")}
        leftSection={<IconHistory size={16} />}
        active={location.pathname === "/history"}
        onClick={() => {
          onNavigate?.();
          navigate("/history");
        }}
      />
    </Stack>
  );
};

export default Sidebar;
