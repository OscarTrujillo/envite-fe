import { plainToClass } from 'class-transformer';

function requestOptions(method: string, body: string): RequestInit {
    return {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: body
    };
}

const baseUrlApi = 'http://localhost:3000';
type IEntity<T> = new(...args: any[]) => T;

export function get<T>( endpoint: string, body?: any, responseType?: IEntity<T> ) {
    return apiRequest<T>('GET', endpoint, body, responseType);
}

export function post<T>( endpoint: string, body?: any, responseType?: IEntity<T> ) {
    return apiRequest<T>('POST', endpoint, body, responseType);
}

function apiRequest<T>(method: string, endpoint: string, body?: any, responseType?: IEntity<T> ): Promise<T>{
    const url = baseUrlApi + endpoint;
    const options = requestOptions(method, body);

    return fetch( url, options )
        // .then(handleResponse)
        .then(response => {
            if (responseType) {
                return plainToClass(responseType, response, { excludeExtraneousValues: true });
            }
            return response.json().then(data => data as T);
            // return data;
            // return user;
        });
}

// // TODO: check errors
// function handleResponse<T>(response: any) {
//     return response.text().then((text: string) => {
//         const data = text && JSON.parse(text);
//         if (!response.ok) {
//             if (response.status === 401) {
//                 // logout();
//             }

//             const error = (data && data.message) || response.statusText;
//             return Promise.reject(error);
//         }

//         return data;
//     });
// }