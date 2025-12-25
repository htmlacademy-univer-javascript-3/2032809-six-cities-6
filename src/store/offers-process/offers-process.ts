import { createSlice } from '@reduxjs/toolkit';
import type { City, Offer } from '../../types/offer';
import type { SortType } from '../action';

type CityName = City['name'];

type OffersProcessState = {
  city: CityName;
  offers: Offer[];
  sortType: SortType;
  isOffersLoading: boolean;
  favoriteOffers: Offer[];
  favoriteCount: number;
  offersError: boolean;
};

const initialState: OffersProcessState = {
  city: 'Paris',
  offers: [],
  sortType: 'Popular',
  isOffersLoading: false,
  favoriteOffers: [],
  favoriteCount: 0,
  offersError: false,
};

const offersProcessSlice = createSlice({
  name: 'offersProcess',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase('CHANGE_CITY', (state, action) => {
        state.city = (action as { type: 'CHANGE_CITY'; payload: CityName }).payload;
      })
      .addCase('LOAD_OFFERS', (state, action) => {
        state.offers = (action as { type: 'LOAD_OFFERS'; payload: Offer[] }).payload;
      })
      .addCase('SET_SORT_TYPE', (state, action) => {
        state.sortType = (action as { type: 'SET_SORT_TYPE'; payload: SortType }).payload;
      })
      .addCase('SET_OFFERS_LOADING_STATUS', (state, action) => {
        state.isOffersLoading = (action as { type: 'SET_OFFERS_LOADING_STATUS'; payload: boolean }).payload;
      })
      .addCase('SET_OFFERS_ERROR', (state, action) => {
        state.offersError = (action as { type: 'SET_OFFERS_ERROR'; payload: boolean }).payload;
      })
      .addCase('LOAD_FAVORITE_OFFERS', (state, action) => {
        const favoriteOffers = (action as { type: 'LOAD_FAVORITE_OFFERS'; payload: Offer[] }).payload;
        state.favoriteOffers = favoriteOffers;
        state.favoriteCount = favoriteOffers.length;
      })
      .addCase('UPDATE_OFFER_FAVORITE_STATUS', (state, action) => {
        const { offerId, isFavorite } = (action as { type: 'UPDATE_OFFER_FAVORITE_STATUS'; payload: { offerId: string; isFavorite: boolean } }).payload;
        state.offers = state.offers.map((offer) =>
          offer.id === offerId ? { ...offer, isFavorite } : offer
        );
        // favoriteOffers обновятся после fetchFavoriteOffers
      });
  },
});

export default offersProcessSlice.reducer;

