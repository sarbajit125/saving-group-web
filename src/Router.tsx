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
import GroupDashboard from './pages/GroupDashbord.page';
import UserManagement from './pages/UserManagement.page';
import GroupAddMoney from './pages/GroupAddMoney.page';
import CreateGroupPage from './pages/CreateGroup.page';

// Create a root route
const rootRoute = rootRouteWithContext<RouterAuthContext>()({
  component: () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    return (
      <>
        <Outlet />
        {isAuthenticated ? <Navigate to="/user/home" /> : <Navigate to="/login" />}
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
       redirect({
        to: '/login',
        search: {
          redirect: opts.location.href,
        },
      });
    }
  },
});
// Group route
const groupRoute = new Route({
  getParentRoute: () => userRoute,
  path: 'group',
});
// Group dashboard route
export const dashboardRoute = new Route({
  getParentRoute: () => groupRoute,
  path: 'dashboard/$groupId',
  component: GroupDashboard,
});
// Group User management route
const groupManagement = new Route({
  getParentRoute: () => groupRoute,
  path: 'user-management',
  component: UserManagement,
});
// Add money to group
const addMoneyGroup = new Route({
  getParentRoute: () => groupRoute,
  path: 'group-transaction',
  component: GroupAddMoney,
});
// home route
const homeRoute = new Route({
  getParentRoute: () => userRoute,
  path: 'home',
  component: HomePage,
});
// Group lobby page
const lobbyRoute = new Route({
  getParentRoute: () => groupRoute,
  path: 'lobby',
  component: GroupList,
});
// Create new group page
const createGroupRoute = new Route({
  getParentRoute: () => groupRoute,
  path: 'create-group',
  component: CreateGroupPage,
});
const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: NotFoundPage,
});
// Create the route tree using your routes
const routeTree = rootRoute.addChildren([
  loginRoute,
  registerRoute,
  userRoute.addChildren([
    homeRoute,
    groupRoute.addChildren([
      lobbyRoute,
      dashboardRoute,
      groupManagement,
      addMoneyGroup,
      createGroupRoute,
    ]),
  ]),
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
  return <RouterProvider router={router} context={{ isAuthValidated: isAuthenticated }} />;
}

declare module '@tanstack/react-router' {
  interface Register {
    // This infers the type of our router and registers it across your entire project
    router: typeof router;
  }
}

export interface RouterAuthContext {
  isAuthValidated: boolean;
}
