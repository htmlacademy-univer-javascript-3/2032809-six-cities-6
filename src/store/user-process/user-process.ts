import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';

type UserProcessState = {
  authorizationStatus: AuthorizationStatus;
};

const initialState: UserProcessState = {
  authorizationStatus: AuthorizationStatus.Unknown,
};

const userProcessSlice = createSlice({
  name: 'userProcess',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase('REQUIRE_AUTHORIZATION', (state, action) => {
        state.authorizationStatus = (action as { type: 'REQUIRE_AUTHORIZATION'; payload: AuthorizationStatus }).payload;
      });
  },
});

export default userProcessSlice.reducer;

