import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import offersProcessReducer from '../store/offers-process/offers-process';
import offerProcessReducer from '../store/offer-process/offer-process';
import userProcessReducer from '../store/user-process/user-process';
import type { RootState } from '../store';
import type { RenderOptions } from '@testing-library/react';
import { getInitialRootState } from './test-mocks';

type ExtendedRenderOptions = Omit<RenderOptions, 'queries'> & {
  preloadedState?: Partial<RootState>;
};

const api = createAPI();

export function makeMockStore(preloadedState?: Partial<RootState>) {
  const baseState = getInitialRootState();
  const mergedState: RootState = {
    offersProcess: { ...baseState.offersProcess, ...preloadedState?.offersProcess },
    userProcess: { ...baseState.userProcess, ...preloadedState?.userProcess },
    offerProcess: { ...baseState.offerProcess, ...preloadedState?.offerProcess },
  };

  return configureStore({
    reducer: {
      offersProcess: offersProcessReducer,
      userProcess: userProcessReducer,
      offerProcess: offerProcessReducer,
    },
    preloadedState: mergedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: api,
        },
      }),
  });
}

export function renderWithProviders(ui: React.ReactElement, options: ExtendedRenderOptions = {}) {
  const { preloadedState, ...renderOptions } = options;
  const store = makeMockStore(preloadedState);

  return {
    store,
    ...render(<Provider store={store}>{ui}</Provider>, renderOptions),
  };
}

