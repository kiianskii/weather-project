import { MantineProvider, createTheme } from "@mantine/core";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Today from "./pages/Today";
import Week from "./pages/Week";

const theme = createTheme({
  fontFamily: "Inter, sans-serif",
  defaultRadius: "md",
  primaryColor: "blue",
});

function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/today" replace />} />
            <Route path="/today" element={<Today />} />
            <Route path="/week" element={<Week />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
