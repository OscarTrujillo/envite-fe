
import { Middleware } from "redux";
import Socket from "./socket.middleware";

const socketMiddleware: Middleware = store => {

    const socket = new Socket(
    );

    // Return the handler that will be called for each action dispatched
    return next => action => {
        switch (action.type){

            case 'socket/connect':
                socket.connect();
                break;

            default:
                break;
        }

        return next(action)
    };
};

export default socketMiddleware;