import {
  Outlet,
  Route,
  Router,
  RouterProvider,
  NotFoundRoute,
  redirect,
  Navigate,
  rootRouteWithContext,
} from '@tanstack/react-router';
import { LoginPage } from './pages/Login.page';
import { RegisterPage } from './pages/Register.page';
import { NotFoundPage } from './pages/NotFound.page';
import { HomePage } from './pages/Home.page';
import { useAuthStore } from './store/authStore';
import GroupList from './pages/GroupList.page';

// Create a root route
const rootRoute = rootRouteWithContext<RouterAuthContext>()({
  component: () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    return (
      <>
        <Outlet />
        {isAuthenticated ? <Navigate to="/user/home" /> : <Navigate to="/lobby" />}
      </>
    );
  },
});
// Login route
const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
});
// Register route
const registerRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: RegisterPage,
});
// authenticated route
const userRoute = new Route({
  id: 'authenticated',
  getParentRoute: () => rootRoute,
  path: 'user',
  beforeLoad: (opts) => {
   // console.log(opts.context.isAuthValidated);
    if (!opts.context.isAuthValidated) {
      throw redirect({
        to: '/login',
        search: {
          redirect: opts.location.href,
        },
      });
    }
  },
});
// home route
const homeRoute = new Route({
  getParentRoute: () => userRoute,
  path: 'home',
  component: HomePage,
});
const lobbyRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'lobby',
  component: GroupList,
});
const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: NotFoundPage,
});
// Create the route tree using your routes
const routeTree = rootRoute.addChildren([
  loginRoute,
  registerRoute,
  lobbyRoute,
  userRoute.addChildren([homeRoute]),
]);
// Create the router using your route tree
const router = new Router({
  routeTree,
  notFoundRoute,
  context: {
    isAuthValidated: false,
  },
});
export function AppRouter() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  console.log(isAuthenticated);
  return (
    <RouterProvider
      router={router}
      context={{ isAuthValidated: isAuthenticated }}
    />
  );
}

declare module '@tanstack/react-router' {
  interface Register {
    // This infers the type of our router and registers it across your entire project
    router: typeof router;
  }
}

export interface RouterAuthContext {
  isAuthValidated: boolean
}
