import { memo, useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppRoute, AuthorizationStatus } from '../../const';
import { toggleFavoriteStatus } from '../../store/action';
import { getAuthorizationStatus } from '../../store/selectors';
import type { Offer } from '../../types/offer';
import type { AppDispatch } from '../../store/index';

const MAX_RATING = 5;

type OfferCardProps = {
  offer: Offer;
  onHover?: (offerId: string | null) => void;
  variant?: 'cities' | 'favorites' | 'near-places';
};

function OfferCard({ offer, onHover, variant = 'cities' }: OfferCardProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const { id, isPremium, images, previewImage, price, isFavorite, rating, title, type } = offer;
  const imageUrl = useMemo(() => previewImage || (images && images.length > 0 ? images[0] : ''), [previewImage, images]);
  const wrapperClass = useMemo(() => {
    if (variant === 'favorites') {
      return 'favorites__image-wrapper place-card__image-wrapper';
    }
    if (variant === 'near-places') {
      return 'near-places__image-wrapper place-card__image-wrapper';
    }
    return 'cities__image-wrapper place-card__image-wrapper';
  }, [variant]);

  const handleMouseEnter = useCallback(() => {
    onHover?.(id);
  }, [onHover, id]);

  const handleMouseLeave = useCallback(() => {
    onHover?.(null);
  }, [onHover]);

  const ratingPercent = useMemo(() => (Math.round(rating) / MAX_RATING) * 100, [rating]);

  const handleFavoriteClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
      return;
    }
    dispatch(toggleFavoriteStatus(id, isFavorite));
  }, [authorizationStatus, dispatch, id, isFavorite, navigate]);

  return (
    <article
      className={`${variant}__card place-card`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}

      <div className={wrapperClass}>
        <Link to={`${AppRoute.Offer}/${id}`}>
          <img className="place-card__image" src={imageUrl} width={260} height={200} alt="Place image" />
        </Link>
      </div>

      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${
              isFavorite ? 'place-card__bookmark-button--active' : ''
            }`}
            type="button"
            onClick={handleFavoriteClick}
          >
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">
              {isFavorite ? 'In bookmarks' : 'To bookmarks'}
            </span>
          </button>
        </div>

        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${ratingPercent}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>

        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

const MemoOfferCard = memo(OfferCard);

export default MemoOfferCard;
