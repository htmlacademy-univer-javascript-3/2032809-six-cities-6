import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import { AppRoute, AuthorizationStatus } from '../../const';
import type { RootState } from '../../store/index';

function App(): JSX.Element {
  const authorizationStatus = useSelector((state: RootState) => state.authorizationStatus);
  const isAuthorized = authorizationStatus === AuthorizationStatus.Auth;

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage />} />
        <Route
          path={AppRoute.Login}
          element={isAuthorized ? <Navigate to={AppRoute.Main} /> : <LoginPage />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route path={`${AppRoute.Offer}/:id`} element={<OfferPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
