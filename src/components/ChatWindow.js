import React from "react";
import Message from "./Message";
import "../styles/Chat.css";

const ChatWindow = ({
    messages,
    message,
    setMessage,
    onNewMessage,
    connectedUsers,
}) => {
    return (
        <div className="iphone shadow-lg">
        <div className="around">
            <div className="">
            <form className="chat" onSubmit={onNewMessage}>
                <div className="connected">
                Users online:{" "}
                {connectedUsers && connectedUsers.length}
                </div>
                <div className="messages">
                {messages.map((message) => {
                    return (
                    <Message
                        key={message.id}
                        text={message.text}
                        date={message.date}
                        from={message.from}
                        color={message.color}
                    />
                    );
                })}
                </div>
                <div className="input-main">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Your message"
                        className="input-message"
                    />
                    <input
                        type="submit"
                        value="Send"
                        className="input-send"
                        />
                </div>
            </form>
            </div>
        </div>
        </div>
    );
};

export default ChatWindow;