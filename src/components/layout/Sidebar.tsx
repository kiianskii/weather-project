import { NavLink, Stack } from "@mantine/core";
import { IconHome, IconCalendar } from "@tabler/icons-react";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Stack p="sm" gap="xs">
      <NavLink
        label="Today"
        leftSection={<IconHome size={16} />}
        active={location.pathname === "/today"}
        onClick={() => navigate("/today")}
      />
      <NavLink
        label="Week Forecast"
        leftSection={<IconCalendar size={16} />}
        active={location.pathname === "/week"}
        onClick={() => navigate("/week")}
      />
    </Stack>
  );
};

export default Sidebar;
