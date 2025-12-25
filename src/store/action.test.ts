import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../services/api';
import {
  checkAuth,
  fetchFavoriteOffers,
  fetchNearbyOffers,
  fetchOffer,
  fetchOffers,
  fetchReviews,
  loadFavoriteOffers,
  loadNearbyOffers,
  loadOffer,
  loadOffers,
  loadReviews,
  logout,
  postComment,
  requireAuthorization,
  setOffersError,
  setOffersLoadingStatus,
  setUserData,
  toggleFavoriteStatus,
  updateOfferFavoriteStatus,
} from './action';
import type { RootState } from './index';
import { AuthorizationStatus } from '../const';
import { getInitialRootState, makeFakeOffer, makeFakeReview } from '../utils/test-mocks';

type AppThunkDispatch = ThunkDispatch<RootState, ReturnType<typeof createAPI>, Action>;

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<RootState, Action, AppThunkDispatch>(middlewares);

describe('Async actions', () => {
  beforeEach(() => {
    mockAPI.reset();
  });

  it('fetchOffers: успешная загрузка данных', async () => {
    const offers = [makeFakeOffer({ id: '1' })];
    mockAPI.onGet('/offers').reply(200, offers);

    const store = mockStore(getInitialRootState());
    await store.dispatch(fetchOffers());

    expect(store.getActions()).toEqual([
      setOffersLoadingStatus(true),
      setOffersError(false),
      loadOffers(offers),
      setOffersLoadingStatus(false),
    ]);
  });

  it('fetchOffers: ошибка загрузки', async () => {
    mockAPI.onGet('/offers').reply(500);

    const store = mockStore(getInitialRootState());
    await store.dispatch(fetchOffers());

    expect(store.getActions()).toEqual([
      setOffersLoadingStatus(true),
      setOffersError(false),
      setOffersError(true),
      setOffersLoadingStatus(false),
    ]);
  });

  it('fetchOffer: успешная загрузка предложения', async () => {
    const offer = makeFakeOffer({ id: 'offer-1' });
    mockAPI.onGet(`/offers/${offer.id}`).reply(200, offer);

    const store = mockStore(getInitialRootState());
    await store.dispatch(fetchOffer(offer.id));

    expect(store.getActions()).toEqual([loadOffer(offer)]);
  });

  it('fetchOffer: ошибка приводит к загрузке null', async () => {
    const store = mockStore(getInitialRootState());
    mockAPI.onGet('/offers/unknown').reply(404);

    await store.dispatch(fetchOffer('unknown'));

    expect(store.getActions()).toEqual([loadOffer(null)]);
  });

  it('fetchNearbyOffers: успешная загрузка', async () => {
    const id = 'offer-2';
    const offers = [makeFakeOffer({ id: 'n1' })];
    mockAPI.onGet(`/offers/${id}/nearby`).reply(200, offers);

    const store = mockStore(getInitialRootState());
    await store.dispatch(fetchNearbyOffers(id));

    expect(store.getActions()).toEqual([loadNearbyOffers(offers)]);
  });

  it('fetchNearbyOffers: ошибка возвращает пустой список', async () => {
    const id = 'offer-3';
    mockAPI.onGet(`/offers/${id}/nearby`).reply(500);

    const store = mockStore(getInitialRootState());
    await store.dispatch(fetchNearbyOffers(id));

    expect(store.getActions()).toEqual([loadNearbyOffers([])]);
  });

  it('fetchReviews: успешная загрузка', async () => {
    const id = 'offer-4';
    const reviews = [makeFakeReview({ id: 'review-1' })];
    mockAPI.onGet(`/comments/${id}`).reply(200, reviews);

    const store = mockStore(getInitialRootState());
    await store.dispatch(fetchReviews(id));

    expect(store.getActions()).toEqual([loadReviews(reviews)]);
  });

  it('fetchReviews: ошибка возвращает пустой список', async () => {
    const id = 'offer-5';
    mockAPI.onGet(`/comments/${id}`).reply(500);

    const store = mockStore(getInitialRootState());
    await store.dispatch(fetchReviews(id));

    expect(store.getActions()).toEqual([loadReviews([])]);
  });

  it('postComment: успешная отправка и повторная загрузка отзывов', async () => {
    const id = 'offer-6';
    const reviews = [makeFakeReview({ id: 'review-2' })];
    mockAPI.onPost(`/comments/${id}`).reply(200);
    mockAPI.onGet(`/comments/${id}`).reply(200, reviews);

    const store = mockStore(getInitialRootState());
    await store.dispatch(postComment(id, { comment: 'text', rating: 5 }));

    expect(store.getActions()).toEqual([loadReviews(reviews)]);
  });

  it('fetchFavoriteOffers: успешная загрузка', async () => {
    const favorites = [makeFakeOffer({ id: 'fav-1', isFavorite: true })];
    mockAPI.onGet('/favorite').reply(200, favorites);

    const store = mockStore(getInitialRootState());
    await store.dispatch(fetchFavoriteOffers());

    expect(store.getActions()).toEqual([loadFavoriteOffers(favorites)]);
  });

  it('fetchFavoriteOffers: ошибка возвращает пустой список', async () => {
    mockAPI.onGet('/favorite').reply(500);

    const store = mockStore(getInitialRootState());
    await store.dispatch(fetchFavoriteOffers());

    expect(store.getActions()).toEqual([loadFavoriteOffers([])]);
  });

  it('checkAuth: успешная проверка авторизации', async () => {
    const user = { token: 'test', email: 'a@a.ru', name: 'Test', avatarUrl: 'avatar.jpg', isPro: false };
    mockAPI.onGet('/login').reply(200, user);
    const favorites = [makeFakeOffer({ id: 'fav-2' })];
    mockAPI.onGet('/favorite').reply(200, favorites);

    const store = mockStore(getInitialRootState());
    await store.dispatch(checkAuth());

    expect(store.getActions()).toEqual([
      requireAuthorization(AuthorizationStatus.Auth),
      setUserData(user),
      loadFavoriteOffers(favorites),
    ]);
  });

  it('checkAuth: неавторизованный ответ', async () => {
    mockAPI.onGet('/login').reply(401);

    const store = mockStore(getInitialRootState());
    await store.dispatch(checkAuth());

    expect(store.getActions()).toEqual([requireAuthorization(AuthorizationStatus.NoAuth), setUserData(null)]);
  });

  it('toggleFavoriteStatus: обновляет статус и счетчик', async () => {
    const offerId = 'fav-3';
    const updatedOffer = makeFakeOffer({ id: offerId, isFavorite: true });
    const initialState = getInitialRootState();
    initialState.offerProcess.currentOffer = makeFakeOffer({ id: offerId, isFavorite: false });

    mockAPI.onPost(`/favorite/${offerId}/1`).reply(200, updatedOffer);
    mockAPI.onGet('/favorite').reply(200, [updatedOffer]);

    const store = mockStore(initialState);
    await store.dispatch(toggleFavoriteStatus(offerId, false));

    expect(store.getActions()).toEqual([
      updateOfferFavoriteStatus(offerId, true),
      loadOffer(updatedOffer),
      loadFavoriteOffers([updatedOffer]),
    ]);
  });

  it('logout: очищает данные пользователя и избранное', async () => {
    mockAPI.onDelete('/logout').reply(204);

    const store = mockStore(getInitialRootState());
    await store.dispatch(logout());

    expect(store.getActions()).toEqual([
      setUserData(null),
      loadFavoriteOffers([]),
      requireAuthorization(AuthorizationStatus.NoAuth),
    ]);
  });
});

