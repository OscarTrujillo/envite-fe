import { apiAuthorizationMiddleware } from './../middlewares/apiAuthorization.middleware';
import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import rootReducer from '../reducers/base.reducer'
import { apiMiddleware } from 'redux-api-middleware'
import socketMiddleware from '../middlewares/socket.middleware';

export const history = createBrowserHistory()

function configureStore(preloadedState?: any) {
  const composeEnhancer: typeof compose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const store = createStore(
    rootReducer(history),
    preloadedState,
    composeEnhancer(
      applyMiddleware(
        // apiAuthorizationMiddleware,
        // apiMiddleware,
        routerMiddleware(history),
        socketMiddleware
        // thunkMiddleware
      ),
    ),
  )

  // Hot reloading
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers/base.reducer', () => {
      store.replaceReducer(rootReducer(history));
    });
  }

  return store
}
const store = configureStore();

export default store;