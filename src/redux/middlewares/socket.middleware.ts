// import * as Protocol from '../../../constants/Protocol.js';
import io from 'socket.io-client';

// Socket manager
export default class Socket {
    
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
