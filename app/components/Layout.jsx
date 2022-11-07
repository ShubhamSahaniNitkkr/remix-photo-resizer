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
      header={
        <Header height={50} p="sm">
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <Text size="xl" weight="bolder">
              Remix Photo Booth
            </Text>
          </div>
        </Header>
      }
      footer={
        <Footer height={20} p="sm">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              height: "100%",
            }}
          >
            <Text size="sm">&copy; 2022</Text>
          </div>
        </Footer>
      }
    >
      <Sidebar />
      {children}
    </AppShell>
  );
}

export default Layout;
