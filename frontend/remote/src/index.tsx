import * as process from "process";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { ContextProvider } from "./Context";
import theme from "./theme";
import * as serviceWorkerRegistration from "./serviceWorkerRegistrations";

(window as any).global = window;
(window as any).process = process;
(window as any).Buffer = [];
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ContextProvider>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </ContextProvider>
  </React.StrictMode>
);

serviceWorkerRegistration.register();
