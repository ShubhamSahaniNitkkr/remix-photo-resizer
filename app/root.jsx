import { Outlet, LiveReload, Link } from "remix";

export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

const isDevMode = process.env.NODE_ENV === "development";

const Document = ({ children, title }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
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
      <nav className="navbar">
        <Link to="/">Home</Link>
      </nav>
      {children}
    </>
  );
};
