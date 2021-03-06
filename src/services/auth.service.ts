import { UserEntity } from './../entities/user.entity';
import { IAuthInput } from './../redux/actions/auth.actions';
import { post } from './api.service';

export const authService = {
    register,
    login,
    logout,
};

function register(user: IAuthInput) {
    return post<UserEntity>('/auth/signup', JSON.stringify(user), UserEntity);
}

function login(user: IAuthInput) {
    return post<UserEntity>('/auth/login', JSON.stringify(user), UserEntity);
}

function logout() {
    return post('/auth/logout');
}
