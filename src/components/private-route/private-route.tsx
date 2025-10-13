import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';

type PrivateRouteProps = {
  isAuthorized: boolean;
  children: JSX.Element;
};

function PrivateRoute({ isAuthorized, children }: PrivateRouteProps): JSX.Element {
  return isAuthorized ? children : <Navigate to={AppRoute.Login} />;
}

export default PrivateRoute;


