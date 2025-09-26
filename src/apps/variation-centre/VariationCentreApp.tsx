import React, { useState } from 'react';
import {
    Box,
    Typography,
    Tabs,
    Tab,
    Card,
    CardContent,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Chip,
    Button
} from '@mui/material';
import { ChartBar, TrendUp, Warning, CheckCircle } from '@phosphor-icons/react';
import { AppCard, EmptyState } from '../../components';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`variation-tabpanel-${index}`}
            aria-labelledby={`variation-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const VariationCentreApp: React.FC = () => {
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    // Mock data for variations
    const variations = [
        {
            id: 1,
            name: 'Feature Flag A',
            status: 'active',
            traffic: '50%',
            conversion: '+12.5%',
            type: 'A/B Test'
        },
        {
            id: 2,
            name: 'UI Layout Test',
            status: 'draft',
            traffic: '0%',
            conversion: 'N/A',
            type: 'Multivariate'
        },
        {
            id: 3,
            name: 'Checkout Flow',
            status: 'paused',
            traffic: '25%',
            conversion: '-2.1%',
            type: 'A/B Test'
        },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'success';
            case 'paused': return 'warning';
            case 'draft': return 'default';
            default: return 'default';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'active': return <CheckCircle size={16} />;
            case 'paused': return <Warning size={16} />;
            default: return null;
        }
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4">Variation Centre</Typography>
                <Button variant="contained" color="primary">
                    Create New Test
                </Button>
            </Box>

            {/* Overview Stats */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3, mb: 4 }}>
                <Card>
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{ p: 1, borderRadius: 2, backgroundColor: 'primary.light', color: 'primary.contrastText' }}>
                                <ChartBar size={24} />
                            </Box>
                            <Box>
                                <Typography variant="h5">3</Typography>
                                <Typography color="text.secondary">Active Tests</Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{ p: 1, borderRadius: 2, backgroundColor: 'success.light', color: 'success.contrastText' }}>
                                <TrendUp size={24} />
                            </Box>
                            <Box>
                                <Typography variant="h5">+8.3%</Typography>
                                <Typography color="text.secondary">Avg. Conversion</Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{ p: 1, borderRadius: 2, backgroundColor: 'warning.light', color: 'warning.contrastText' }}>
                                <Warning size={24} />
                            </Box>
                            <Box>
                                <Typography variant="h5">12.5K</Typography>
                                <Typography color="text.secondary">Total Visitors</Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Box>

            {/* Tabs */}
            <AppCard title="Test Management">
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tabValue} onChange={handleTabChange}>
                        <Tab label="Active Tests" />
                        <Tab label="Results" />
                        <Tab label="Settings" />
                    </Tabs>
                </Box>

                <TabPanel value={tabValue} index={0}>
                    {variations.length > 0 ? (
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Test Name</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Traffic</TableCell>
                                    <TableCell>Conversion</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {variations.map((variation) => (
                                    <TableRow key={variation.id}>
                                        <TableCell>
                                            <Typography variant="subtitle2">
                                                {variation.name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Chip label={variation.type} size="small" variant="outlined" />
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={variation.status}
                                                color={getStatusColor(variation.status) as any}
                                                size="small"
                                                {...(getStatusIcon(variation.status) && { icon: getStatusIcon(variation.status)! })}
                                            />
                                        </TableCell>
                                        <TableCell>{variation.traffic}</TableCell>
                                        <TableCell>
                                            <Typography
                                                color={variation.conversion.startsWith('+') ? 'success.main' :
                                                    variation.conversion.startsWith('-') ? 'error.main' : 'text.primary'}
                                            >
                                                {variation.conversion}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Button size="small" variant="outlined">
                                                View Details
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <EmptyState
                            icon={<ChartBar size={64} />}
                            title="No active tests"
                            description="Create your first A/B test to get started"
                        />
                    )}
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                    <EmptyState
                        icon={<TrendUp size={64} />}
                        title="Test Results"
                        description="Detailed analytics and results will appear here"
                    />
                </TabPanel>

                <TabPanel value={tabValue} index={2}>
                    <EmptyState
                        icon={<ChartBar size={64} />}
                        title="Settings"
                        description="Configure your variation testing preferences"
                    />
                </TabPanel>
            </AppCard>
        </Box>
    );
};

export default VariationCentreApp;