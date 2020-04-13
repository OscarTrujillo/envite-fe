import { UserEntity } from './../../entities/user.entity';
import { AppThunk } from './base.actions';
import { authConstants } from './../store/constants.store';
import { authService } from './../../services/auth.service';
import { history } from '../store/base.store';

export interface IAuthAction {
    type: string;
    user?: UserEntity;
    error?: string;
}

export interface IAuthInput {username: string, password: string}

export const register = (user: IAuthInput): AppThunk => async dispatch => {
    return authService.register(user)
        .then(
            user => { 
                dispatch(success(user));
                history.push('/site');
            },
            error => {
                dispatch(failure(error.toString()));
                // dispatch(alertActions.error(error.toString()));
            }
        );
        
    function success(user?: UserEntity): IAuthAction{ return { type: authConstants.REGISTER_SUCCESS, user } }
    function failure(error?: string): IAuthAction { return { type: authConstants.REGISTER_FAILURE, error } }
};  

export const login = (user: IAuthInput): AppThunk => async dispatch => {
    return authService.login(user)
        .then(
            user => { 
                dispatch(success(user));
                history.push('/site');
            },
            error => {
                dispatch(failure(error.toString()));
                // dispatch(alertActions.error(error.toString()));
            }
        );
        
    function success(user?: UserEntity): IAuthAction { return { type: authConstants.LOGIN_SUCCESS, user } }
    function failure(error?: string): IAuthAction { return { type: authConstants.LOGIN_FAILURE, error } }
};  

