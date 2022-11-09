import React from "react";
import Sidebar from "./Sidebar";
import { AppShell, MantineProvider } from "@mantine/core";

function Layout({ children }) {
  return (
    <AppShell
      styles={{
        main: {
          width: "100vw",
          height: "100vh",
          background: "whitesmoke",
        },
        overflow: "hidden",
        fontFamily: "Circular",
      }}
      fixed
    >
      <MantineProvider
        theme={{
          fontFamily: "Circular",
        }}
      >
        <Sidebar />
        {children}
      </MantineProvider>
    </AppShell>
  );
}

export default Layout;
