import { ROUTES } from '../constants/NavLinksConstant';
import { useAuthStore } from '../store/authStore';
import { Navigate, Outlet } from 'react-router-dom';

const RootPage = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return (
    <div>
      <Outlet />
      {!isAuthenticated ? <Navigate to={ROUTES.LOGIN} /> : null}
    </div>
  );
};
export default RootPage;