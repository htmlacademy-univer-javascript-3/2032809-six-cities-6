import { useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CommentForm from '../../components/comment-form/comment-form.tsx';
import ReviewsList from '../../components/reviews-list/reviews-list.tsx';
import Map from '../../components/map/map.tsx';
import OffersList from '../../components/offers-list/offers-list.tsx';
import Spinner from '../../components/spinner/spinner.tsx';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { fetchOffer, fetchNearbyOffers, fetchReviews, logout, postComment, toggleFavoriteStatus } from '../../store/action';
import { getCurrentOffer, getNearbyOffers, getReviews, getAuthorizationStatus, getFavoriteCount, getUserData } from '../../store/selectors';
import type { AppDispatch } from '../../store/index';

const MAX_RATING = 5;

function OfferPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const currentOffer = useSelector(getCurrentOffer);
  const nearbyOffers = useSelector(getNearbyOffers);
  const reviews = useSelector(getReviews);
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const favoriteCount = useSelector(getFavoriteCount);
  const userData = useSelector(getUserData);
  const isAuthorized = useMemo(() => authorizationStatus === AuthorizationStatus.Auth, [authorizationStatus]);
  const userEmail = userData?.email ?? '';

  useEffect(() => {
    if (id) {
      dispatch(fetchOffer(id)).then(() => {
        // Проверка будет в следующем useEffect
      });
      dispatch(fetchNearbyOffers(id));
      dispatch(fetchReviews(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (id && currentOffer === null) {
      const timer = setTimeout(() => {
        navigate(AppRoute.NotFound);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentOffer, id, navigate]);

  const handleCommentSubmit = useCallback(async (rating: number, comment: string) => {
    if (id) {
      await dispatch(postComment(id, { comment, rating }));
    }
  }, [id, dispatch]);

  const displayImages = useMemo(() => {
    if (!currentOffer) {
      return [];
    }
    return currentOffer.images && currentOffer.images.length > 0 ? currentOffer.images.slice(0, 6) : [];
  }, [currentOffer]);
  const ratingPercent = useMemo(() => {
    if (!currentOffer) {
      return 0;
    }
    return (Math.round(currentOffer.rating) / MAX_RATING) * 100;
  }, [currentOffer]);
  const mapOffers = useMemo(() => {
    if (!currentOffer) {
      return nearbyOffers.slice(0, 3);
    }
    return [...nearbyOffers.slice(0, 3), currentOffer];
  }, [nearbyOffers, currentOffer]);
  const nearbyOffersForList = useMemo(() => nearbyOffers.slice(0, 3), [nearbyOffers]);

  const handleFavoriteClick = useCallback(() => {
    if (!currentOffer) {
      return;
    }
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
      return;
    }
    dispatch(toggleFavoriteStatus(currentOffer.id, currentOffer.isFavorite));
  }, [authorizationStatus, currentOffer, dispatch, navigate]);

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  if (!currentOffer) {
    return <Spinner />;
  }

  const { title, description, isPremium, rating, type, bedrooms, maxAdults, price, goods, host } = currentOffer;

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.Main}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
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
                      <button className="header__nav-link" type="button" onClick={handleLogout} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
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

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {displayImages.map((image) => (
                <div key={image} className="offer__image-wrapper">
                  <img className="offer__image" src={image} alt="Photo"/>
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{title}</h1>
                <button
                  className={`offer__bookmark-button button ${currentOffer.isFavorite ? 'offer__bookmark-button--active' : ''}`}
                  type="button"
                  onClick={handleFavoriteClick}
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">
                    {currentOffer.isFavorite ? 'In bookmarks' : 'To bookmarks'}
                  </span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: `${ratingPercent}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {bedrooms} {bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {maxAdults} {maxAdults === 1 ? 'adult' : 'adults'}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {goods.map((good) => (
                    <li key={good} className="offer__inside-item">
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={`offer__avatar-wrapper ${host.isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                    <img className="offer__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="offer__user-name">{host.name}</span>
                  {host.isPro && <span className="offer__user-status">Pro</span>}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{description}</p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <ReviewsList reviews={reviews} />
                {isAuthorized && <CommentForm onSubmit={handleCommentSubmit} />}
              </section>
            </div>
          </div>
          <Map className="offer__map map" city={currentOffer.city} offers={mapOffers} activeOfferId={currentOffer.id} />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OffersList offers={nearbyOffersForList} variant="near-places" />
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
