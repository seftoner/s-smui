import { ToggleButtonGroup, ToggleButton } from '@mui/material';

import type { ValueLogicOperator } from './types';
interface MultiValueLogicSelectorProps {
    value: ValueLogicOperator;
    onChange: (value: ValueLogicOperator) => void;
}

/**
 * MultiValueLogicSelector - Toggle button group for selecting AND/OR logic
 * Used in multi-value filters (multi-text, multi-select) to specify how values should be combined
 */
export const MultiValueLogicSelector: React.FC<MultiValueLogicSelectorProps> = ({
    value,
    onChange,
}) => {
    const handleChange = (_event: React.MouseEvent<HTMLElement>, newValue: ValueLogicOperator | null) => {
        if (newValue !== null) {
            onChange(newValue);
        }
    };

    return (
        <ToggleButtonGroup
            color="primary"
            value={value}
            exclusive
            onChange={handleChange}
            size="small"
            aria-label="Operator"
        >
            <ToggleButton value="and">
                AND
            </ToggleButton>
            <ToggleButton value="or">
                OR
            </ToggleButton>
        </ToggleButtonGroup>
    );
};
