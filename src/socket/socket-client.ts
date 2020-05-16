import { cardEntity } from './../entities/card.entity';
import { IAppState } from './../redux/reducers/base.reducer';
import { GameEntity } from './../entities/game.entity';
import { plainToClass } from 'class-transformer';
import io from 'socket.io-client';
import { gameDataChange } from '../redux/actions/game.actions';
import { store } from '../redux/store/base.store';
import { newChatMessage } from '../redux/actions/chat.actions';
import { myCardsChange } from '../redux/actions/hand.actions';

// Socket manager
class Socket {
    
    private socket = io.Socket;

    // Helper to emit a redux action to our websocket server
    emitAction = (actionCreator: any) => {
        return (...args: any) => {
            // This return the action object which gets sent to our backend
            // server via the socket connection
            const result = actionCreator.apply(this, args)
            this.socket.emit(result.key, {
                ...result.payload,
                type: result.type
            })
            return result
        }
    }

    connect = () => {
        // Connect
        if(!this.socket?.connected) {
            const host = process.env.REACT_APP_API_URL as string;
            this.socket = io.connect(host);
            
            // Set listeners
            this.socket.on('connect', this.onConnected);
            this.socket.on('unauthorized', this.onUnauthorized);
            this.socket.on('disconnect', this.onDisconnect);
            this.socket.on('chat message', this.onChatMessage);
            this.socket.on('send-game-data', this.onGameDataChange);
            this.socket.on('start-game', this.onInitGame);

            this.socket.on('new-hand', this.onNewHand);

        }
    };

    disconnect = () => {
        socket.disconnect();
    }

    sendSeat = (seat: number) => {
        this.socket?.emit('new-seat', seat, (success: any) => console.log('seat success', success));
    }

    sendChatMessage = (message: string) => {
        this.socket?.emit('chat message', message, (success: any) => console.log('message', success));
    }

    initGame = () => {
        this.socket?.emit('start-game', (success: any) => console.log('init game1', success));
    }

    emitAuthentication = (userId: string, gameId: string) => {
        this.socket?.emit('authentication', {
            _id: userId,
            gameId: gameId
        });
    }

    onGameDataChange = (game: any) => {
        const g = plainToClass(GameEntity, game, { excludeExtraneousValues: true })
        console.log('on GameDataChange', g);
        store.dispatch(gameDataChange(g));
    }

    // Received events from socket
    // ----------------------------------
    onConnected = () => {
        const state = store.getState() as IAppState;
        console.log('connected', state.gameState.game.id, state.authentication.user.id);

        this.emitAuthentication(state.authentication.user.id, state.gameState.game.id)
    };

    onUnauthorized = (reason: any) => {
        console.log('unathentication', reason);
        this.socket.disconnect();
    }

    onDisconnect = (reason: any) => {
        console.log('disconnect', reason);
    }

    onChatMessage = (msg: string, userName: string) => {
        store.dispatch(newChatMessage(msg, userName));
    }

    onInitGame = (reason: any) => {
        console.log('onInitGame', reason);
    }

    onNewHand = ( hand: cardEntity[] ) => {
      console.log('Nueva Mano: ', hand) 
      store.dispatch(myCardsChange(hand));
    }
}

export const socket = new Socket();