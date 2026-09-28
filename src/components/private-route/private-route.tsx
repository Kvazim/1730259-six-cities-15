import { Navigate } from 'react-router';
import { AppRoute, AuthorizationStatus } from '../../const';
import type { ReactNode } from 'react';

interface PrivateRouteProps {
  authorizationStatus: AuthorizationStatus;
  children: ReactNode;
  isReverse?: boolean;
}

function PrivateRoute(props: PrivateRouteProps) {
  const { authorizationStatus, children, isReverse } = props;

  return authorizationStatus ===
    (isReverse ? AuthorizationStatus.NoAuth : AuthorizationStatus.Auth) ? (
    children
  ) : (
    <Navigate to={isReverse ? AppRoute.Root : AppRoute.Login} replace />
  );
}

export default PrivateRoute;
