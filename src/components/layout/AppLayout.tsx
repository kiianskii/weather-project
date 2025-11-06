import { AppShell, ScrollArea } from "@mantine/core";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useMediaQuery } from "@mantine/hooks";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const mobile = useMediaQuery("(max-width: 767px)");

  return (
    <AppShell
      header={{ height: 60 }}
      // показуємо navbar тільки на десктопі
      navbar={
        mobile
          ? undefined
          : {
              width: 220,
              breakpoint: 0,
            }
      }
      padding="md"
    >
      {/* Header завжди */}
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      {/* Sidebar тільки на десктопі */}
      {!mobile && (
        <AppShell.Navbar p="sm">
          <Sidebar />
        </AppShell.Navbar>
      )}

      <AppShell.Main
        style={{
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ScrollArea style={{ flex: 1 }}>{children}</ScrollArea>
      </AppShell.Main>
    </AppShell>
  );
};

export default AppLayout;
