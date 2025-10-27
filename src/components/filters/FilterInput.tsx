import React, { useState } from 'react';
import {
    Box,
    Chip,
    IconButton,
    MenuItem,
    TextField,
    Checkbox,
    ListItemText,
    ListItemIcon,
    Paper,
    Tooltip,
    Typography,
    Icon,
} from '@mui/material';
import {
    TrashIcon,
    EyeSlashIcon
} from '@phosphor-icons/react';
import type { ActiveFilter, FilterDefinition, DateRangeValue } from './types';
import { getFilterDefinition } from './filterConfigService';
import { FilterSelect } from './FilterSelect';
import { FilterAutocompleteV2 } from './FilterAutocompleteV2';
import { MultiTextInput } from './MultiTextInput';
import { DateRangeInput } from './DateRangeInput';
import { MultiValueLogicSelector } from './MultiValueLogicSelector';
import { getOperatorIcon } from './operatorIcons';

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
    const containerRef = React.useRef<HTMLDivElement>(null);

    const filterDef = filter.filterId ? getFilterDefinition(filter.filterId) : null;
    const isEmptyFilter = !filter.filterId;
    const currentOperator = filterDef?.operators.find(op => op.id === filter.operator);

    // Handle mouse leave with check for active Select menu
    const handleMouseLeave = () => {
        // Check if any Select menu is open by looking for open MUI menu
        const hasOpenMenu = document.querySelector('.MuiMenu-root');
        if (!hasOpenMenu) {
            setIsHovered(false);
        }
    };

    // Reset hover when Select menus close
    React.useEffect(() => {
        const handleMenuClose = () => {
            if (containerRef.current && !containerRef.current.matches(':hover')) {
                setIsHovered(false);
            }
        };

        // Listen for menu close events
        document.addEventListener('click', handleMenuClose);
        return () => document.removeEventListener('click', handleMenuClose);
    }, []);

    // Handle filter type change
    const handleFilterTypeChange = (newValue: FilterDefinition | null) => {
        if (!newValue) return;

        const newFilterDef = newValue;
        const defaultOperator = newFilterDef.operators[0];
        let defaultValue: string | string[] | boolean | number | DateRangeValue = '';

        // Set appropriate default value based on value type
        switch (newFilterDef.valueType) {
            case 'multi-select':
            case 'multi-text':
                defaultValue = [];
                break;
            case 'boolean':
                defaultValue = false;
                break;
            case 'numeric':
                defaultValue = 0;
                break;
            case 'date-range':
                defaultValue = { from: null, to: null };
                break;
            default:
                defaultValue = '';
        }

        const updatedFilter: ActiveFilter = {
            ...filter,
            filterId: newFilterDef.id,
            operator: defaultOperator.id,
            value: defaultValue,
            valueLogicOperator: (newFilterDef.valueType === 'multi-select' || newFilterDef.valueType === 'multi-text')
                ? 'and'
                : undefined,
        };

        if (onFilterTypeChange) {
            const oldFilterId = filter.filterId || '';
            onFilterTypeChange(oldFilterId, newFilterDef.id);
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
            ref={containerRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
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
                {isLinked ? (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            px: 1,
                            py: 2,
                        }}
                    >
                        <Typography variant="body1" color={isEmptyFilter ? 'text.disabled' : 'text.primary'}>
                            {isEmptyFilter ? 'Select filter type' : filterDef?.name}
                        </Typography>
                    </Box>
                ) : (
                    <FilterAutocompleteV2
                        value={availableFilters.find(f => f.id === filter.filterId) || null}
                        onChange={(_, newValue) => handleFilterTypeChange(newValue as FilterDefinition | null)}
                        options={availableFilters}
                        getOptionLabel={(option) => option.name}
                        disabled={!filter.enabled || !isLinkedEnabled}
                        placeholder={isEmptyFilter ? 'Select filter type' : ''}
                        // autoFocus
                        autoHighlight
                    />
                )}

                {/* Divider */}
                <Box sx={{ height: '1px', bgcolor: 'divider' }} />

                {/* Value and Operator Row */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'stretch',
                        height: 44,
                    }}
                >
                    {/* Operator Section */}
                    <FilterSelect
                        value={filter.operator || (filterDef?.operators[0]?.id || '')}
                        onChange={handleOperatorChange}
                        disabled={!filter.enabled || !isLinkedEnabled || isEmptyFilter}
                        displayEmpty
                        sx={{
                            minWidth: 60,
                            maxWidth: 80,
                            flex: '0 0 auto'
                        }}
                        renderValue={() => (
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: isEmptyFilter ? 'action.disabled' : 'inherit'
                            }}>
                                <Icon fontSize='medium'>
                                    {isEmptyFilter
                                        ? getOperatorIcon('equals', true)
                                        : getOperatorIcon(currentOperator?.id || filterDef?.operators[0]?.id || 'equals')
                                    }
                                </Icon>
                            </Box>
                        )}
                    >
                        {filterDef?.operators.map((operator) => (
                            <MenuItem key={operator.id} value={operator.id}>
                                <ListItemIcon>
                                    {getOperatorIcon(operator.id, false)}
                                </ListItemIcon>
                                <ListItemText primary={operator.label} />
                            </MenuItem>
                        ))}
                    </FilterSelect>

                    {/* Vertical Divider */}
                    <Box sx={{ width: '1px', bgcolor: 'divider' }} />

                    {/* Value Section */}
                    {isEmptyFilter ? (
                        <Box
                            sx={{
                                flex: 2,
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
                    ) : filterDef?.valueType === 'multi-text' ? (
                        <MultiTextInput
                            values={Array.isArray(filter.value) ? filter.value : []}
                            logicOperator={filter.valueLogicOperator || 'and'}
                            placeholder={filterDef.placeholder || 'Enter value...'}
                            disabled={!filter.enabled || !isLinkedEnabled}
                            sx={{ flex: 1.6 }}
                            onChange={(values) => {
                                onChange({
                                    ...filter,
                                    value: values,
                                });
                            }}
                            onLogicOperatorChange={(operator) => {
                                onChange({
                                    ...filter,
                                    valueLogicOperator: operator,
                                });
                            }}
                        />
                    ) : filterDef?.valueType === 'numeric' ? (
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
                                type="number"
                                placeholder={filterDef.placeholder || 'Enter number...'}
                                value={typeof filter.value === 'number' ? filter.value : ''}
                                onChange={(e) => {
                                    const numValue = parseFloat(e.target.value);
                                    onChange({
                                        ...filter,
                                        value: isNaN(numValue) ? 0 : numValue,
                                    });
                                }}
                                disabled={!filter.enabled || !isLinkedEnabled}
                                autoComplete="off"
                                slotProps={{
                                    input: {
                                        disableUnderline: true,
                                        inputProps: {
                                            min: filterDef.min,
                                            max: filterDef.max,
                                            step: filterDef.step,
                                        },
                                    },
                                }}
                            />
                        </Box>
                    ) : filterDef?.valueType === 'boolean' ? (
                        <Box
                            sx={{
                                flex: 1.6,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                px: 2,
                                py: 1,
                            }}
                        >
                            <FilterSelect
                                value={typeof filter.value === 'boolean' ? (filter.value ? 'true' : 'false') : 'false'}
                                onChange={(e) => {
                                    onChange({
                                        ...filter,
                                        value: e.target.value === 'true',
                                    });
                                }}
                                disabled={!filter.enabled || !isLinkedEnabled}
                                sx={{ flex: 1 }}
                            >
                                <MenuItem value="true">True</MenuItem>
                                <MenuItem value="false">False</MenuItem>
                            </FilterSelect>
                        </Box>
                    ) : filterDef?.valueType === 'date-range' ? (
                        <DateRangeInput
                            value={
                                filter.value &&
                                    typeof filter.value === 'object' &&
                                    'from' in filter.value &&
                                    'to' in filter.value
                                    ? filter.value as DateRangeValue
                                    : { from: null, to: null }
                            }
                            placeholder={filterDef.placeholder}
                            minDate={filterDef.minDate}
                            maxDate={filterDef.maxDate}
                            onChange={(value) => {
                                onChange({
                                    ...filter,
                                    value,
                                });
                            }}
                        />
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
                                            {values.length >= 2 && (
                                                <>
                                                    <Chip
                                                        label={(filter.valueLogicOperator || 'AND').toUpperCase()}
                                                        size="small"
                                                        variant="outlined"
                                                        sx={{
                                                            height: 24,
                                                            fontSize: '0.75rem',
                                                        }}
                                                    />
                                                    <Chip
                                                        label={`+${values.length - 1}`}
                                                        size="small"
                                                        sx={{
                                                            height: 20,
                                                            fontSize: '0.75rem',
                                                        }}
                                                    />
                                                </>
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
                            // Add custom MenuProps to include AND/OR selector
                            MenuProps={{
                                PaperProps: {
                                    children: filterDef.valueType === 'multi-select' &&
                                        Array.isArray(filter.value) &&
                                        filter.value.length >= 2 ? (
                                        <>
                                            <Box sx={{
                                                borderBottom: '1px solid',
                                                borderColor: 'divider',
                                                py: 1,
                                            }}>
                                                <MultiValueLogicSelector
                                                    value={filter.valueLogicOperator || 'and'}
                                                    onChange={(operator: import('./types').ValueLogicOperator) => {
                                                        onChange({
                                                            ...filter,
                                                            valueLogicOperator: operator,
                                                        });
                                                    }}
                                                />
                                            </Box>
                                        </>
                                    ) : null,
                                },
                            }}
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
