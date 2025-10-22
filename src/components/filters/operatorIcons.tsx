import { useTheme } from '@mui/material';
import {
    ContainsIcon,
    EndsWithIcon,
    StartsWithIcon,
    EqualsIcon,
    NotEqualsIcon,
    GreaterThanIcon,
    LessThanIcon,
    GreaterThanOrEqualIcon,
    LessThanOrEqualIcon,
} from '../../assets/icons/operators';

/**
 * Gets the appropriate icon for an operator with semantic color coding
 * 
 * @param operatorId - The operator ID to get the icon for
 * @param disabled - Whether the icon should appear disabled
 * @returns React element containing the colored operator icon
 */
export const getOperatorIcon = (operatorId: string, disabled = false) => {
    const theme = useTheme();

    const getOperatorColor = (colorer: string): string => {
        if (disabled) {
            return theme.vars.palette.action.active;
        }
        return colorer;
    };

    const iconMap = {
        'contains': <ContainsIcon color={getOperatorColor(theme.vars.palette.primary.dark)} />,
        'equals': <EqualsIcon color={getOperatorColor(theme.vars.palette.success.main)} />,
        'not-equals': <NotEqualsIcon color={getOperatorColor(theme.vars.palette.error.main)} />,
        'starts-with': <StartsWithIcon color={getOperatorColor(theme.vars.palette.warning.dark)} />,
        'ends-with': <EndsWithIcon color={getOperatorColor(theme.vars.palette.warning.dark)} />,
        'greater-than': <GreaterThanIcon color={getOperatorColor(theme.vars.palette.info.main)} />,
        'less-than': <LessThanIcon color={getOperatorColor(theme.vars.palette.info.main)} />,
        'greater-than-or-equal': <GreaterThanOrEqualIcon color={getOperatorColor(theme.vars.palette.info.main)} />,
        'less-than-or-equal': <LessThanOrEqualIcon color={getOperatorColor(theme.vars.palette.info.main)} />,

    } as const;

    return iconMap[operatorId as keyof typeof iconMap] ?? <EqualsIcon color={getOperatorColor(theme.vars.palette.primary.dark)} />;
};
