import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Layout } from "./components";
import { MantineProvider, createEmotionCache } from "@mantine/core";
import { StylesPlaceholder } from "@mantine/remix";
import globalStyles from "~/styles/global.css";

const isDevMode = process.env.NODE_ENV === "development";
export const links = () => [{ rel: "stylesheet", href: globalStyles }, {}];
export const meta = () => {
  return {
    description: "Remix Photo booth using remix framework, mantine ",
    keywords: "react , remix , mantine , AWS S3 , crop Image",
    charset: "utf-8",
    title: "Inkpen | Photo Editor",
    viewport: "width=device-width,initial-scale=1",
  };
};
createEmotionCache({ key: "mantine" });

export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

const Document = ({ children, title }) => {
  return (
    <html lang="en">
      <head>
        <StylesPlaceholder />
        <Links />
        <Meta />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script
          src="https://widget.cloudinary.com/v2.0/global/all.js"
          type="text/javascript"
        ></script>
        <title>{title ?? "Remix Photo booth"}</title>
      </head>
      <body>
        {children}
        {isDevMode ? (
          <>
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
          </>
        ) : null}
      </body>
    </html>
  );
};

export function ErrorBoundary({ error }) {
  console.log(error);
  return (
    <Document>
      <Layout>
        <p>{error.message}</p>
      </Layout>
    </Document>
  );
}
