import { RootRoute, Router, RouterProvider } from '@tanstack/react-router';
import { HomePage } from './pages/Home.page';
import { LoginPage } from './pages/Login.page';

// Create a root route
const rootRoute = new RootRoute({
  component: LoginPage,
});

// Create the route tree using your routes
const routeTree = rootRoute.addChildren([]);
// Create the router using your route tree
const router = new Router({ routeTree });
export function AppRouter() {
  return <RouterProvider router={router} />;
}
