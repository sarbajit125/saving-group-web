import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RootRoute, Router, RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MantineProvider, createTheme } from '@mantine/core';

// Create a root route
const rootRoute = new RootRoute({
  component: App,
});
const theme = createTheme({
  /** Put your mantine theme override here */
});
// Create the route tree using your routes
const routeTree = rootRoute.addChildren([]);
// Create the router using your route tree
const router = new Router({ routeTree });

// Create a client
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <MantineProvider theme={theme}>
      <RouterProvider router={router} />
      </MantineProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
