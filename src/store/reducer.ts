import type { City, Offer } from '../types/offer';
import { changeCity, loadOffers, setSortType, setOffersLoadingStatus, type SortType } from './action';

type CityName = City['name'];

type State = {
  city: CityName;
  offers: Offer[];
  sortType: SortType;
  isOffersLoading: boolean;
};

const initialState: State = {
  city: 'Paris',
  offers: [],
  sortType: 'Popular',
  isOffersLoading: false,
};

type Action = ReturnType<typeof changeCity> | ReturnType<typeof loadOffers> | ReturnType<typeof setSortType> | ReturnType<typeof setOffersLoadingStatus>;

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
    default:
      return state;
  }
}

export default reducer;

