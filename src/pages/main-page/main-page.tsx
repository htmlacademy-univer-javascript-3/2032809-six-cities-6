import { useState } from 'react';
import { useSelector } from 'react-redux';
import OffersList from '../../components/offers-list/offers-list.tsx';
import Map from '../../components/map/map.tsx';
import CitiesList from '../../components/cities-list/cities-list.tsx';
import SortOptions from '../../components/sort-options/sort-options.tsx';
import Spinner from '../../components/spinner/spinner.tsx';
import { Link } from 'react-router-dom';
import type { RootState } from '../../store/index';
import type { Offer, City } from '../../types/offer';
import type { SortType } from '../../store/action';

const CITY_COORDINATES: Record<City['name'], { latitude: number; longitude: number; zoom: number }> = {
  Paris: { latitude: 48.85661, longitude: 2.351499, zoom: 13 },
  Cologne: { latitude: 50.938361, longitude: 6.959974, zoom: 13 },
  Brussels: { latitude: 50.846557, longitude: 4.351697, zoom: 13 },
  Amsterdam: { latitude: 52.38333, longitude: 4.9, zoom: 13 },
  Hamburg: { latitude: 53.550341, longitude: 10.000654, zoom: 13 },
  Dusseldorf: { latitude: 51.225402, longitude: 6.776314, zoom: 13 },
};

function sortOffers(offers: Offer[], sortType: SortType): Offer[] {
  const sortedOffers = [...offers];
  switch (sortType) {
    case 'Popular':
      return sortedOffers;
    case 'Price: low to high':
      return sortedOffers.sort((a, b) => a.price - b.price);
    case 'Price: high to low':
      return sortedOffers.sort((a, b) => b.price - a.price);
    case 'Top rated first':
      return sortedOffers.sort((a, b) => b.rating - a.rating);
    default:
      return sortedOffers;
  }
}

function MainPage(): JSX.Element {
  const city = useSelector((state: RootState) => state.city);
  const allOffers = useSelector((state: RootState) => state.offers);
  const sortType = useSelector((state: RootState) => state.sortType);
  const isOffersLoading = useSelector((state: RootState) => state.isOffersLoading);
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const cityOffers = allOffers.filter((offer: Offer) => offer.city.name === city);
  const sortedOffers = sortOffers(cityOffers, sortType);
  const cityData: City = cityOffers.length > 0
    ? cityOffers[0].city
    : { name: city, location: CITY_COORDINATES[city] };

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
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to="/favorites">
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link className="header__nav-link" to="/login">
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
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
          <div className="cities__places-container container">
            {isOffersLoading ? (
              <Spinner />
            ) : (
              <>
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{cityOffers.length} places to stay in {city}</b>
                  <SortOptions />

                  <OffersList offers={sortedOffers} variant="cities" onActiveChange={setActiveOfferId} />
                </section>

                <div className="cities__right-section">
                  <Map className="cities__map map" city={cityData} offers={sortedOffers} activeOfferId={activeOfferId} />
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
