import { Container, MantineProvider, createTheme } from "@mantine/core";
import HomePage from "./pages/HomePage";
import "@mantine/core/styles.css";

const theme = createTheme({
  fontFamily: "Inter, sans-serif",
  defaultRadius: "md",
  primaryColor: "blue",
});

function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <Container size="xs" p="md">
        <HomePage />
      </Container>
    </MantineProvider>
  );
}

export default App;
