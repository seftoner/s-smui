import { ToggleButtonGroup, ToggleButton, styled } from '@mui/material';
import type { ValueLogicOperator } from './types';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    gap: theme.spacing(0.5),
    padding: theme.spacing(1),
    borderBottom: `1px solid ${theme.palette.divider}`,
    justifyContent: 'center',
}));

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
    border: 'none',
    borderRadius: `${theme.shape.borderRadius}px !important`,
    padding: theme.spacing(0.5, 2),
    fontSize: '0.75rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    minWidth: 50,
    color: theme.palette.text.secondary,

    '&.Mui-selected': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        },
    },

    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
}));

interface MultiValueLogicSelectorProps {
    value: ValueLogicOperator;
    onChange: (value: ValueLogicOperator) => void;
    disabled?: boolean;
}

/**
 * MultiValueLogicSelector - Toggle button group for selecting AND/OR logic
 * Used in multi-value filters (multi-text, multi-select) to specify how values should be combined
 */
export const MultiValueLogicSelector: React.FC<MultiValueLogicSelectorProps> = ({
    value,
    onChange,
    disabled = false,
}) => {
    const handleChange = (_event: React.MouseEvent<HTMLElement>, newValue: ValueLogicOperator | null) => {
        if (newValue !== null) {
            onChange(newValue);
        }
    };

    return (
        <StyledToggleButtonGroup
            value={value}
            exclusive
            onChange={handleChange}
            disabled={disabled}
            size="small"
        >
            <StyledToggleButton value="and">
                AND
            </StyledToggleButton>
            <StyledToggleButton value="or">
                OR
            </StyledToggleButton>
        </StyledToggleButtonGroup>
    );
};
