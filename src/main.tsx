import { StrictMode } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Auth0Provider } from "@auth0/auth0-react";
import { createRoot } from "react-dom/client";
import { theme } from "./styles/theme.ts";
import { App } from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <Auth0Provider
        domain="goroz.eu.auth0.com"
        clientId="vFyTkqn4hYQwmbgrxQgPDSh2ASAIlPT7"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <App />
      </Auth0Provider>
    </ChakraProvider>
  </StrictMode>
);
