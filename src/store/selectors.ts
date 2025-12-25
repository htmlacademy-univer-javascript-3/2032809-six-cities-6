import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from './index';
import type { Offer, City } from '../types/offer';
import type { SortType } from './action';

const CITY_COORDINATES: Record<City['name'], { latitude: number; longitude: number; zoom: number }> = {
  Paris: { latitude: 48.85661, longitude: 2.351499, zoom: 13 },
  Cologne: { latitude: 50.938361, longitude: 6.959974, zoom: 13 },
  Brussels: { latitude: 50.846557, longitude: 4.351697, zoom: 13 },
  Amsterdam: { latitude: 52.38333, longitude: 4.9, zoom: 13 },
  Hamburg: { latitude: 53.550341, longitude: 10.000654, zoom: 13 },
  Dusseldorf: { latitude: 51.225402, longitude: 6.776314, zoom: 13 },
};

export const getCity = (state: RootState) => state.offersProcess.city;
export const getOffers = (state: RootState) => state.offersProcess.offers;
export const getSortType = (state: RootState) => state.offersProcess.sortType;
export const getIsOffersLoading = (state: RootState) => state.offersProcess.isOffersLoading;
export const getOffersError = (state: RootState) => state.offersProcess.offersError;
export const getAuthorizationStatus = (state: RootState) => state.userProcess.authorizationStatus;
export const getUserData = (state: RootState) => state.userProcess.userData;
export const getCurrentOffer = (state: RootState) => state.offerProcess.currentOffer;
export const getNearbyOffers = (state: RootState) => state.offerProcess.nearbyOffers;
export const getReviews = (state: RootState) => state.offerProcess.reviews;
export const getFavoriteOffers = (state: RootState) => state.offersProcess.favoriteOffers;
export const getFavoriteCount = (state: RootState) => state.offersProcess.favoriteCount;

export const getCityOffers = createSelector(
  [getOffers, getCity],
  (offers: Offer[], city: City['name']) => offers.filter((offer) => offer.city.name === city)
);

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

export const getSortedCityOffers = createSelector(
  [getCityOffers, getSortType],
  (cityOffers: Offer[], sortType: SortType) => sortOffers(cityOffers, sortType)
);

export const getCityData = createSelector(
  [getCityOffers, getCity],
  (cityOffers: Offer[], city: City['name']): City => {
    if (cityOffers.length > 0) {
      return cityOffers[0].city;
    }
    return { name: city, location: CITY_COORDINATES[city] };
  }
);

