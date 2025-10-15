import {
    EqualsIcon,
    NotEqualsIcon,
    GreaterThanIcon,
    LessThanIcon,
    MagnifyingGlassIcon,
    FunnelIcon,
    CaretRightIcon,
    CaretLeftIcon,
    ListIcon,
    ProhibitIcon
} from '@phosphor-icons/react';
import { useTheme } from '@mui/material';

/**
 * Gets the appropriate icon for an operator with color
 * 
 * @param operatorId - The operator ID to get the icon for
 * @param disabled - Whether the icon should appear disabled
 * @returns React element containing the colored operator icon
 */
export const getOperatorIcon = (operatorId: string, disabled = false) => {
    const theme = useTheme();
    const colors = colorMap[operatorId as keyof typeof colorMap] ?? colorMap.default;
    const color = disabled
        ? theme.palette.action.disabled
        : (theme.palette.mode === 'dark' ? colors.dark : colors.light);

    const iconMap = {
        'equals': <EqualsIcon weight="duotone" color={color} />,
        'not-equals': <NotEqualsIcon weight="duotone" color={color} />,
        'greater-than': <GreaterThanIcon weight="duotone" color={color} />,
        'less-than': <LessThanIcon weight="duotone" color={color} />,
        'greater-than-or-equal': <CaretRightIcon weight="duotone" color={color} />,
        'less-than-or-equal': <CaretLeftIcon weight="duotone" color={color} />,
        'contains': <MagnifyingGlassIcon weight="duotone" color={color} />,
        'not-contains': <ProhibitIcon weight="duotone" color={color} />,
        'starts-with': <CaretRightIcon weight="duotone" color={color} />,
        'ends-with': <CaretLeftIcon weight="duotone" color={color} />,
        'in': <ListIcon weight="duotone" color={color} />,
        'not-in': <FunnelIcon weight="duotone" color={color} />,
    } as const;

    return iconMap[operatorId as keyof typeof iconMap] ?? <EqualsIcon weight="duotone" color={color} />;
};

const colorMap = {
    equals: { light: '#1565C0', dark: '#90CAF9' },
    'not-equals': { light: '#C62828', dark: '#EF5350' },
    'greater-than': { light: '#2E7D2E', dark: '#A5D6A7' },
    'less-than': { light: '#E65100', dark: '#FFB74D' },
    'greater-equal': { light: '#388E3C', dark: '#81C784' },
    'less-equal': { light: '#F57C00', dark: '#FFB74D' },
    contains: { light: '#7B1FA2', dark: '#CE93D8' },
    'not-contains': { light: '#AD1457', dark: '#F48FB1' },
    'starts-with': { light: '#0277BD', dark: '#4FC3F7' },
    'ends-with': { light: '#00695C', dark: '#4DB6AC' },
    in: { light: '#689F38', dark: '#AED581' },
    'not-in': { light: '#5D4037', dark: '#A1887F' },
    default: { light: 'rgba(0, 0, 0, 0.7)', dark: 'rgba(255, 255, 255, 0.7)' }
} as const;