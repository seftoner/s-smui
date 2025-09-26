import React from 'react';
import { Box, Typography, Card, CardContent, CardActions, Button, Chip } from '@mui/material';
import {
    Calendar,
    Envelope,
    UserCircle,
    Gear,
    ChartPie,
    Notebook,
    CurrencyDollar,
    Users,
    Clock,
    Shield,
    Bell,
    CloudArrowDown
} from '@phosphor-icons/react';
import { AppCard } from '../../components';

const MoreAppsApp: React.FC = () => {
    const availableApps = [
        {
            name: 'Calendar',
            description: 'Schedule and manage events',
            icon: <Calendar size={32} />,
            color: '#3b82f6',
            status: 'Available',
            category: 'Productivity'
        },
        {
            name: 'Email',
            description: 'Send and receive emails',
            icon: <Envelope size={32} />,
            color: '#ef4444',
            status: 'Available',
            category: 'Communication'
        },
        {
            name: 'Contacts',
            description: 'Manage your contacts',
            icon: <UserCircle size={32} />,
            color: '#10b981',
            status: 'Available',
            category: 'People'
        },
        {
            name: 'Settings',
            description: 'Configure your workspace',
            icon: <Gear size={32} />,
            color: '#6b7280',
            status: 'Available',
            category: 'System'
        },
        {
            name: 'Analytics',
            description: 'View detailed analytics',
            icon: <ChartPie size={32} />,
            color: '#8b5cf6',
            status: 'Available',
            category: 'Business'
        },
        {
            name: 'Notes',
            description: 'Take and organize notes',
            icon: <Notebook size={32} />,
            color: '#f59e0b',
            status: 'Available',
            category: 'Productivity'
        },
        {
            name: 'Finance',
            description: 'Track expenses and budgets',
            icon: <CurrencyDollar size={32} />,
            color: '#059669',
            status: 'Coming Soon',
            category: 'Business'
        },
        {
            name: 'Team',
            description: 'Collaborate with your team',
            icon: <Users size={32} />,
            color: '#dc2626',
            status: 'Coming Soon',
            category: 'People'
        },
        {
            name: 'Time Tracking',
            description: 'Track time spent on tasks',
            icon: <Clock size={32} />,
            color: '#7c3aed',
            status: 'Coming Soon',
            category: 'Productivity'
        },
        {
            name: 'Security',
            description: 'Manage security settings',
            icon: <Shield size={32} />,
            color: '#dc2626',
            status: 'Beta',
            category: 'System'
        },
        {
            name: 'Notifications',
            description: 'Manage notification settings',
            icon: <Bell size={32} />,
            color: '#f59e0b',
            status: 'Beta',
            category: 'System'
        },
        {
            name: 'Backup',
            description: 'Backup and restore data',
            icon: <CloudArrowDown size={32} />,
            color: '#0891b2',
            status: 'Beta',
            category: 'System'
        }
    ];

    const categories = ['All', 'Productivity', 'Communication', 'People', 'Business', 'System'];
    const [selectedCategory, setSelectedCategory] = React.useState('All');

    const filteredApps = selectedCategory === 'All'
        ? availableApps
        : availableApps.filter(app => app.category === selectedCategory);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Available': return 'success';
            case 'Coming Soon': return 'warning';
            case 'Beta': return 'info';
            default: return 'default';
        }
    };

    return (
        <Box>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" gutterBottom>
                    More Apps
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Discover and access additional applications to enhance your workspace.
                </Typography>
            </Box>

            {/* Category Filter */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                    Categories
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {categories.map((category) => (
                        <Chip
                            key={category}
                            label={category}
                            variant={selectedCategory === category ? 'filled' : 'outlined'}
                            color={selectedCategory === category ? 'primary' : 'default'}
                            onClick={() => setSelectedCategory(category)}
                            sx={{ cursor: 'pointer' }}
                        />
                    ))}
                </Box>
            </Box>

            {/* Apps Grid */}
            <AppCard title={`${selectedCategory} Apps (${filteredApps.length})`}>
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' },
                    gap: 3
                }}>
                    {filteredApps.map((app, index) => (
                        <Card
                            key={index}
                            sx={{
                                height: '100%',
                                cursor: app.status === 'Available' ? 'pointer' : 'not-allowed',
                                opacity: app.status === 'Coming Soon' ? 0.6 : 1,
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                '&:hover': app.status === 'Available' ? {
                                    transform: 'translateY(-4px)',
                                    boxShadow: 4
                                } : {}
                            }}
                            onClick={() => {
                                if (app.status === 'Available') {
                                    // In a real app, you would navigate to the specific app
                                    console.log(`Opening ${app.name} app`);
                                }
                            }}
                        >
                            <CardContent sx={{ textAlign: 'center', p: 3 }}>
                                <Box
                                    sx={{
                                        width: 64,
                                        height: 64,
                                        borderRadius: 3,
                                        backgroundColor: app.color,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        mx: 'auto',
                                        mb: 2,
                                        color: 'white'
                                    }}
                                >
                                    {app.icon}
                                </Box>

                                <Typography variant="h6" gutterBottom>
                                    {app.name}
                                </Typography>

                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                    {app.description}
                                </Typography>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Chip
                                        label={app.status}
                                        color={getStatusColor(app.status) as any}
                                        size="small"
                                    />
                                    <Chip
                                        label={app.category}
                                        variant="outlined"
                                        size="small"
                                    />
                                </Box>
                            </CardContent>

                            {app.status === 'Available' && (
                                <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            console.log(`Launching ${app.name}`);
                                        }}
                                    >
                                        Launch
                                    </Button>
                                </CardActions>
                            )}

                            {app.status === 'Beta' && (
                                <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            console.log(`Joining ${app.name} beta`);
                                        }}
                                    >
                                        Join Beta
                                    </Button>
                                </CardActions>
                            )}

                            {app.status === 'Coming Soon' && (
                                <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        disabled
                                    >
                                        Coming Soon
                                    </Button>
                                </CardActions>
                            )}
                        </Card>
                    ))}
                </Box>
            </AppCard>
        </Box>
    );
};

export default MoreAppsApp;