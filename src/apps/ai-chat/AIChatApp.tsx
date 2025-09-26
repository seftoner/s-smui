import React, { useState } from 'react';
import {
    Box,
} from '@mui/material';
import { PromptInput, WelcomeSection, ChatHistorySidebar } from '../../components/ai-chat';

export const AIChatApp: React.FC = () => {
    const [message, setMessage] = useState('');
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

    const handleSend = () => {
        if (!message.trim()) return;

        // For now, just clear the message after sending
        // Chat functionality will be added later
        console.log('Message sent:', message);
        setMessage('');
    };

    const handleToggleCollapse = () => {
        setIsSidebarCollapsed(prev => !prev);
        console.log('Toggle sidebar collapse:', !isSidebarCollapsed);
    };

    const handleNewChat = () => {
        console.log('Create new chat');
        // New chat functionality will be added later
        // Clear current message and reset state
        setMessage('');
    };

    const handleSearch = () => {
        console.log('Search chats');
        // Search functionality will be added later
        // This would typically open a search dialog or expand the sidebar
        if (isSidebarCollapsed) {
            setIsSidebarCollapsed(false);
        }
    };

    return (
        <Box
            sx={{
                height: '100%',
                width: '100%',
                display: 'flex',
                backgroundColor: 'transparent', // Let Layout handle the background
            }}
        >

            {/* Main Chat Area */}
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 4, // Use theme spacing
                    overflow: 'auto',
                }}
            >
                <Box
                    sx={{
                        maxWidth: 768,
                        width: '100%',
                    }}
                >
                    <WelcomeSection />
                    <PromptInput
                        value={message}
                        onChange={setMessage}
                        onSend={handleSend}
                        disabled={false}
                        mode="landing"
                    />
                </Box>
            </Box>

            {/* Chat History Sidebar */}

            <ChatHistorySidebar
                isCollapsed={isSidebarCollapsed}
                onToggleCollapse={handleToggleCollapse}
                onNewChat={handleNewChat}
                onSearch={handleSearch}
            />

        </Box>
    );
};

export default AIChatApp;