import { ThunkAction } from 'redux-thunk';
import { authConstants } from './../store/constants.store';
import { authService } from './../../services/auth.service';
import { Dispatch, ActionCreator, Action } from 'redux';


export const register: ActionCreator<ThunkAction<
  void,
  null,
  null,
  Action<string>
>> = (user: any) => {
    return (dispatch: Dispatch) => {
        authService.register(user)
            .then(
                user => { 
                    dispatch(success());
                    // dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                }
            );
    };

    // function request(user?: any) { return { type: authConstants.REGISTER_REQUEST, user } }
    function success(user?: any) { return { type: authConstants.REGISTER_SUCCESS, user } }
    function failure(error?: any) { return { type: authConstants.REGISTER_FAILURE, error } }
}