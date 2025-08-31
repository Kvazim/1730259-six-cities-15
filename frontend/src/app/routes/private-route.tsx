import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../shared/lib/const/const';
import { useAppSelector } from '../../shared/lib/redux';
import { authStatus } from '../../entities';

type PrivateRouteProps = {
  children: JSX.Element;
  isReverse?: boolean;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { children, isReverse } = props;
  const authorizationStatus = useAppSelector(authStatus);

  return (
    authorizationStatus === (isReverse ? AuthorizationStatus.NoAuth : AuthorizationStatus.Auth)
      ? children
      : <Navigate to={isReverse ? AppRoute.Root : AppRoute.Login} replace />
  );
}

export default PrivateRoute;
