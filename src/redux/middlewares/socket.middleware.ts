import { Middleware } from "redux";
import io from 'socket.io-client';

// Socket manager
class Socket {
    
    private socket = io.Socket;
    
    constructor() {
        this.connect();
    }

    connect = () => {
        // Connect
        const host = `http://localhost:3000`;
        this.socket = io.connect(host);

        // Set listeners
        this.socket.on('connect', this.onConnected);
    };

    // Received connect event from socket
    onConnected = () => {
        console.log('connected');
    };
}


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