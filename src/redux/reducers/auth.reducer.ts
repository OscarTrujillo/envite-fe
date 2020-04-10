import { authConstants } from './../store/constants.store';

export function registration(state = {}, action: any) {
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