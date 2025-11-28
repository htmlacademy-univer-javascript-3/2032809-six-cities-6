import type { City, Offer } from '../types/offer';
import type { AxiosInstance } from 'axios';
import type { AppDispatch, RootState } from './index';
import { AuthorizationStatus } from '../const';

type CityName = City['name'];

export type SortType = 'Popular' | 'Price: low to high' | 'Price: high to low' | 'Top rated first';

export type AuthInfo = {
  email: string;
  token: string;
};

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

export const setOffersLoadingStatus = (isLoading: boolean) => ({
  type: 'SET_OFFERS_LOADING_STATUS' as const,
  payload: isLoading,
});

export const requireAuthorization = (status: AuthorizationStatus) => ({
  type: 'REQUIRE_AUTHORIZATION' as const,
  payload: status,
});

export const fetchOffers = () => async (dispatch: AppDispatch, _getState: () => RootState, api: AxiosInstance) => {
  dispatch(setOffersLoadingStatus(true));
  try {
    const { data } = await api.get<Offer[]>('/offers');
    dispatch(loadOffers(data));
  } catch {
    // Ошибка загрузки обрабатывается через состояние загрузки
  } finally {
    dispatch(setOffersLoadingStatus(false));
  }
};

export const checkAuth = () => async (dispatch: AppDispatch, _getState: () => RootState, api: AxiosInstance) => {
  try {
    await api.get<AuthInfo>('/login');
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  } catch {
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  }
};

export const login = (email: string, password: string) => async (dispatch: AppDispatch, _getState: () => RootState, api: AxiosInstance) => {
  try {
    const { data } = await api.post<AuthInfo>('/login', { email, password });
    localStorage.setItem('six-cities-token', data.token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  } catch {
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    throw new Error('Failed to login');
  }
};

export const logout = () => {
  localStorage.removeItem('six-cities-token');
  return requireAuthorization(AuthorizationStatus.NoAuth);
};

