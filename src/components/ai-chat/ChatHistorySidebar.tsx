import React from 'react';
import {
    Box,
    Paper,
    IconButton,
    Tooltip,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider,
    ListSubheader,
} from '@mui/material';
import {
    TextIndentIcon as ExpandIcon,
    PencilSimpleIcon as NewChatIcon,
    MagnifyingGlassIcon as SearchIcon,
} from '@phosphor-icons/react';
import { useAppTheme } from '../../contexts';
import { ProjectItem, ChatHistoryItem, NewProjectButton } from '.';

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

    const handleToggleCollapse = () => {
        onToggleCollapse();
    };    // Test data structure based on Figma expanded design
    const projects: Project[] = [
        { id: 1, name: 'Project #1', isOpen: true },
        { id: 2, name: 'Project #2', isOpen: false },
        { id: 3, name: 'Development Project', isOpen: false },
    ];

    const chatHistory = {
        today: {
            label: 'Today',
            chats: [
                { id: 1, title: 'Quick Draft #001', timestamp: '10:30 AM' },
                { id: 2, title: 'Smart Editing Session', timestamp: '2:15 PM' },
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
    };

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
            <Box
                sx={{
                    flex: 1,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                    opacity: isCollapsed ? 0 : 1,
                    transition: 'opacity 0.2s ease',
                    // transitionDelay: isCollapsed ? '0s' : '0.2s',
                    // pointerEvents: isCollapsed ? 'none' : 'auto',
                }}
            >
                {/* New Chat and Search Buttons as List Items */}
                <List sx={{ py: 0 }}>
                    <ListItem
                        component="div"
                        onClick={onNewChat}
                        sx={{
                            cursor: 'pointer',
                            borderRadius: 1,
                        }}
                    >
                        <ListItemIcon sx={{ minWidth: 32, color: 'text.primary' }}>
                            <NewChatIcon size={24} weight="regular" />
                        </ListItemIcon>
                        <ListItemText
                            primary="New Chat"
                            sx={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                // opacity: isCollapsed ? 0 : 1,
                                // transition: 'opacity 0.3s ease',
                                // transitionDelay: isCollapsed ? '0s' : '0.1s',
                            }}
                        />
                    </ListItem>

                    <ListItem
                        component="div"
                        onClick={onSearch}
                        sx={{
                            cursor: 'pointer',
                            borderRadius: 1,

                        }}
                    >
                        <ListItemIcon sx={{ minWidth: 32, color: 'text.primary' }}>
                            <SearchIcon size={24} weight="regular" />
                        </ListItemIcon>
                        <ListItemText
                            primary="Search Chats"
                            sx={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',

                            }}
                        />
                    </ListItem>
                </List>

                {/* Projects Section */}
                <Box>
                    <List sx={{ py: 0 }}>
                        {/* New Project Button */}
                        {!isCollapsed && (
                            <NewProjectButton />
                        )}

                        {/* Project Items */}
                        {!isCollapsed && projects.map((project) => (
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
                    {!isCollapsed && Object.entries(chatHistory).map(([key, section]) => (
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
                                    />
                                ))}
                            </List>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Paper>
    );
};

export default ChatHistorySidebar;