import type { City, Offer } from '../types/offer';
import { changeCity, loadOffers } from './action';

type CityName = City['name'];

type State = {
  city: CityName;
  offers: Offer[];
};

const initialState: State = {
  city: 'Paris',
  offers: [],
};

type Action = ReturnType<typeof changeCity> | ReturnType<typeof loadOffers>;

function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case 'CHANGE_CITY':
      return { ...state, city: action.payload };
    case 'LOAD_OFFERS':
      return { ...state, offers: action.payload };
    default:
      return state;
  }
}

export default reducer;

