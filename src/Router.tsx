import { RouteObject, createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Suspense } from 'react';
import { LoginPage } from './pages/Login.page';
import { RegisterPage } from './pages/Register.page';
import { NotFoundPage } from './pages/NotFound.page';
import { useAuthStore } from './store/authStore';
import GroupList from './pages/GroupList.page';
import GroupDashboard from './pages/GroupDashbord.page';
import GroupLayout from './pages/_groupLayout';
import GroupSettings from './pages/GroupSettings.page';
import RootPage from './pages/Root';
import LoadingScreen from './pages/Loading.page';
import UserManagement from './pages/UserManagement.page';
import GroupAddMoney from './pages/GroupAddMoney.page';

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
            lazy: async () => {
              const Page = (await import('./pages/Home.page')).default;
              const Result = Loadable(Page);
              return {
                element: <Result />,
              };
            },
          },
          {
            path: 'group-lobby',
            element: <GroupList />,
          },
          {
            path: 'group/:groupId',
            element: <GroupLayout />,
            children: [
              {
                path: 'dashboard',
                element: <GroupDashboard />,
              },
              {
                path: 'settings',
                element: <GroupSettings />,
              },
              {
                path: 'member-management',
                element: <UserManagement />,
              },
              {
                path: 'transfer-money',
                element: <GroupAddMoney />,
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
