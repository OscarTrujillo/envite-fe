import { UserEntity } from './../entities/user.entity';
import { IAuthInput } from './../redux/actions/auth.actions';
import { plainToClass } from 'class-transformer';

export const authService = {
    register,
    login,
    logout
};

function requestOptions(body: string, method = 'POST') {
    return {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: body
    };
}

function register(user: IAuthInput) {
    const options = requestOptions(JSON.stringify(user));
    return fetch(`http://localhost:3000/auth/signup`, options)
        .then(handleResponse);
}

function login(user: IAuthInput) {
    const options = requestOptions(JSON.stringify(user));
    return fetch(`http://localhost:3000/auth/login`, options)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            // localStorage.setItem('user', JSON.stringify(user));

            return plainToClass(UserEntity, user, { excludeExtraneousValues: true });
            // return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function handleResponse(response: any) {
    return response.text().then((text: string) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                // logout();
                // location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}