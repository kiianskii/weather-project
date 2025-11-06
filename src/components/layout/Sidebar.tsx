import { NavLink, Stack } from "@mantine/core";
import { IconHome, IconCalendar, IconHistory } from "@tabler/icons-react";
import { useLocation, useNavigate } from "react-router-dom";

interface SidebarProps {
  onNavigate?: () => void;
}

const Sidebar = ({ onNavigate }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Stack gap="xs" style={{ width: "100%" }}>
      <NavLink
        label="Home"
        leftSection={<IconHome size={16} />}
        active={location.pathname === "/"}
        onClick={() => {
          if (onNavigate) onNavigate();
          navigate("/");
        }}
      />
      <NavLink
        label="City Forecast"
        leftSection={<IconCalendar size={16} />}
        active={location.pathname === "/city"}
        onClick={() => {
          if (onNavigate) onNavigate();
          navigate("/city");
        }}
      />
      <NavLink
        label="Weather History"
        leftSection={<IconHistory size={16} />}
        active={location.pathname === "/history"}
        onClick={() => {
          if (onNavigate) onNavigate();
          navigate("/history");
        }}
      />
    </Stack>
  );
};

export default Sidebar;
