import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';
import type { AuthInfo } from '../action';

type UserProcessState = {
  authorizationStatus: AuthorizationStatus;
  userData: AuthInfo | null;
};

const initialState: UserProcessState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null,
};

const userProcessSlice = createSlice({
  name: 'userProcess',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase('REQUIRE_AUTHORIZATION', (state, action) => {
        state.authorizationStatus = (action as { type: 'REQUIRE_AUTHORIZATION'; payload: AuthorizationStatus }).payload;
      })
      .addCase('SET_USER_DATA', (state, action) => {
        state.userData = (action as { type: 'SET_USER_DATA'; payload: AuthInfo | null }).payload;
      });
  },
});

export default userProcessSlice.reducer;

