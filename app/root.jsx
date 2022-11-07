import { Outlet, LiveReload, Links, Meta } from "remix";
import { Sidebar } from "./components";
import globalStyles from "~/styles/global.css";

const isDevMode = process.env.NODE_ENV === "development";
export const links = () => [{ rel: "stylesheet", href: globalStyles }];
export const meta = () => {
  const description = "Remix Photo booth using remix framework, mantine ";
  const keywords = "react , remix , mantine , AWS S3 , crop Image";
  return {
    description,
    keywords,
  };
};

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
        <Links />
        <Meta />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title ?? "Remix Photo booth"}</title>
      </head>
      <body>
        {children}
        {isDevMode ? <LiveReload /> : null}
      </body>
    </html>
  );
};

const Layout = ({ children }) => {
  return (
    <>
      <Sidebar />
      <div className="page">{children}</div>
    </>
  );
};
