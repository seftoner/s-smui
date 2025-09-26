import React from 'react';
import { Card, CardContent, CardActions, Typography } from '@mui/material';

interface AppCardProps {
    title: string;
    description?: string;
    children?: React.ReactNode;
    actions?: React.ReactNode;
    variant?: 'elevation' | 'outlined';
}

export const AppCard: React.FC<AppCardProps> = ({
    title,
    description,
    children,
    actions,
    variant = 'elevation',
}) => {
    return (
        <Card variant={variant} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                {description && (
                    <Typography variant="body2" color="text.secondary" paragraph>
                        {description}
                    </Typography>
                )}
                {children}
            </CardContent>
            {actions && (
                <CardActions>
                    {actions}
                </CardActions>
            )}
        </Card>
    );
};

export default AppCard;