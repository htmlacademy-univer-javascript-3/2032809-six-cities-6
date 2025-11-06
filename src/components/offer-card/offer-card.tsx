import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import type { Offer } from '../../types/offer';

const MAX_RATING = 5;

type OfferCardProps = {
  offer: Offer;
  onHover?: (offerId: string | null) => void;
  variant?: 'cities' | 'favorites' | 'near-places';
};

function OfferCard({ offer, onHover, variant = 'cities' }: OfferCardProps): JSX.Element {
  const { id, isPremium, images, price, isFavorite, rating, title, type } = offer;
  let wrapperClass = 'cities__image-wrapper place-card__image-wrapper';
  if (variant === 'favorites') {
    wrapperClass = 'favorites__image-wrapper place-card__image-wrapper';
  } else if (variant === 'near-places') {
    wrapperClass = 'near-places__image-wrapper place-card__image-wrapper';
  }

  return (
    <article
      className={`${variant}__card place-card`}
      onMouseEnter={() => onHover?.(id)}
      onMouseLeave={() => onHover?.(null)}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}

      <div className={wrapperClass}>
        <Link to={`${AppRoute.Offer}/${id}`}>
          <img className="place-card__image" src={images[0]} width={260} height={200} alt="Place image" />
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
            <span style={{ width: `${(rating / MAX_RATING) * 100}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>

        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type.charAt(0).toUpperCase() + type.slice(1)}</p>
      </div>
    </article>
  );
}

export default OfferCard;
