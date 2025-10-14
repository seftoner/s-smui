import React, { useState } from 'react';
import {
    Box,
    Chip,
    IconButton,
    MenuItem,
    TextField,
    Checkbox,
    ListItemText,
    Paper,
    Tooltip,
    Typography,
} from '@mui/material';
import { TrashIcon, EyeSlashIcon } from '@phosphor-icons/react';
import type { ActiveFilter, FilterDefinition } from './types';
import { getFilterDefinition } from './filterConfigService';
import { FilterSelect } from './FilterSelect';

interface FilterInputProps {
    filter: ActiveFilter;
    availableFilters: FilterDefinition[];
    onChange: (filter: ActiveFilter) => void;
    onDelete: () => void;
    onToggleEnabled: () => void;
    onFilterTypeChange?: (oldFilterId: string, newFilterId: string) => void;
    isLinked?: boolean;
    isLinkedEnabled?: boolean;
}

export const FilterInput: React.FC<FilterInputProps> = ({
    filter,
    availableFilters,
    onChange,
    onDelete,
    onToggleEnabled,
    onFilterTypeChange,
    isLinked = false,
    isLinkedEnabled = true,
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isToggleVisible, setIsToggleVisible] = useState(false);

    const filterDef = filter.filterId ? getFilterDefinition(filter.filterId) : null;
    const isEmptyFilter = !filter.filterId;
    const currentOperator = filterDef?.operators.find(op => op.id === filter.operator);

    // Handle filter name change
    const handleFilterNameChange = (event: any) => {
        const newFilterId = event.target.value as string;
        const newFilterDef = getFilterDefinition(newFilterId);
        if (!newFilterDef) return;

        const defaultOperator = newFilterDef.operators[0];
        let defaultValue: string | string[] = '';

        if (newFilterDef.valueType === 'multi-select') {
            defaultValue = [];
        }

        const updatedFilter: ActiveFilter = {
            ...filter,
            filterId: newFilterId,
            operator: defaultOperator.id,
            value: defaultValue,
        };

        if (onFilterTypeChange) {
            const oldFilterId = filter.filterId || '';
            onFilterTypeChange(oldFilterId, newFilterId);
        }

        onChange(updatedFilter);
    };

    // Handle operator change
    const handleOperatorChange = (event: any) => {
        const operatorId = event.target.value as string;
        const operator = filterDef?.operators.find(op => op.id === operatorId);
        if (!operator) return;

        onChange({
            ...filter,
            operator: operator.id,
        });
    };

    // Handle value change
    const handleTextValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange({
            ...filter,
            value: event.target.value,
        });
    };

    // Handle toggle button visibility
    const handleToggleClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsToggleVisible(!isToggleVisible);
        onToggleEnabled();
    };

    return (
        <Box
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                width: '100%',
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    opacity: (filter.enabled && isLinkedEnabled) ? 1 : 0.5,
                    transition: 'all 0.2s',
                    overflow: 'hidden',
                    boxShadow: '0px 1px 2px 0px rgba(65, 50, 42, 0.08)',
                    '&:hover': {
                        borderColor: 'primary.light',
                    },
                }}
            >
                {/* Filter Name Row */}
                <FilterSelect
                    value={filter.filterId || ''}
                    onChange={handleFilterNameChange}
                    disabled={!filter.enabled || !isLinkedEnabled || isLinked}
                    displayEmpty
                    renderValue={() => (
                        isEmptyFilter ? (
                            <Typography variant="body1" color='text.disabled'>
                                Select filter type
                            </Typography>
                        ) : (
                            <Typography variant="body1">
                                {isEmptyFilter ? 'Select filter type' : filterDef?.name}
                            </Typography>
                        )

                    )}
                >
                    {availableFilters.map((filterOption) => (
                        <MenuItem key={filterOption.id} value={filterOption.id}>
                            {filterOption.name}
                        </MenuItem>
                    ))}
                </FilterSelect>

                {/* Divider */}
                <Box sx={{ height: '1px', bgcolor: 'divider' }} />

                {/* Value and Operator Row */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'stretch',
                    }}
                >
                    {/* Operator Section */}
                    <FilterSelect
                        value={filter.operator || ''}
                        onChange={handleOperatorChange}
                        disabled={!filter.enabled || !isLinkedEnabled || isEmptyFilter}
                        displayEmpty
                        renderValue={() => (
                            <Chip
                                label={isEmptyFilter ? 'Operator' : (currentOperator?.label || '')}
                                size="small"
                                color={isEmptyFilter ? 'default' : (currentOperator?.color || 'default')}
                                sx={{ opacity: isEmptyFilter ? 0.5 : 1 }}
                            />
                        )}
                        sx={{ flex: 1 }}
                    >
                        {filterDef?.operators.map((operator) => (
                            <MenuItem key={operator.id} value={operator.id}>
                                <Chip
                                    label={operator.label}
                                    size="small"
                                    color={operator.color}
                                />
                            </MenuItem>
                        ))}
                    </FilterSelect>

                    {/* Vertical Divider */}
                    <Box sx={{ width: '1px', bgcolor: 'divider' }} />

                    {/* Value Section */}
                    {isEmptyFilter ? (
                        <Box
                            sx={{
                                flex: 1.6,
                                display: 'flex',
                                alignItems: 'center',
                                px: 2,
                                py: 1,
                                color: 'text.disabled',
                                fontStyle: 'italic',
                            }}
                        >
                            <Typography variant="body1" sx={{ color: 'text.disabled' }}>
                                Value
                            </Typography>
                        </Box>
                    ) : filterDef?.valueType === 'text' ? (
                        <Box
                            sx={{
                                flex: 1.6,
                                display: 'flex',
                                alignItems: 'center',
                                px: 2,
                                py: 1,
                                '&:hover': filter.enabled ? {
                                    bgcolor: 'action.hover',
                                } : {},
                            }}
                        >
                            <TextField
                                fullWidth
                                size="small"
                                variant="standard"
                                placeholder={filterDef.placeholder || 'Enter value...'}
                                value={filter.value as string}
                                onChange={handleTextValueChange}
                                disabled={!filter.enabled || !isLinkedEnabled}
                                autoComplete="off"
                                slotProps={{
                                    input: {
                                        disableUnderline: true,
                                    },
                                }}
                            />
                        </Box>
                    ) : filterDef?.valueType === 'single-select' || filterDef?.valueType === 'multi-select' ? (
                        <FilterSelect
                            multiple={filterDef.valueType === 'multi-select'}
                            value={filterDef.valueType === 'multi-select'
                                ? (Array.isArray(filter.value) ? filter.value : [])
                                : (filter.value as string)
                            }
                            onChange={(e) => {
                                const value = e.target.value;
                                if (filterDef.valueType === 'multi-select') {
                                    const newValue = typeof value === 'string' ? value.split(',') : value;
                                    onChange({
                                        ...filter,
                                        value: newValue as string[],
                                    });
                                } else {
                                    onChange({
                                        ...filter,
                                        value: value as string,
                                    });
                                }
                            }}
                            disabled={!filter.enabled || !isLinkedEnabled}
                            displayEmpty
                            renderValue={(selected) => {
                                const isMulti = filterDef.valueType === 'multi-select';
                                const values = isMulti ? (Array.isArray(selected) ? selected : []) : [];
                                const isEmpty = isMulti ? values.length === 0 : !selected;

                                if (isEmpty) {
                                    return <Typography variant="body1" color='text.disabled'>Select...</Typography>;
                                }

                                if (isMulti) {
                                    const firstOption = filterDef?.options?.find(opt => opt.id === values[0]);
                                    return (
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1, overflow: 'hidden' }}>
                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    flex: 1
                                                }}
                                            >
                                                {firstOption?.label}
                                            </Typography>
                                            {values.length > 1 && (
                                                <Chip
                                                    label={`+${values.length - 1}`}
                                                    size="small"
                                                    color="primary"
                                                    sx={{
                                                        height: 20,
                                                        fontSize: '0.75rem',
                                                    }}
                                                />
                                            )}
                                        </Box>
                                    );
                                }

                                const option = filterDef?.options?.find(opt => opt.id === selected);
                                return (
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        {option?.label}
                                    </Typography>
                                );
                            }}
                            sx={{ flex: 1.6 }}
                        >
                            {filterDef?.options?.map((option) => {
                                if (filterDef.valueType === 'multi-select') {
                                    const values = Array.isArray(filter.value) ? filter.value : [];
                                    const isChecked = values.includes(option.id);

                                    return (
                                        <MenuItem key={option.id} value={option.id}>
                                            <Checkbox checked={isChecked} />
                                            <ListItemText primary={option.label} />
                                        </MenuItem>
                                    );
                                } else {
                                    return (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.label}
                                        </MenuItem>
                                    );
                                }
                            })}
                        </FilterSelect>
                    ) : null}
                </Box>
            </Paper>

            {/* Actions */}
            {
                !isLinked && (
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 1,
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <Tooltip title={filter.enabled ? 'Disable filter' : 'Enable filter'} placement='left'>
                            <IconButton
                                size="small"
                                onClick={handleToggleClick}
                                sx={{
                                    opacity: isHovered || isToggleVisible ? 1 : 0,
                                    transition: 'opacity 0.2s ease',
                                    color: isToggleVisible ? 'primary.main' : 'inherit',
                                }}
                            >
                                <EyeSlashIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete filter" placement='left'>
                            <IconButton
                                size="small"
                                onClick={onDelete}
                                sx={{
                                    color: 'error.main',
                                    opacity: isHovered ? 1 : 0,
                                    transition: 'opacity 0.2s ease',
                                }}
                            >
                                <TrashIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                )
            }
        </Box >
    );
};
