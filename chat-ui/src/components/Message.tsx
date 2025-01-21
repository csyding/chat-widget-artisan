import React from 'react';

interface MessageProps {
    message: { id: number; content: string, sender: string };
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

const Message : React.FC<MessageProps> = ({ message, onEdit, onDelete }) => {
    return (
        <div style={{ margin: '10px 0' }}>
            <strong> {message.sender}: </strong> {message.content}
            {message.sender === "user" ? 
                (
                    <div>
                        <button onClick={() => onEdit(message.id)}>Edit</button>
                        <button onClick={() => onDelete(message.id)}>Delete</button>
                    </div>
                ) : (
                    <></>
                )
        }   
        </div>
    );
}

export default Message;