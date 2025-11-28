import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { requireAuthorization } from '../action';
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
      .addCase(requireAuthorization, (state, action: PayloadAction<AuthorizationStatus>) => {
        state.authorizationStatus = action.payload;
      });
  },
});

export default userProcessSlice.reducer;

