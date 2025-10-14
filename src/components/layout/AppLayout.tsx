import { AppShell, ScrollArea } from "@mantine/core";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 220, breakpoint: 0 }}
      padding="md"
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Navbar>
        <Sidebar />
      </AppShell.Navbar>

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
