import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Offer } from '../../types/offer';
import type { Review } from '../../types/review';
import { loadOffer, loadNearbyOffers, loadReviews } from '../action';

type OfferProcessState = {
  currentOffer: Offer | null;
  nearbyOffers: Offer[];
  reviews: Review[];
};

const initialState: OfferProcessState = {
  currentOffer: null,
  nearbyOffers: [],
  reviews: [],
};

const offerProcessSlice = createSlice({
  name: 'offerProcess',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadOffer, (state, action: PayloadAction<Offer | null>) => {
        state.currentOffer = action.payload;
      })
      .addCase(loadNearbyOffers, (state, action: PayloadAction<Offer[]>) => {
        state.nearbyOffers = action.payload;
      })
      .addCase(loadReviews, (state, action: PayloadAction<Review[]>) => {
        state.reviews = action.payload;
      });
  },
});

export default offerProcessSlice.reducer;

