import { useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OffersList from '../../components/offers-list/offers-list.tsx';
import type { Offer } from '../../types/offer';
import { Link } from 'react-router-dom';
import { fetchFavoriteOffers, logout } from '../../store/action';
import { getAuthorizationStatus, getFavoriteOffers, getFavoriteCount, getUserData } from '../../store/selectors';
import type { AppDispatch } from '../../store/index';
import { AppRoute, AuthorizationStatus } from '../../const';

function FavoritesPage(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const favoriteOffers = useSelector(getFavoriteOffers);
  const favoriteCount = useSelector(getFavoriteCount);
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const userData = useSelector(getUserData);
  const isAuthorized = useMemo(() => authorizationStatus === AuthorizationStatus.Auth, [authorizationStatus]);
  const userEmail = userData?.email ?? '';

  useEffect(() => {
    dispatch(fetchFavoriteOffers());
  }, [dispatch]);

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const groupedByCity = useMemo(
    () =>
      favoriteOffers.reduce<Record<string, Offer[]>>((acc, offer) => {
        const cityName = offer.city.name;
        if (!acc[cityName]) {
          acc[cityName] = [];
        }
        acc[cityName].push(offer);
        return acc;
      }, {}),
    [favoriteOffers]
  );
  const isEmpty = favoriteOffers.length === 0;

  return (
    <div className={`page ${isEmpty ? 'page--favorites-empty' : ''}`}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.Main}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                {isAuthorized ? (
                  <>
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                        <div className="header__avatar-wrapper user__avatar-wrapper">
                        </div>
                        <span className="header__user-name user__name">{userEmail}</span>
                        <span className="header__favorite-count">{favoriteCount}</span>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <button className="header__nav-link" onClick={handleLogout} type="button" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
                        <span className="header__signout">Sign out</span>
                      </button>
                    </li>
                  </>
                ) : (
                  <li className="header__nav-item">
                    <Link className="header__nav-link" to={AppRoute.Login}>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className={`page__main page__main--favorites ${isEmpty ? 'page__main--favorites-empty' : ''}`}>
        <div className="page__favorites-container container">
          {isEmpty ? (
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
              </div>
            </section>
          ) : (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {Object.entries(groupedByCity).map(([city, cityOffers]) => (
                  <li className="favorites__locations-items" key={city}>
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span>{city}</span>
                        </a>
                      </div>
                    </div>
                    <OffersList offers={cityOffers} variant="favorites" />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Main}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}

export default FavoritesPage;
