import type { City, Offer } from '../types/offer';
import type { Review } from '../types/review';
import { changeCity, loadOffers, setSortType, setOffersLoadingStatus, requireAuthorization, loadOffer, loadNearbyOffers, loadReviews, loadFavoriteOffers, updateOfferFavoriteStatus, type SortType } from './action';
import { AuthorizationStatus } from '../const';

type CityName = City['name'];

type State = {
  city: CityName;
  offers: Offer[];
  sortType: SortType;
  isOffersLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  currentOffer: Offer | null;
  nearbyOffers: Offer[];
  reviews: Review[];
  favoriteOffers: Offer[];
  favoriteCount: number;
};

const initialState: State = {
  city: 'Paris',
  offers: [],
  sortType: 'Popular',
  isOffersLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  currentOffer: null,
  nearbyOffers: [],
  reviews: [],
  favoriteOffers: [],
  favoriteCount: 0,
};

type Action = ReturnType<typeof changeCity> | ReturnType<typeof loadOffers> | ReturnType<typeof setSortType> | ReturnType<typeof setOffersLoadingStatus> | ReturnType<typeof requireAuthorization> | ReturnType<typeof loadOffer> | ReturnType<typeof loadNearbyOffers> | ReturnType<typeof loadReviews> | ReturnType<typeof loadFavoriteOffers> | ReturnType<typeof updateOfferFavoriteStatus>;

function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case 'CHANGE_CITY':
      return { ...state, city: action.payload };
    case 'LOAD_OFFERS':
      return { ...state, offers: action.payload };
    case 'SET_SORT_TYPE':
      return { ...state, sortType: action.payload };
    case 'SET_OFFERS_LOADING_STATUS':
      return { ...state, isOffersLoading: action.payload };
    case 'REQUIRE_AUTHORIZATION':
      return { ...state, authorizationStatus: action.payload };
    case 'LOAD_OFFER':
      return { ...state, currentOffer: action.payload };
    case 'LOAD_NEARBY_OFFERS':
      return { ...state, nearbyOffers: action.payload };
    case 'LOAD_REVIEWS':
      return { ...state, reviews: action.payload };
    case 'LOAD_FAVORITE_OFFERS':
      return { ...state, favoriteOffers: action.payload, favoriteCount: action.payload.length };
    case 'UPDATE_OFFER_FAVORITE_STATUS': {
      const { offerId, isFavorite } = action.payload;
      const updatedOffers = state.offers.map((offer) =>
        offer.id === offerId ? { ...offer, isFavorite } : offer
      );
      const updatedNearbyOffers = state.nearbyOffers.map((offer) =>
        offer.id === offerId ? { ...offer, isFavorite } : offer
      );
      const updatedCurrentOffer = state.currentOffer?.id === offerId
        ? { ...state.currentOffer, isFavorite }
        : state.currentOffer;
      return {
        ...state,
        offers: updatedOffers,
        nearbyOffers: updatedNearbyOffers,
        currentOffer: updatedCurrentOffer,
      };
    }
    default:
      return state;
  }
}

export default reducer;

