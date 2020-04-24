import { chatConstants } from './../store/constants.store';
import { ChatMessageEntity } from './../../entities/chat-message.entity';
import { useLocation } from 'react-router';

export interface IChatAction {
    type: string;
    message: ChatMessageEntity;
}

export const addMessageAction = (message: ChatMessageEntity): IChatAction => ({
    type: 'ADD_MESSAGE',
    message
  });


export function newChatMessage(msg: string): IChatAction {
    const message = new ChatMessageEntity();
    message.message = msg;
    return { 
      type: chatConstants.CHAT_NEW_MESSAGE, message
    };
}