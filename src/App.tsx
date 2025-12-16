import { MantineProvider, createTheme } from "@mantine/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import HomePage from "./pages/HomePage";
import CityWeather from "./pages/CityWeather";
import WeatherHistoryPage from "./pages/WeatherHistoryPage";
import { useEffect } from "react";
import { useWeatherStore } from "./store/weatherStore";
import { useTranslation } from "react-i18next";

function App() {
  const theme = createTheme({
    fontFamily: "Inter, sans-serif",
    defaultRadius: "md",
    primaryColor: "grape",
  });

  const { savedLanguage } = useWeatherStore();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (savedLanguage) {
      const backendLang = Object.keys(savedLanguage)[0];

      i18n.changeLanguage(backendLang);
    }
  }, [savedLanguage]);

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
