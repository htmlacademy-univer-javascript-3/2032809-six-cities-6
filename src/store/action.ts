import type { City, Offer } from '../types/offer';

type CityName = City['name'];

export const changeCity = (city: CityName) => ({
  type: 'CHANGE_CITY' as const,
  payload: city,
});

export const loadOffers = (offers: Offer[]) => ({
  type: 'LOAD_OFFERS' as const,
  payload: offers,
});

