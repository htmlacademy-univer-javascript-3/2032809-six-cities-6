import OfferCard from '../offer-card/offer-card';
import type { Offer } from '../../types/offer';

type OffersListProps = {
  offers: Offer[];
  onOfferHover?: (offerId: string | null) => void;
  variant?: 'cities' | 'favorites' | 'near-places';
};

function OffersList({ offers, onOfferHover, variant = 'cities' }: OffersListProps): JSX.Element {
  const wrapperClass = (() => {
    if (variant === 'favorites') {
      return 'favorites__places';
    }
    if (variant === 'near-places') {
      return 'near-places__list places__list';
    }
    return 'cities__places-list places__list tabs__content';
  })();

  return (
    <div className={wrapperClass}>
      {offers.map((offer) => (
        <div
          key={offer.id}
          onMouseEnter={() => onOfferHover?.(offer.id)}
          onMouseLeave={() => onOfferHover?.(null)}
        >
          <OfferCard offer={offer} variant={variant} />
        </div>
      ))}
    </div>
  );
}

export default OffersList;


