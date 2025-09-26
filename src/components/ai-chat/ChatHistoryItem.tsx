import React from 'react';
import {
    ListItem,
    ListItemText,
} from '@mui/material';

interface ChatItem {
    id: number;
    title: string;
    timestamp: string;
}

interface ChatHistoryItemProps {
    chat: ChatItem;
    onClick?: (chat: ChatItem) => void;
}

export const ChatHistoryItem: React.FC<ChatHistoryItemProps> = ({
    chat,
    onClick,
}) => {
    const handleClick = () => {
        if (onClick) {
            onClick(chat);
        }
    };

    return (
        <ListItem
            key={chat.id}
            component="div"
            onClick={handleClick}
            sx={{
                cursor: 'pointer',
                borderRadius: 2,
            }}
        >
            <ListItemText
                primary={chat.title}
                sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                }}
            />
        </ListItem>
    );
};

export default ChatHistoryItem;