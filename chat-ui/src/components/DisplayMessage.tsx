import React from 'react';
import Message from './Message.tsx';

interface DisplayMessageProps {
    messages: { id: number; content: string, sender: string }[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

const DisplayMessage : React.FC<DisplayMessageProps> = ({ messages, onEdit, onDelete }) => {
    return (
    <div>
        {messages.map((msg) => (
            <Message key={msg.id} message={msg} onEdit={onEdit} onDelete={onDelete} />
        ))}
    </div>
  );
}


export default DisplayMessage;