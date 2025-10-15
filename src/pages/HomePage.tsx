import { Stack } from "@mantine/core";
import SearchBar from "../components/widgets/SearchBar";
import GlobalWeatherOverview from "../components/widgets/GlobalWeatherOverview";

const HomePage = () => {
  return (
    <Stack gap="lg" align="center" p="md" style={{ width: "100%" }}>
      <SearchBar />
      <GlobalWeatherOverview />
    </Stack>
  );
};

export default HomePage;
