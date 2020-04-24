import { chatConstants } from './../store/constants.store';
import { IChatAction } from './../actions/chat.actions';
import { ChatMessageEntity } from './../../entities/chat-message.entity';

export interface IChatState {
    messages: ChatMessageEntity[],
    // todo: user entity
    users: string[]
}
  
const initialState: IChatState = {
    messages: [],
    users: []
};
  
export function chatState(state: IChatState = initialState, action: IChatAction) {
    switch (action.type) {
        case chatConstants.CHAT_NEW_MESSAGE:
            return {
                messages: [ ...state.messages, action.message ],
                users: state.users
            }
    default:      
        return state;
    }
}