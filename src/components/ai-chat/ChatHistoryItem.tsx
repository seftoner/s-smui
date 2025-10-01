import React, { useState, useRef, useEffect } from 'react';
import {
    ListItemText,
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon,
    Box,
    Tooltip,
    ListItemButton,
} from '@mui/material';
import {
    MoreVert,
    Edit,
    Delete,
} from '@mui/icons-material';

interface ChatItem {
    id: number;
    title: string;
    timestamp: string;
}

interface ChatHistoryItemProps {
    chat: ChatItem;
    onClick?: (chat: ChatItem) => void;
    onRename?: (chat: ChatItem) => void;
    onDelete?: (chat: ChatItem) => void;
}

export const ChatHistoryItem: React.FC<ChatHistoryItemProps> = ({
    chat,
    onClick,
    onRename,
    onDelete,
}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isTextTruncated, setIsTextTruncated] = useState(false);
    const textRef = useRef<HTMLSpanElement>(null);
    const menuOpen = Boolean(anchorEl);

    // Check if text is truncated
    useEffect(() => {
        const checkTruncation = () => {
            if (textRef.current) {
                const element = textRef.current;
                setIsTextTruncated(element.scrollWidth > element.clientWidth);
            }
        };

        checkTruncation();
        // Recheck on window resize
        window.addEventListener('resize', checkTruncation);
        return () => window.removeEventListener('resize', checkTruncation);
    }, [chat.title, isHovered]); // Recheck when title or hover state changes

    const handleClick = () => {
        if (onClick) {
            onClick(chat);
        }
    };

    const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation(); // Prevent triggering the list item click
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleRename = () => {
        handleMenuClose();
        if (onRename) {
            onRename(chat);
        }
    };

    const handleDelete = () => {
        handleMenuClose();
        if (onDelete) {
            onDelete(chat);
        }
    };

    return (
        <ListItemButton
            key={chat.id}
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Tooltip
                title={isTextTruncated ? chat.title : ""}
                placement="top"
                disableHoverListener={!isTextTruncated}
            >
                <ListItemText
                    primary={
                        <span
                            ref={textRef}
                            style={{
                                display: 'block',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {chat.title}
                        </span>
                    }
                    sx={{
                        pr: isHovered ? 6 : 2, // Add padding when menu button is visible, always some padding for ellipsis
                    }}
                />
            </Tooltip>

            {/* Menu Button - Only visible on hover */}
            <Box
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.2s ease-in-out',
                }}
            >
                <IconButton
                    size="small"
                    onClick={handleMenuClick}
                >
                    <MoreVert fontSize="small" />
                </IconButton>
            </Box>

            {/* Context Menu */}
            <Menu
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                slotProps={{
                    paper: {
                        sx: {
                            minWidth: 150,
                        },
                    },
                }}
            >
                <MenuItem onClick={handleRename}>
                    <ListItemIcon>
                        <Edit fontSize="small" />
                    </ListItemIcon>
                    Rename
                </MenuItem>
                <MenuItem
                    onClick={handleDelete}
                    sx={{
                        color: 'error.main',
                        '&:hover': {
                            backgroundColor: 'error.light',
                            color: 'error.contrastText',
                        },
                    }}
                >
                    <ListItemIcon>
                        <Delete fontSize="small" color="error" />
                    </ListItemIcon>
                    Delete
                </MenuItem>
            </Menu>
        </ListItemButton>
    );
};

export default ChatHistoryItem;