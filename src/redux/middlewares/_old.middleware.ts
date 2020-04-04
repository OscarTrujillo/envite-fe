import io from 'socket.io-client';
import { Middleware } from 'redux';

export default function socketMiddleware(): Middleware {
  const socket = io('http://localhost:3000');
  console.log('socket connected', socket);
  return ({ dispatch }) => next => action => {
    if (typeof action === 'function') {
      return next(action);
    }
    const {
      event,
      leave,
      handle,
      ...rest
    } = action;

    if (!event) {
      return next(action);
    }

    if (leave) {
      socket.removeListener(event);
    }

    let handleEvent = handle;
    if (typeof handleEvent === 'string') {
      handleEvent = (result: any) => dispatch({ type: handle, result, ...rest });
    }
    return socket.on(event, handleEvent);
  };
}
