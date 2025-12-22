import userProcessReducer from './user-process';
import { requireAuthorization } from '../action';
import { AuthorizationStatus } from '../../const';

describe('Reducer: userProcess', () => {
  it('должен вернуть начальное состояние при неизвестном экшене', () => {
    const state = userProcessReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual({
      authorizationStatus: AuthorizationStatus.Unknown,
    });
  });

  it('должен установить статус авторизации при requireAuthorization', () => {
    const state = userProcessReducer(undefined, requireAuthorization(AuthorizationStatus.Auth));

    expect(state.authorizationStatus).toBe(AuthorizationStatus.Auth);
  });
});

