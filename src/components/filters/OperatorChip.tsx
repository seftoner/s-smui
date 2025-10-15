import React from 'react';
import { Chip, useTheme } from '@mui/material';
import type { ChipProps } from '@mui/material';
import type { OperatorType } from './types';

interface OperatorChipProps extends Omit<ChipProps, 'color' | 'variant'> {
    operatorId?: OperatorType;
    chipVariant?: 'default' | 'subtle';
}

// Color mappings for better contrast in light/dark themes
const colorMap = {
    equals: {
        light: { bg: '#E3F2FD', text: '#1565C0' },
        dark: { bg: 'rgba(33, 150, 243, 0.15)', text: '#90CAF9' }
    },
    'not-equals': {
        light: { bg: '#FFEBEE', text: '#C62828' },
        dark: { bg: 'rgba(244, 67, 54, 0.15)', text: '#EF5350' }
    },
    'greater-than': {
        light: { bg: '#E8F5E8', text: '#2E7D2E' },
        dark: { bg: 'rgba(76, 175, 80, 0.15)', text: '#A5D6A7' }
    },
    'less-than': {
        light: { bg: '#FFF3E0', text: '#E65100' },
        dark: { bg: 'rgba(255, 152, 0, 0.15)', text: '#FFB74D' }
    },
    'greater-equal': {
        light: { bg: '#E8F5E8', text: '#388E3C' },
        dark: { bg: 'rgba(76, 175, 80, 0.12)', text: '#81C784' }
    },
    'less-equal': {
        light: { bg: '#FFF8E1', text: '#F57C00' },
        dark: { bg: 'rgba(255, 152, 0, 0.12)', text: '#FFB74D' }
    },
    contains: {
        light: { bg: '#F3E5F5', text: '#7B1FA2' },
        dark: { bg: 'rgba(156, 39, 176, 0.15)', text: '#CE93D8' }
    },
    'not-contains': {
        light: { bg: '#FCE4EC', text: '#AD1457' },
        dark: { bg: 'rgba(233, 30, 99, 0.15)', text: '#F48FB1' }
    },
    'starts-with': {
        light: { bg: '#E1F5FE', text: '#0277BD' },
        dark: { bg: 'rgba(3, 169, 244, 0.15)', text: '#4FC3F7' }
    },
    'ends-with': {
        light: { bg: '#E0F2F1', text: '#00695C' },
        dark: { bg: 'rgba(0, 150, 136, 0.15)', text: '#4DB6AC' }
    },
    in: {
        light: { bg: '#F9FBE7', text: '#689F38' },
        dark: { bg: 'rgba(139, 195, 74, 0.15)', text: '#AED581' }
    },
    'not-in': {
        light: { bg: '#EFEBE9', text: '#5D4037' },
        dark: { bg: 'rgba(121, 85, 72, 0.15)', text: '#A1887F' }
    },
    default: {
        light: { bg: 'rgba(0, 0, 0, 0.06)', text: 'rgba(0, 0, 0, 0.7)' },
        dark: { bg: 'rgba(255, 255, 255, 0.08)', text: 'rgba(255, 255, 255, 0.7)' }
    }
};

export const OperatorChip: React.FC<OperatorChipProps> = ({
    operatorId,
    chipVariant = 'subtle',
    sx,
    ...props
}) => {
    const theme = useTheme();

    const getChipStyles = () => {
        const isDark = theme.palette.mode === 'dark';
        const themeKey = isDark ? 'dark' : 'light';

        // Map operator ID to color key
        const colorKey = operatorId || 'default';

        // Get color scheme from our mapping, fallback to default
        const colorScheme = colorMap[colorKey as keyof typeof colorMap] || colorMap.default;
        const colors = colorScheme[themeKey];

        if (chipVariant === 'subtle') {
            return {
                backgroundColor: colors.bg,
                color: colors.text,
            };
        }

        // Default variant with slightly more contrast
        return {
            backgroundColor: colors.bg,
            color: colors.text,
        };
    };

    return (
        <Chip
            {...props}
            key={`${operatorId}-${theme.palette.mode}`}
            sx={{
                ...getChipStyles(),
                ...sx,
            }}
        />
    );
};