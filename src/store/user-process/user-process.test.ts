import userProcessReducer from './user-process';
import { requireAuthorization, setUserData } from '../action';
import { AuthorizationStatus } from '../../const';
import type { AuthInfo } from '../action';

describe('Reducer: userProcess', () => {
  it('должен вернуть начальное состояние при неизвестном экшене', () => {
    const state = userProcessReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual({
      authorizationStatus: AuthorizationStatus.Unknown,
      userData: null,
    });
  });

  it('должен установить статус авторизации при requireAuthorization', () => {
    const state = userProcessReducer(undefined, requireAuthorization(AuthorizationStatus.Auth));

    expect(state.authorizationStatus).toBe(AuthorizationStatus.Auth);
  });

  it('должен сохранять данные пользователя при setUserData', () => {
    const user: AuthInfo = {
      email: 'test@mail.com',
      token: 'token',
      name: 'Test',
      avatarUrl: 'avatar.jpg',
      isPro: false,
    };

    const state = userProcessReducer(undefined, setUserData(user));

    expect(state.userData).toEqual(user);
  });
});

