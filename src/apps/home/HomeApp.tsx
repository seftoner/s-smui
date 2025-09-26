import React from 'react';
import { Box, Typography, Card, CardContent, CardActions, Button } from '@mui/material';
import { MagnifyingGlass, ClipboardText, File, ChatCircle } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import { AppCard } from '../../components';

const HomeApp: React.FC = () => {
    const navigate = useNavigate();

    const quickActions = [
        {
            title: 'Search',
            description: 'Find anything across all your apps',
            icon: <MagnifyingGlass size={24} />,
            path: '/search',
            color: '#3b82f6'
        },
        {
            title: 'Tasks',
            description: 'Manage your tasks and projects',
            icon: <ClipboardText size={24} />,
            path: '/tasks',
            color: '#10b981'
        },
        {
            title: 'Documents',
            description: 'Access and organize your files',
            icon: <File size={24} />,
            path: '/documents',
            color: '#f59e0b'
        },
        {
            title: 'AI Chat',
            description: 'Chat with AI assistant',
            icon: <ChatCircle size={24} />,
            path: '/chat',
            color: '#8b5cf6'
        }
    ];

    const stats = [
        { label: 'Total Tasks', value: '24', change: '+12%' },
        { label: 'Documents', value: '156', change: '+8%' },
        { label: 'Conversations', value: '12', change: '+3%' },
        { label: 'Projects', value: '8', change: '+25%' }
    ];

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Welcome back! 👋
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Here's what's happening with your workspace today.
                </Typography>
            </Box>

            {/* Stats Overview */}
            <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3 }}>
                    {stats.map((stat, index) => (
                        <Card key={index}>
                            <CardContent>
                                <Typography color="text.secondary" gutterBottom>
                                    {stat.label}
                                </Typography>
                                <Typography variant="h4">
                                    {stat.value}
                                </Typography>
                                <Typography variant="body2" color="success.main">
                                    {stat.change} from last month
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Box>

            {/* Quick Actions */}
            <AppCard title="Quick Actions">
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 2 }}>
                    {quickActions.map((action, index) => (
                        <Card
                            key={index}
                            sx={{
                                height: '100%',
                                cursor: 'pointer',
                                transition: 'transform 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: 2
                                }
                            }}
                            onClick={() => navigate(action.path)}
                        >
                            <CardContent>
                                <Box
                                    sx={{
                                        width: 48,
                                        height: 48,
                                        borderRadius: 2,
                                        backgroundColor: action.color,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        mb: 2,
                                        color: 'white'
                                    }}
                                >
                                    {action.icon}
                                </Box>
                                <Typography variant="h6" gutterBottom>
                                    {action.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {action.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => navigate(action.path)}>
                                    Open
                                </Button>
                            </CardActions>
                        </Card>
                    ))}
                </Box>
            </AppCard>

            {/* Recent Activity */}
            <Box sx={{ mt: 4 }}>
                <AppCard title="Recent Activity">
                    <Box sx={{ p: 2 }}>
                        <Typography color="text.secondary">
                            Your recent activity will appear here once you start using the applications.
                        </Typography>
                    </Box>
                </AppCard>
            </Box>
        </Box>
    );
};

export default HomeApp;