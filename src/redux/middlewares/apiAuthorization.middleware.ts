import { RSAA } from 'redux-api-middleware'

export const MY_AUTHORIZED_REQUEST = "@@authorized_request"

export const apiAuthorizationMiddleware = (store: any) => (next: any) => (action: any) => {
    if (!action[MY_AUTHORIZED_REQUEST]) {
        return next(action)
    }
    const { [MY_AUTHORIZED_REQUEST]: request, ...newAction} = action

    const headers = request.headers ? {...request.headers} : {}
    const state = store.getState()
    headers["Authorization"] = state.authorizationToken

    request.headers = headers

    newAction[RSAA] = request
    return next(newAction)
}

export default MY_AUTHORIZED_REQUEST