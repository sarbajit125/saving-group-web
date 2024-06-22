import { RouteObject, createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { LoginPage } from './pages/Login.page';
import { RegisterPage } from './pages/Register.page';
import { NotFoundPage } from './pages/NotFound.page';
import { HomePage } from './pages/Home.page';
import { useAuthStore } from './store/authStore';
import GroupList from './pages/GroupList.page';
import GroupDashboard from './pages/GroupDashbord.page';
import GroupLayout from './pages/_groupLayout';
import GroupSettings from './pages/GroupSettings.page';
import RootPage from './pages/Root';
import LoadingScreen from './pages/Loading.page';

const Loadable = (Component: any) => (props: JSX.IntrinsicAttributes) => (
  <Suspense fallback={<LoadingScreen />}>
    <Component {...props} />
  </Suspense>
);
// Create the route tree using your routes
const routeTree: RouteObject[] = [
  {
    path: '/',
    element: <RootPage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: 'auth',
        children: [
          {
            path: 'login',
            element: <LoginPage />,
          },
          {
            path: 'register',
            element: <RegisterPage />,
          },
        ],
      },
      {
        path: 'user',
        children: [
          {
            path: 'home',
            element: <HomePage />,
          },
          {
            path: 'group-lobby',
            element: <GroupList />,
          },
          {
            path: 'group',
            element: <GroupLayout />,
            children: [
              {
                path: 'dashboard/:groupId',
                element: <GroupDashboard />,
              },
              {
                path: 'settings',
                element: <GroupSettings />,
              },
            ],
          },
        ],
      },
    ],
  },
];
const router = createBrowserRouter(routeTree, {});
export function AppRouter() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  console.log(isAuthenticated);
  return <RouterProvider router={router} />;
}

export interface RouterAuthContext {
  isAuthValidated: boolean;
}
