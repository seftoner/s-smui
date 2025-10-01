import React, { useState } from 'react';
import {
    Box,
    Paper,
    IconButton,
    Tooltip,
    Typography,
    List,
    ListItemText,
    ListItemIcon,
    Divider,
    ListSubheader,
    ListItemButton,
} from '@mui/material';
import {
    TextIndentIcon as ExpandIcon,
    PencilSimpleIcon as NewChatIcon,
    MagnifyingGlassIcon as SearchIcon,
} from '@phosphor-icons/react';
import { useAppTheme } from '../../contexts';
import { ProjectItem, ChatHistoryItem, NewProjectButton } from '.';
import { RenameChatDialog } from './RenameChatDialog';
import { DeleteChatDialog } from './DeleteChatDialog';

interface ChatItem {
    id: number;
    title: string;
    timestamp: string;
}

interface Project {
    id: number;
    name: string;
    isOpen: boolean;
}

interface ChatHistorySidebarProps {
    isCollapsed?: boolean;
    onToggleCollapse: () => void;
    onNewChat: () => void;
    onSearch: () => void;
}

export const ChatHistorySidebar: React.FC<ChatHistorySidebarProps> = ({
    isCollapsed = true,
    onToggleCollapse,
    onNewChat,
    onSearch,
}) => {
    const { currentTheme } = useAppTheme();

    // State for rename dialog
    const [renameDialog, setRenameDialog] = useState<{
        open: boolean;
        chatId: number | null;
        currentTitle: string;
        newTitle: string;
    }>({
        open: false,
        chatId: null,
        currentTitle: '',
        newTitle: '',
    });

    // State for delete confirmation dialog
    const [deleteDialog, setDeleteDialog] = useState<{
        open: boolean;
        chatId: number | null;
        chatTitle: string;
    }>({
        open: false,
        chatId: null,
        chatTitle: '',
    });

    // State for chat history data
    const [chatHistory, setChatHistory] = useState({
        today: {
            label: 'Today',
            chats: [
                { id: 1, title: 'Quick Draft #001', timestamp: '10:30 AM' },
                { id: 2, title: 'Smart Editing Session with my', timestamp: '2:15 PM' },
            ] as ChatItem[]
        },
        yesterday: {
            label: 'Yesterday',
            chats: [
                { id: 3, title: 'Smart Editing Session', timestamp: 'Yesterday' },
                { id: 4, title: 'Quick Draft #003', timestamp: 'Yesterday' },
                { id: 5, title: 'Data Analysis', timestamp: 'Yesterday' },
            ] as ChatItem[]
        },
        lastWeek: {
            label: 'Last 7 Days',
            chats: [
                { id: 6, title: 'Smart Editing Session', timestamp: '5 days ago' },
                { id: 7, title: 'AI Rewriting Chat', timestamp: '6 days ago' },
            ] as ChatItem[]
        },
    });

    // Handle rename chat
    const handleRename = (chat: ChatItem) => {
        setRenameDialog({
            open: true,
            chatId: chat.id,
            currentTitle: chat.title,
            newTitle: chat.title,
        });
    };

    // Handle delete chat
    const handleDelete = (chat: ChatItem) => {
        setDeleteDialog({
            open: true,
            chatId: chat.id,
            chatTitle: chat.title,
        });
    };

    // Confirm rename
    const handleConfirmRename = () => {
        if (renameDialog.chatId && renameDialog.newTitle.trim()) {
            setChatHistory(prevHistory => {
                const newHistory = { ...prevHistory };

                // Find and update the chat in the appropriate section
                for (const sectionKey in newHistory) {
                    const section = newHistory[sectionKey as keyof typeof newHistory];
                    const chatIndex = section.chats.findIndex(chat => chat.id === renameDialog.chatId);
                    if (chatIndex !== -1) {
                        const updatedChats = [...section.chats];
                        updatedChats[chatIndex] = {
                            ...updatedChats[chatIndex],
                            title: renameDialog.newTitle.trim()
                        };
                        newHistory[sectionKey as keyof typeof newHistory] = {
                            ...section,
                            chats: updatedChats
                        };
                        break;
                    }
                }

                return newHistory;
            });
        }

        setRenameDialog({
            open: false,
            chatId: null,
            currentTitle: '',
            newTitle: '',
        });
    };

    // Confirm delete
    const handleConfirmDelete = () => {
        if (deleteDialog.chatId) {
            setChatHistory(prevHistory => {
                const newHistory = { ...prevHistory };

                // Find and remove the chat from the appropriate section
                for (const sectionKey in newHistory) {
                    const section = newHistory[sectionKey as keyof typeof newHistory];
                    const chatIndex = section.chats.findIndex(chat => chat.id === deleteDialog.chatId);
                    if (chatIndex !== -1) {
                        const updatedChats = section.chats.filter(chat => chat.id !== deleteDialog.chatId);
                        newHistory[sectionKey as keyof typeof newHistory] = {
                            ...section,
                            chats: updatedChats
                        };
                        break;
                    }
                }

                return newHistory;
            });
        }

        setDeleteDialog({
            open: false,
            chatId: null,
            chatTitle: '',
        });
    };

    // Cancel dialogs
    const handleCancelRename = () => {
        setRenameDialog({
            open: false,
            chatId: null,
            currentTitle: '',
            newTitle: '',
        });
    };

    const handleCancelDelete = () => {
        setDeleteDialog({
            open: false,
            chatId: null,
            chatTitle: '',
        });
    };

    const handleToggleCollapse = () => {
        onToggleCollapse();
    };    // Test data structure based on Figma expanded design
    const projects: Project[] = [
        { id: 1, name: 'Project #1', isOpen: true },
        { id: 2, name: 'Project #2', isOpen: false },
        { id: 3, name: 'Development Project', isOpen: false },
    ];

    return (
        <Paper
            elevation={0}
            onClick={isCollapsed ? handleToggleCollapse : undefined}
            sx={{
                width: isCollapsed ? 64 : 280,
                height: '100%',
                backgroundColor: currentTheme.sidebarBackgroundColor,
                borderRadius: (theme) => theme.shape.borderRadius,
                display: 'flex',
                flexDirection: 'column',
                py: 2,
                px: 2, // Consistent padding
                gap: 2,
                transition: 'all 0.5s ease',
                overflow: 'hidden',
                position: 'relative',
                cursor: isCollapsed ? 'w-resize' : 'default',
                alignItems: isCollapsed ? 'center' : 'stretch', // Center items when collapsed
            }}
        >
            {/* Top section with expand button and title */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: isCollapsed ? 'center' : 'flex-start',
                    gap: 2,
                    width: '100%',
                }}
            >
                {/* Expand/Collapse Button - always visible */}
                <Tooltip title={isCollapsed ? "Expand Menu" : "Collapse Menu"} placement="right">
                    <IconButton
                        onClick={(e) => {
                            e.stopPropagation();
                            handleToggleCollapse();
                        }}
                        size="medium"
                        sx={{
                            transition: 'all 0.3s ease',
                        }}
                    >
                        <ExpandIcon
                            weight="regular"
                            style={{
                                transform: isCollapsed ? 'rotate(0deg)' : 'rotate(180deg)',
                                transition: 'transform 0.5s ease',
                            }}
                        />
                    </IconButton>
                </Tooltip>

                {/* Title - fades in when expanded */}
                {!isCollapsed && (
                    <Typography
                        variant="h6"
                        sx={{
                            flex: 1,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            transition: 'opacity 0.3s ease'
                        }}
                    >
                        AI Chat
                    </Typography>
                )}
            </Box>

            {/* Action buttons section - restructured for consistent icon positioning */}
            {isCollapsed ? (
                // Collapsed: Show as vertical icon stack
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1,
                        mt: 1,
                        width: '100%', // Ensure full width
                    }}
                >
                    <Tooltip title="New Chat" placement="right">
                        <IconButton
                            onClick={(e) => {
                                e.stopPropagation();
                                onNewChat();
                            }}
                            size="medium"
                            sx={{
                                minWidth: 48,
                                minHeight: 48,
                                transition: 'all 0.2s ease',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <NewChatIcon size={24} weight="regular" />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Search Chats" placement="right">
                        <IconButton
                            onClick={(e) => {
                                e.stopPropagation();
                                onSearch();
                            }}
                            size="medium"
                            sx={{
                                minWidth: 48,
                                minHeight: 48,
                                transition: 'all 0.2s ease',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <SearchIcon size={24} weight="regular" />
                        </IconButton>
                    </Tooltip>
                </Box>
            ) : null}

            {/* Chat history and projects section - always rendered but with opacity transitions */}
            {!isCollapsed && (
                <Box
                    sx={{
                        flex: 1,
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                        opacity: isCollapsed ? 0 : 1,
                        transition: 'opacity 0.2s ease',
                    }}
                >
                    {/* New Chat and Search Buttons as List Items */}
                    <List sx={{ py: 0 }}>
                        <ListItemButton
                            component="div"
                            onClick={onNewChat}
                        >
                            <ListItemIcon>
                                <NewChatIcon size={24} weight="regular" />
                            </ListItemIcon>
                            <ListItemText
                                primary="New Chat"
                                sx={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                }}
                            />
                        </ListItemButton>

                        <ListItemButton
                            component="div"
                            onClick={onSearch}

                        >
                            <ListItemIcon>
                                <SearchIcon size={24} weight="regular" />
                            </ListItemIcon>
                            <ListItemText
                                primary="Search Chats"
                                sx={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',

                                }}
                            />
                        </ListItemButton>
                    </List>

                    {/* Projects Section */}
                    <Box>
                        <List sx={{ py: 0 }}>
                            {/* New Project Button */}
                            <NewProjectButton />

                            {/* Project Items */}
                            {projects.map((project) => (
                                <ProjectItem
                                    key={project.id}
                                    project={project}
                                />
                            ))}
                        </List>
                    </Box>

                    <Divider
                        sx={{
                            opacity: isCollapsed ? 0 : 1,
                            transition: 'opacity 0.3s ease',
                            transitionDelay: isCollapsed ? '0s' : '0.16s',
                        }}
                    />

                    {/* Chat History Section */}
                    <Box sx={{ flex: 1, overflow: 'auto' }}>
                        {Object.entries(chatHistory).map(([key, section]) => (
                            <Box key={key} sx={{ mb: key === 'lastWeek' ? 0 : 3 }}>
                                <ListSubheader
                                    sx={{
                                        backgroundColor: currentTheme.sidebarBackgroundColor,
                                        transition: 'opacity 0.3s ease',
                                        transitionDelay: '0.18s',
                                    }}
                                >
                                    {section.label}
                                </ListSubheader>
                                <List sx={{ py: 0 }}>
                                    {section.chats.map((chat) => (
                                        <ChatHistoryItem
                                            key={chat.id}
                                            chat={chat}
                                            onRename={handleRename}
                                            onDelete={handleDelete}
                                        />
                                    ))}
                                </List>
                            </Box>
                        ))}
                    </Box>
                </Box>
            )}

            {/* Rename Dialog */}
            <RenameChatDialog
                open={renameDialog.open}
                newTitle={renameDialog.newTitle}
                onTitleChange={(newTitle) => setRenameDialog(prev => ({ ...prev, newTitle }))}
                onConfirm={handleConfirmRename}
                onCancel={handleCancelRename}
            />

            {/* Delete Confirmation Dialog */}
            <DeleteChatDialog
                open={deleteDialog.open}
                chatTitle={deleteDialog.chatTitle}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </Paper>
    );
}; export default ChatHistorySidebar;