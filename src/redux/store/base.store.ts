import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import rootReducer from '../reducers/base.reducer'
// import socketMiddleware from '../middlewares/socket.middleware';
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const history = createBrowserHistory()

function configureStore(preloadedState?: any) {

  const persistConfig = {
    key: 'authentication',
    storage: storage,
    whitelist: ['authentication'] // which reducer want to store
  };
  const pReducer = persistReducer(persistConfig, rootReducer(history));

  const composeEnhancer: typeof compose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const store = createStore(
    pReducer,
    preloadedState,
    composeEnhancer(
      applyMiddleware(
        thunk,
        routerMiddleware(history),
        // socketMiddleware,
      ),
    ),
  )

  // // Hot reloading
  // if (module.hot) {
  //   // Enable Webpack hot module replacement for reducers
  //   module.hot.accept('../reducers/base.reducer', () => {
  //     store.replaceReducer(rootReducer(history));
  //   });
  // }

  return store
}

const store = configureStore();

const persistor = persistStore(store);

export type TStore = typeof store;

export { persistor, store };