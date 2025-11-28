import type { City, Offer } from '../types/offer';

type CityName = City['name'];

export type SortType = 'Popular' | 'Price: low to high' | 'Price: high to low' | 'Top rated first';

export const changeCity = (city: CityName) => ({
  type: 'CHANGE_CITY' as const,
  payload: city,
});

export const loadOffers = (offers: Offer[]) => ({
  type: 'LOAD_OFFERS' as const,
  payload: offers,
});

export const setSortType = (sortType: SortType) => ({
  type: 'SET_SORT_TYPE' as const,
  payload: sortType,
});

