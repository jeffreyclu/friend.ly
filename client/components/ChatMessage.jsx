import React from 'react';

const ChatMessage = ({ chat, user }) => {
    const { sender, message, createdAt } = chat;
    const { name } = user;
    return (
        <div className={sender === name ? "chatRow they" : "chatRow you"}>
            <span className="chatSender">
                {sender}
            </span>
            <span className={sender === name ? "chatMessage blue" : "chatMessage red"}>
                {message}
            </span>
            <span className="chatDate">
                {createdAt.slice(0,10)}
            </span>
        </div>
    );
};

export default ChatMessage;