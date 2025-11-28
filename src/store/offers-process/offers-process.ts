import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { City, Offer } from '../../types/offer';
import { changeCity, loadOffers, setSortType, setOffersLoadingStatus, type SortType } from '../action';

type CityName = City['name'];

type OffersProcessState = {
  city: CityName;
  offers: Offer[];
  sortType: SortType;
  isOffersLoading: boolean;
};

const initialState: OffersProcessState = {
  city: 'Paris',
  offers: [],
  sortType: 'Popular',
  isOffersLoading: false,
};

const offersProcessSlice = createSlice({
  name: 'offersProcess',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changeCity, (state, action: PayloadAction<CityName>) => {
        state.city = action.payload;
      })
      .addCase(loadOffers, (state, action: PayloadAction<Offer[]>) => {
        state.offers = action.payload;
      })
      .addCase(setSortType, (state, action: PayloadAction<SortType>) => {
        state.sortType = action.payload;
      })
      .addCase(setOffersLoadingStatus, (state, action: PayloadAction<boolean>) => {
        state.isOffersLoading = action.payload;
      });
  },
});

export default offersProcessSlice.reducer;

