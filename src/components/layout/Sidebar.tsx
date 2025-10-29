import { NavLink, Stack } from "@mantine/core";
import { IconHome, IconCalendar, IconHistory } from "@tabler/icons-react";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Stack p="sm" gap="xs">
      <NavLink
        label="Home"
        leftSection={<IconHome size={16} />}
        active={location.pathname === "/"}
        onClick={() => navigate("/")}
      />
      <NavLink
        label="City Forecast"
        leftSection={<IconCalendar size={16} />}
        active={location.pathname === "/city"}
        onClick={() => navigate("/city")}
      />
      <NavLink
        label="Weather history"
        leftSection={<IconHistory size={16} />}
        active={location.pathname === "/history"}
        onClick={() => navigate("/history")}
      />
    </Stack>
  );
};

export default Sidebar;
