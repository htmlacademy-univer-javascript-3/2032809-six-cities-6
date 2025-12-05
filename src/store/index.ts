import { configureStore } from '@reduxjs/toolkit';
import offersProcessReducer from './offers-process/offers-process';
import userProcessReducer from './user-process/user-process';
import offerProcessReducer from './offer-process/offer-process';
import { createAPI } from '../services/api';

const api = createAPI();

export const store = configureStore({
  reducer: {
    offersProcess: offersProcessReducer,
    userProcess: userProcessReducer,
    offerProcess: offerProcessReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

