// Example: How to use surface colors in components

import React from 'react';
import { Box, Card, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export const SurfaceColorsExample: React.FC = () => {
    const theme = useTheme();

    // Access surface colors from theme palette
    const surfaceColors = {
        surface_0: (theme.palette as any).background?.surface_0 || theme.palette.background.default,
        surface_1: (theme.palette as any).background?.surface_1 || '#f7f7f7',
        surface_2: (theme.palette as any).background?.surface_2 || '#fcfcfc',
        surface_3: (theme.palette as any).background?.surface_3 || theme.palette.background.paper,
        surface_ai_1: (theme.palette as any).background?.surface_ai_1 || theme.palette.background.paper,
        surface_ai_2: (theme.palette as any).background?.surface_ai_2 || '#f9f9f9',
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Surface Colors Usage Examples
            </Typography>

            {/* Method 1: Using surface colors from theme palette */}
            <Box
                sx={{
                    backgroundColor: surfaceColors.surface_1,
                    p: 2,
                    mb: 2,
                    borderRadius: 2,
                }}
            >
                <Typography>Using surface_1 from theme: {surfaceColors.surface_1}</Typography>
            </Box>

            {/* Method 2: Using different surface level */}
            <Box
                sx={{
                    backgroundColor: surfaceColors.surface_2,
                    p: 2,
                    mb: 2,
                    borderRadius: 2,
                }}
            >
                <Typography>Using surface_2 from theme: {surfaceColors.surface_2}</Typography>
            </Box>

            {/* Method 3: Different surface levels */}
            <Box display="flex" gap={2} flexWrap="wrap">
                {Object.entries(surfaceColors).map(([level, color]) => (
                    <Card
                        key={level}
                        sx={{
                            backgroundColor: color,
                            minWidth: 120,
                            minHeight: 80,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid #ddd',
                        }}
                    >
                        <Box textAlign="center">
                            <Typography variant="caption" fontWeight="bold">
                                {level}
                            </Typography>
                            <Typography variant="caption" display="block">
                                {color}
                            </Typography>
                        </Box>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};