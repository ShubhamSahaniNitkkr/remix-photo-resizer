import React from "react";
import Sidebar from "./Sidebar";
import { AppShell, Header, Footer, Text } from "@mantine/core";

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
      }}
      fixed
    >
      <Sidebar />
      {children}
    </AppShell>
  );
}

export default Layout;
