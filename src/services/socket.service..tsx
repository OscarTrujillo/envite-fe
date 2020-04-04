import socketIOClient from 'socket.io-client';


export class SocketIOService {
    private socket: SocketIOClient.Socket | undefined ;
    readonly endpoint = "http://localhost:3000";

    connect() {
        this.socket = socketIOClient(this.endpoint);
        this.socket.on('connect', () => {
            console.log('Connected');
        });
    }

}