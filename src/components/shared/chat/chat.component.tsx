import { Component } from "react";
import { socket } from "../../../socket/socket-client";
import React from "react";
import { TextField, IconButton } from "@material-ui/core";
import { connect } from "react-redux";
import { IAppState } from "../../../redux/reducers/base.reducer";
import './chat.component.scss';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import CloseIcon from '@material-ui/icons/Close';
import classNames from "classnames";

const chatAppProps = (state: IAppState) => {
    return { 
        messages: state.chatState.messages,
        users: state.chatState.users,
        authUser: state.authentication.user,
    }
}

type TchatAppProps = ReturnType<typeof chatAppProps>;

export class ChatAppComponent extends Component<TchatAppProps> {
    state = {
        inputValue: '',
        chatOpen: false,
    }
    sendHandler = (e: any) => {
        // const messageObject: ChatMessageEntity = {
        //   name: this.props.username,
        //   message: message
        // }
        e.preventDefault();
        if (this.state.inputValue) {
            socket.sendChatMessage(this.state.inputValue);
            this.setState({inputValue: ''});
        }
    }

    handleChange = (e: any) => {
        this.setState({inputValue: e.target.value});
    };

    openChat = () => {
        this.setState({ chatOpen: true });
        console.log('open', this.state.chatOpen);
    }

    closeChat = () => {
        this.setState({ chatOpen: false });
        this.setState({inputValue: ''});
    }

    render() {
        const {messages} = this.props;
        const {authUser} = this.props;
        return (
            <div
            className={classNames({ 
                floatingChat: true,
                enter: true,
                expand: this.state.chatOpen,
            })}
            >
                <IconButton
                    className={classNames({
                        hide: this.state.chatOpen,
                    })}
                    onClick={this.openChat} color="primary" aria-label="directions">
                    
                    <ChatBubbleOutlineIcon />
                </IconButton>
                <div
                className={classNames({
                        chat: true,
                        enter: this.state.chatOpen,
                })}
                >
                    <div className="header">
                        <span className="title">
                            Chat
                        </span>
                        <IconButton size="small" onClick={this.closeChat} color="primary" aria-label="directions">
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <ul className="messages">
                        {messages.map((msg, i) => 
                        <li key={i}
                        className={classNames({
                            self: authUser.username === msg.userName,
                            other: authUser.username !== msg.userName,
                            marginTop: i !== 0 && msg.userName !== authUser.username && msg.userName !== messages[i-1]?.userName && messages[i-1]?.userName !== authUser.username,
                            userNameNotVisible: msg.userName === messages[i-1]?.userName
                        })}>
                            <span className="username">{msg.userName}</span>
                            <span className="message">{msg.message}</span>
                        </li>)}
                    </ul>
                    <div className="footer">
                        <form className="chat-input fullWidth" onSubmit={this.sendHandler}>
                            <TextField className="text-box" type="text"
                                onChange={this.handleChange}
                                value={this.state.inputValue}
                                margin="dense"
                                variant="outlined"
                                fullWidth
                                />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const ChatApp = connect(chatAppProps)(ChatAppComponent);

export default ChatApp;
