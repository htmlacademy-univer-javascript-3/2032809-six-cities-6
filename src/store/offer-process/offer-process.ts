import { createSlice } from '@reduxjs/toolkit';
import type { Offer } from '../../types/offer';
import type { Review } from '../../types/review';

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
      .addCase('LOAD_OFFER', (state, action) => {
        state.currentOffer = (action as { type: 'LOAD_OFFER'; payload: Offer | null }).payload;
      })
      .addCase('LOAD_NEARBY_OFFERS', (state, action) => {
        state.nearbyOffers = (action as { type: 'LOAD_NEARBY_OFFERS'; payload: Offer[] }).payload;
      })
      .addCase('LOAD_REVIEWS', (state, action) => {
        state.reviews = (action as { type: 'LOAD_REVIEWS'; payload: Review[] }).payload;
      });
  },
});

export default offerProcessSlice.reducer;

