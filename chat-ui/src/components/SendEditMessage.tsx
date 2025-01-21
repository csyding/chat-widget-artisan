import React, { useState, useEffect } from 'react';

interface SendEditMessageProps {
    onSubmit: (content: string) => void;
    messageToEdit?: { id: number; content: string, sender: string };
}

const SendEditMessage: React.FC<SendEditMessageProps> = ({messageToEdit, onSubmit}) => {
    const [input, setInput] = useState<string>(messageToEdit?.content || '');

    useEffect(() => {
        if (messageToEdit) {
            setInput(messageToEdit.content);
        }
    }, [messageToEdit]);

    const handleSubmit = () => {
        if (input.trim()) {
            onSubmit(input);
            setInput('');
        }
    };

    return (
        <div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message"
            />
            <button onClick={handleSubmit}>
                {messageToEdit ? 'Save Changes' : 'Send'}
            </button>
        </div>
    );
}


export default SendEditMessage;