import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
  isAuthorized: boolean;
  children: JSX.Element;
};

function PrivateRoute({ isAuthorized, children }: PrivateRouteProps): JSX.Element {
  return isAuthorized ? children : <Navigate to="/login" />;
}

export default PrivateRoute;


