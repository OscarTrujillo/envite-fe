import { IAppState } from './../redux/reducers/base.reducer';
import { GameEntity } from './../entities/game.entity';
import { plainToClass } from 'class-transformer';
import io from 'socket.io-client';
import { newSeat } from '../redux/actions/game.actions';
import { store } from '../redux/store/base.store';

// Socket manager
class Socket {
    
    private socket = io.Socket;

    connect = () => {
        // Connect
        const host = process.env.REACT_APP_API_URL as string;
        this.socket = io.connect(host);

        // Set listeners
        this.socket.on('connect', this.onConnected);
        this.socket.on('unauthorized', this.onUnauthorized);
        this.socket.on('disconnect', this.onDisconnect);
        this.socket.on('chat message', this.onChatMessage);
        this.socket.on('new-player-seated', this.onNewPlayer);
    };

    disconnect = () => {
        socket.disconnect();
    }

    sendSeat = (seat: number) => {
        this.socket?.emit('new-seat', seat, (success: any) => console.log(success));
    }

    onNewPlayer = (game: any) => {
        const g = plainToClass(GameEntity, game, { excludeExtraneousValues: true })
        console.log('new seat', g);
        store.dispatch(newSeat(g));
    }

    // Received connect event from socket
    onConnected = () => {
        const state = store.getState() as IAppState;
        console.log('connected', state.gameState.game.id, state.authentication.user.id);

        this.socket.emit('authentication', {
            _id: state.authentication.user.id,
            gameId: state.gameState.game.id,
        });
    };

    onUnauthorized = (reason: any) => {
        console.log('unathentication', reason);
        this.socket.disconnect();
    }

    onDisconnect = (reason: any) => {
        console.log('disconnect', reason);
    }

    onChatMessage = (msg: string) => {
        console.log('chatMessage', msg);
    }
}

export const socket = new Socket();