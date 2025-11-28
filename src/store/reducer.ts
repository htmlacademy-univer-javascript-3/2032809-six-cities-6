import type { City, Offer } from '../types/offer';
import { changeCity, loadOffers, setSortType, type SortType } from './action';

type CityName = City['name'];

type State = {
  city: CityName;
  offers: Offer[];
  sortType: SortType;
};

const initialState: State = {
  city: 'Paris',
  offers: [],
  sortType: 'Popular',
};

type Action = ReturnType<typeof changeCity> | ReturnType<typeof loadOffers> | ReturnType<typeof setSortType>;

function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case 'CHANGE_CITY':
      return { ...state, city: action.payload };
    case 'LOAD_OFFERS':
      return { ...state, offers: action.payload };
    case 'SET_SORT_TYPE':
      return { ...state, sortType: action.payload };
    default:
      return state;
  }
}

export default reducer;

