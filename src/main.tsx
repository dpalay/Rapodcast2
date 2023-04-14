import React from "react";
import ReactDOM from "react-dom/client";
import { FirebaseAppProvider } from "reactfire";
import { firebaseApp } from "./util/firebase";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { router } from "./routes/routes";
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import theme from "./theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseApp}>
      <HelmetProvider>
        <ChakraProvider theme={theme}>
          <RouterProvider router={router} />
        </ChakraProvider>
      </HelmetProvider>
    </FirebaseAppProvider>
  </React.StrictMode>
);
