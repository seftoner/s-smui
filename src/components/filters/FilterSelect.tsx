import { Select, styled } from '@mui/material';
import type { SelectProps } from '@mui/material';
import { CaretDownIcon } from '@phosphor-icons/react';

/**
 * Styled Select component with custom styling
 */
const StyledSelect = styled(Select)<SelectProps>(({ theme }) => ({
    flex: 1,
    padding: theme.spacing(1, 1),
    border: 'none',
    '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
    },
    '& .MuiSelect-select': {
        padding: theme.spacing(1, 1),
        paddingRight: theme.spacing(4), // Space for icon
        display: 'flex',
        alignItems: 'center',
        // minHeight: 44,
        '&:focus': {
            backgroundColor: 'transparent',
        },
    },
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
    '&.Mui-disabled': {
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
    // Icon styling for Phosphor icon
    '& .MuiSelect-icon': {
        right: theme.spacing(1),
        color: theme.palette.action.active,
        fontSize: '1rem', // 16px for Phosphor icons
    },
    '&.Mui-disabled .MuiSelect-icon': {
        color: theme.palette.action.disabled,
    },
}));

/**
 * Custom FilterSelect component with Phosphor CaretDown icon
 * Removes borders, backgrounds, and adds consistent padding
 */
export const FilterSelect = (props: SelectProps) => {
    return <StyledSelect IconComponent={CaretDownIcon} {...props} />;
};
