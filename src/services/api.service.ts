import { IAuthState } from './../redux/reducers/auth.reducer';
import { plainToClass } from 'class-transformer';
import { store } from '../redux/store/base.store';

function requestOptions(method: string): RequestInit {
    return {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        // credentials: "include"
    };
}

const baseUrlApi = 'http://localhost:3000';
type IEntity<T> = new(...args: any[]) => T;

export function get<T>( endpoint: string, paramsObj?: any, responseType?: IEntity<T> ) {
    const options = requestOptions('GET');
    let params = '';
    if (paramsObj) {
        for (const key in paramsObj) {         
            if (params === '') {
                params = '?' + key + '=' + paramsObj[key];
            } else {
                params =  params + '&' + key + '=' + paramsObj[key];
            }
        }
    }
    return apiRequest<T>(options, endpoint + params, responseType);
}

export function post<T>( endpoint: string, body?: any, responseType?: IEntity<T> ) {
    const options = requestOptions('POST');
    options.body = body;
    return apiRequest<T>(options, endpoint, responseType);
}

function apiRequest<T>(options: RequestInit, endpoint: string, responseType?: IEntity<T> ): Promise<T>{
    const url = baseUrlApi + endpoint;
    const auth = store.getState().authentication as IAuthState;
    // TODO: MALLL
    if (auth && auth.loggedIn) {
        options.credentials = "include";
    }
    console.log('options', options);
    return fetch( url, options )
        .then(handleResponse)
        .then(response => {
            if (responseType) {
                return plainToClass(responseType, response, { excludeExtraneousValues: true });
            }
            return response;
        });
}

// // TODO: check errors
function handleResponse<T>(response: Response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response.json();
}