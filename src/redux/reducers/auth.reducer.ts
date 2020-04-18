import { UserEntity } from './../../entities/user.entity';
import { IAuthAction } from './../actions/auth.actions';
import { authConstants } from './../store/constants.store';

export function registration(state = {}, action: IAuthAction) {
  switch (action.type) {
    case authConstants.REGISTER_REQUEST:
      return { registering: true };
    case authConstants.REGISTER_SUCCESS:
      return {};
    case authConstants.REGISTER_FAILURE:
      return {};
    default:
      return state
  }
}

export interface IAuthState {
  loggingIn: boolean;
  loggedIn: boolean,
  user: UserEntity;
}

const initialState: IAuthState = {
  loggingIn: false,
  loggedIn: false,
  user: undefined!
}

export function authentication(state = initialState, action: IAuthAction) {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true,
        user: action.user
      };
    case authConstants.LOGIN_SUCCESS:
    case authConstants.REGISTER_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        loggingIn: false,
        user: action.user
      };
    case authConstants.LOGIN_FAILURE:
      return {};
    case authConstants.LOGOUT:
      // TODO: remove cookies
      return {};
    default:
      return state
  }
}