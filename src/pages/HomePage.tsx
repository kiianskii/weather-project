import { Stack } from "@mantine/core";
import GlobalWeatherOverview from "../components/widgets/GlobalWeatherOverview";

const HomePage = () => {
  return (
    <Stack gap="lg" align="center" style={{ width: "100%" }}>
      <GlobalWeatherOverview />
    </Stack>
  );
};

export default HomePage;
