import { MantineProvider, createTheme } from "@mantine/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import HomePage from "./pages/HomePage";
import CityWeather from "./pages/CityWeather";
import WeatherHistoryPage from "./pages/WeatherHistoryPage";

function App() {
  const theme = createTheme({
    fontFamily: "Inter, sans-serif",
    defaultRadius: "md",
    primaryColor: "grape",
  });
  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/city" element={<CityWeather />} />
            <Route path="/history" element={<WeatherHistoryPage />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
