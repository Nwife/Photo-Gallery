import { CssBaseline, CssVarsProvider } from "@mui/joy";
import { Provider as StateProvider } from "jotai";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Gallery } from "./components/gallery";
import { Layout } from "./components/layout";

const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <CssVarsProvider defaultMode="dark">
      <CssBaseline />
      <StateProvider>
        <Layout>
          <Gallery />
        </Layout>
      </StateProvider>
    </CssVarsProvider>
  </StrictMode>
);
