import type { City, Offer } from '../types/offer';
import type { Review } from '../types/review';
import type { AxiosInstance } from 'axios';
import type { AppDispatch, RootState } from './index';
import { AuthorizationStatus } from '../const';

type CityName = City['name'];

export type SortType = 'Popular' | 'Price: low to high' | 'Price: high to low' | 'Top rated first';

export type AuthInfo = {
  email: string;
  token: string;
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export const setUserData = (userData: AuthInfo | null) => ({
  type: 'SET_USER_DATA' as const,
  payload: userData,
});

export const changeCity = (city: CityName) => ({
  type: 'CHANGE_CITY' as const,
  payload: city,
});

export const loadOffers = (offers: Offer[]) => ({
  type: 'LOAD_OFFERS' as const,
  payload: offers,
});

export const loadFavoriteOffers = (offers: Offer[]) => ({
  type: 'LOAD_FAVORITE_OFFERS' as const,
  payload: offers,
});

export const updateOfferFavoriteStatus = (offerId: string, isFavorite: boolean) => ({
  type: 'UPDATE_OFFER_FAVORITE_STATUS' as const,
  payload: { offerId, isFavorite },
});

export const fetchFavoriteOffers = () => async (dispatch: AppDispatch, _getState: () => RootState, api: AxiosInstance) => {
  try {
    const { data } = await api.get<Offer[]>('/favorite');
    dispatch(loadFavoriteOffers(data));
  } catch {
    dispatch(loadFavoriteOffers([]));
  }
};

export const setSortType = (sortType: SortType) => ({
  type: 'SET_SORT_TYPE' as const,
  payload: sortType,
});

export const setOffersLoadingStatus = (isLoading: boolean) => ({
  type: 'SET_OFFERS_LOADING_STATUS' as const,
  payload: isLoading,
});

export const setOffersError = (hasError: boolean) => ({
  type: 'SET_OFFERS_ERROR' as const,
  payload: hasError,
});

export const requireAuthorization = (status: AuthorizationStatus) => ({
  type: 'REQUIRE_AUTHORIZATION' as const,
  payload: status,
});

export const fetchOffers = () => async (dispatch: AppDispatch, _getState: () => RootState, api: AxiosInstance) => {
  dispatch(setOffersLoadingStatus(true));
  dispatch(setOffersError(false));
  try {
    const { data } = await api.get<Offer[]>('/offers');
    dispatch(loadOffers(data));
  } catch {
    dispatch(setOffersError(true));
  } finally {
    dispatch(setOffersLoadingStatus(false));
  }
};

export const checkAuth = () => async (dispatch: AppDispatch, _getState: () => RootState, api: AxiosInstance) => {
  try {
    const { data } = await api.get<AuthInfo>('/login');
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(setUserData(data));
    // Загружаем избранные предложения для авторизованного пользователя
    await dispatch(fetchFavoriteOffers());
  } catch {
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    dispatch(setUserData(null));
  }
};

export const login = (email: string, password: string) => async (dispatch: AppDispatch, _getState: () => RootState, api: AxiosInstance) => {
  try {
    const { data } = await api.post<AuthInfo>('/login', { email, password });
    localStorage.setItem('six-cities-token', data.token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(setUserData(data));
    // Загружаем избранные предложения после успешного логина
    await dispatch(fetchFavoriteOffers());
  } catch {
    localStorage.removeItem('six-cities-token');
    dispatch(setUserData(null));
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    throw new Error('Failed to login');
  }
};

export const logout = () => async (dispatch: AppDispatch, _getState: () => RootState, api: AxiosInstance) => {
  try {
    await api.delete('/logout');
  } finally {
    localStorage.removeItem('six-cities-token');
    dispatch(setUserData(null));
    dispatch(loadFavoriteOffers([]));
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  }
};

export const loadOffer = (offer: Offer | null) => ({
  type: 'LOAD_OFFER' as const,
  payload: offer,
});

export const loadNearbyOffers = (offers: Offer[]) => ({
  type: 'LOAD_NEARBY_OFFERS' as const,
  payload: offers,
});

export const loadReviews = (reviews: Review[]) => ({
  type: 'LOAD_REVIEWS' as const,
  payload: reviews,
});

export const fetchOffer = (id: string) => async (dispatch: AppDispatch, _getState: () => RootState, api: AxiosInstance) => {
  try {
    const { data } = await api.get<Offer>(`/offers/${id}`);
    dispatch(loadOffer(data));
  } catch {
    dispatch(loadOffer(null));
  }
};

export const fetchNearbyOffers = (id: string) => async (dispatch: AppDispatch, _getState: () => RootState, api: AxiosInstance) => {
  try {
    const { data } = await api.get<Offer[]>(`/offers/${id}/nearby`);
    dispatch(loadNearbyOffers(data));
  } catch {
    dispatch(loadNearbyOffers([]));
  }
};

export const fetchReviews = (id: string) => async (dispatch: AppDispatch, _getState: () => RootState, api: AxiosInstance) => {
  try {
    const { data } = await api.get<Review[]>(`/comments/${id}`);
    dispatch(loadReviews(data));
  } catch {
    dispatch(loadReviews([]));
  }
};

export type CommentData = {
  comment: string;
  rating: number;
};

export const postComment = (id: string, commentData: CommentData) => async (dispatch: AppDispatch, _getState: () => RootState, api: AxiosInstance) => {
  try {
    await api.post<Review>(`/comments/${id}`, commentData);
    await dispatch(fetchReviews(id));
  } catch {
    throw new Error('Failed to post comment');
  }
};

export const toggleFavoriteStatus = (id: string, isFavorite: boolean) => async (dispatch: AppDispatch, _getState: () => RootState, api: AxiosInstance) => {
  try {
    const status = isFavorite ? 0 : 1;
    const { data } = await api.post<Offer>(`/favorite/${id}/${status}`);
    dispatch(updateOfferFavoriteStatus(id, !isFavorite));
    const state = _getState();
    if (state.offerProcess.currentOffer?.id === id) {
      dispatch(loadOffer(data));
    }
    // Обновляем список избранных для обновления счетчика
    await dispatch(fetchFavoriteOffers());
  } catch {
    throw new Error('Failed to toggle favorite status');
  }
};

