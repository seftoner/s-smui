// Example: How to use surface colors in components

import React from 'react';
import { Box, Card, Typography } from '@mui/material';
import { surfaceColors } from '../theme';

export const SurfaceColorsExample: React.FC = () => {
    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Surface Colors Usage Examples
            </Typography>

            {/* Method 1: Using surfaceColors directly */}
            <Box
                sx={{
                    backgroundColor: surfaceColors.surface[1],
                    p: 2,
                    mb: 2,
                    borderRadius: 2,
                }}
            >
                <Typography>Using surface[1] directly: {surfaceColors.surface[1]}</Typography>
            </Box>

            {/* Method 2: Using surfaceColors with theme reference */}
            <Box
                sx={{
                    backgroundColor: surfaceColors.surface[2],
                    p: 2,
                    mb: 2,
                    borderRadius: 2,
                }}
            >
                <Typography>Using surfaceColors.surface[2]: {surfaceColors.surface[2]}</Typography>
            </Box>

            {/* Method 3: Different surface levels */}
            <Box display="flex" gap={2} flexWrap="wrap">
                {Object.entries(surfaceColors.surface).map(([level, color]) => (
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
                                Surface {level}
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