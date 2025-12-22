import { memo, useState, useCallback } from 'react';
import OfferCard from '../offer-card/offer-card.tsx';
import type { Offer } from '../../types/offer';

type OffersListProps = {
  offers: Offer[];
  variant?: 'cities' | 'favorites' | 'near-places';
  onActiveChange?: (offerId: string | null) => void;
};

function OffersList({ offers, variant = 'cities', onActiveChange }: OffersListProps): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const handleHover = useCallback((offerId: string | null) => {
    setActiveOfferId(offerId);
    onActiveChange?.(offerId);
  }, [onActiveChange]);

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
        <OfferCard key={offer.id} offer={offer} onHover={handleHover} variant={variant} />
      ))}
      {/* activeOfferId зарезервирован для карты */}
      {activeOfferId ? <span className="visually-hidden">Active offer: {activeOfferId}</span> : null}
    </div>
  );
}

const MemoOffersList = memo(OffersList);

export default MemoOffersList;
