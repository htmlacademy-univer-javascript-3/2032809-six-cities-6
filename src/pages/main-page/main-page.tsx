import { useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OffersList from '../../components/offers-list/offers-list.tsx';
import Map from '../../components/map/map.tsx';
import CitiesList from '../../components/cities-list/cities-list.tsx';
import SortOptions from '../../components/sort-options/sort-options.tsx';
import Spinner from '../../components/spinner/spinner.tsx';
import EmptyMain from '../../components/empty-main/empty-main.tsx';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { logout } from '../../store/action';
import { getSortedCityOffers, getCityData, getCity, getIsOffersLoading, getAuthorizationStatus, getFavoriteCount, getUserData, getOffersError } from '../../store/selectors';
import type { AppDispatch } from '../../store';

function MainPage(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const city = useSelector(getCity);
  const sortedOffers = useSelector(getSortedCityOffers);
  const cityData = useSelector(getCityData);
  const isOffersLoading = useSelector(getIsOffersLoading);
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const favoriteCount = useSelector(getFavoriteCount);
  const userData = useSelector(getUserData);
  const hasOffersError = useSelector(getOffersError);
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const isAuthorized = useMemo(() => authorizationStatus === AuthorizationStatus.Auth, [authorizationStatus]);
  const cityOffersCount = useMemo(() => sortedOffers.length, [sortedOffers.length]);
  const userEmail = userData?.email ?? '';

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const handleActiveOfferChange = useCallback((offerId: string | null) => {
    setActiveOfferId(offerId);
  }, []);

  const renderContent = () => {
    if (hasOffersError) {
      return (
        <div className="cities__places-container container">
          <section className="cities__no-places">
            <div className="cities__status-wrapper tabs__content">
              <b className="cities__status">Failed to load offers</b>
              <p className="cities__status-description">Please try again later.</p>
            </div>
          </section>
        </div>
      );
    }

    if (isOffersLoading) {
      return (
        <div className="cities__places-container container">
          <Spinner />
        </div>
      );
    }

    if (cityOffersCount === 0) {
      return <EmptyMain city={city} />;
    }

    return (
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{cityOffersCount} places to stay in {city}</b>
          <SortOptions />

          <OffersList offers={sortedOffers} variant="cities" onActiveChange={handleActiveOfferChange} />
        </section>

        <div className="cities__right-section">
          <Map className="cities__map map" city={cityData} offers={sortedOffers} activeOfferId={activeOfferId} />
        </div>
      </div>
    );
  };

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link header__logo-link--active" to="/">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                {isAuthorized ? (
                  <>
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                        <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                        <span className="header__user-name user__name">{userEmail}</span>
                        <span className="header__favorite-count">{favoriteCount}</span>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <Link className="header__nav-link" to={AppRoute.Main} onClick={handleLogout}>
                        <span className="header__signout">Sign out</span>
                      </Link>
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

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiesList />
        </div>

        <div className="cities">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default MainPage;
