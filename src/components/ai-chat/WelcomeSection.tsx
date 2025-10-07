import type { } from '@mui/material/themeCssVarsAugmentation';
import React from 'react';
import {
    Box,
    Typography,
    useTheme,
} from '@mui/material';
import {
    SparkleIcon,
} from '@phosphor-icons/react';

interface WelcomeSectionProps {
    title?: string;
    subtitle?: string;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({
    title = "AI Assistant",
    subtitle = "I'm here to help you with questions, creative tasks, analysis, and more. What would you like to explore today?",
}) => {
    const theme = useTheme();

    return (

        <Box
            sx={{
                textAlign: 'center',
                mb: 4,

                transition: 'opacity 0.6s ease-in-out',
            }}
        >
            <Box
                sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1,
                    mb: 2,
                    p: 2,
                    borderRadius: 3,
                    background: `linear-gradient(135deg, ${theme.vars.palette.primary.main}15, ${theme.vars.palette.info.main}10)`,
                }}
            >
                <SparkleIcon size={24} color={theme.vars.palette.primary.main} />
                <Typography variant="h5" fontWeight="600" color="primary">
                    {title}
                </Typography>
            </Box>
            <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                    maxWidth: 400,
                    mx: 'auto'
                }}
            >
                {subtitle}
            </Typography>
        </Box>

    );
};