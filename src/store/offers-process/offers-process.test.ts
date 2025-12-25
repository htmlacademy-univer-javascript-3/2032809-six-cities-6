import offersProcessReducer from './offers-process';
import {
  changeCity,
  loadFavoriteOffers,
  loadOffers,
  setOffersLoadingStatus,
  setOffersError,
  setSortType,
  updateOfferFavoriteStatus,
} from '../action';
import { makeFakeOffer } from '../../utils/test-mocks';

describe('Reducer: offersProcess', () => {
  it('должен вернуть начальное состояние при неизвестном экшене', () => {
    const result = offersProcessReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(result).toEqual({
      city: 'Paris',
      offers: [],
      sortType: 'Popular',
      isOffersLoading: false,
      favoriteOffers: [],
      favoriteCount: 0,
      offersError: false,
    });
  });

  it('должен изменить город при changeCity', () => {
    const state = offersProcessReducer(undefined, changeCity('Amsterdam'));

    expect(state.city).toBe('Amsterdam');
  });

  it('должен загрузить предложения при loadOffers', () => {
    const offers = [makeFakeOffer({ id: '1' }), makeFakeOffer({ id: '2' })];

    const state = offersProcessReducer(undefined, loadOffers(offers));

    expect(state.offers).toEqual(offers);
  });

  it('должен установить тип сортировки при setSortType', () => {
    const state = offersProcessReducer(undefined, setSortType('Top rated first'));

    expect(state.sortType).toBe('Top rated first');
  });

  it('должен установить флаг загрузки при setOffersLoadingStatus', () => {
    const state = offersProcessReducer(undefined, setOffersLoadingStatus(true));

    expect(state.isOffersLoading).toBe(true);
  });

  it('должен установить флаг ошибки при setOffersError', () => {
    const state = offersProcessReducer(undefined, setOffersError(true));

    expect(state.offersError).toBe(true);
  });

  it('должен загрузить избранные предложения и посчитать количество', () => {
    const favorites = [makeFakeOffer({ id: 'fav-1', isFavorite: true })];

    const state = offersProcessReducer(undefined, loadFavoriteOffers(favorites));

    expect(state.favoriteOffers).toEqual(favorites);
    expect(state.favoriteCount).toBe(1);
  });

  it('должен обновить признак избранного для предложения', () => {
    const offer = makeFakeOffer({ id: '3', isFavorite: false });
    const initialState = offersProcessReducer(undefined, loadOffers([offer]));

    const state = offersProcessReducer(initialState, updateOfferFavoriteStatus('3', true));

    expect(state.offers[0].isFavorite).toBe(true);
  });
});

