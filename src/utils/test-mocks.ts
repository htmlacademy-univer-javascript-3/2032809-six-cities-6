import { AuthorizationStatus } from '../const';
import type { RootState } from '../store';
import type { City, Offer } from '../types/offer';
import type { Review } from '../types/review';

export const makeFakeCity = (): City => ({
  name: 'Amsterdam',
  location: {
    latitude: 52.38333,
    longitude: 4.9,
    zoom: 13,
  },
});

export const makeFakeOffer = (overrides: Partial<Offer> = {}): Offer => {
  const city = makeFakeCity();

  return {
    id: 'offer-id',
    title: 'Test title',
    description: 'Test description',
    type: 'apartment',
    price: 100,
    images: ['img1.jpg', 'img2.jpg'],
    previewImage: 'img1.jpg',
    city,
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 8,
    },
    goods: ['Wi-Fi'],
    host: {
      isPro: false,
      name: 'Host',
      avatarUrl: 'img/1.png',
    },
    isPremium: false,
    isFavorite: false,
    rating: 4,
    bedrooms: 2,
    maxAdults: 3,
    ...overrides,
  };
};

export const makeFakeReview = (overrides: Partial<Review> = {}): Review => ({
  id: 'review-id',
  user: {
    name: 'Jane',
    avatarUrl: 'img/avatar.jpg',
    isPro: false,
  },
  rating: 4,
  comment: 'Nice place',
  date: '2020-01-01T00:00:00.000Z',
  ...overrides,
});

export const getInitialRootState = (): RootState => ({
  offersProcess: {
    city: 'Paris',
    offers: [],
    sortType: 'Popular',
    isOffersLoading: false,
    favoriteOffers: [],
    favoriteCount: 0,
    offersError: false,
  },
  userProcess: {
    authorizationStatus: AuthorizationStatus.Unknown,
    userData: null,
  },
  offerProcess: {
    currentOffer: null,
    nearbyOffers: [],
    reviews: [],
  },
});

