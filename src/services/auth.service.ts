import { UserEntity } from './../entities/user.entity';
import { IAuthInput } from './../redux/actions/auth.actions';
import { post } from './api.service';

export const authService = {
    register,
    login,
};

function register(user: IAuthInput) {
    return post<UserEntity>('/auth/signup', JSON.stringify(user));
}

function login(user: IAuthInput) {
    return post<UserEntity>('/auth/login', JSON.stringify(user));
}

