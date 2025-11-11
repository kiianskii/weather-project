import { AppShell } from "@mantine/core";
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
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      {!mobile && (
        <AppShell.Navbar p="sm">
          <Sidebar />
        </AppShell.Navbar>
      )}

      <AppShell.Main
        style={{
          height: "100vh",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </AppShell.Main>
    </AppShell>
  );
};

export default AppLayout;
