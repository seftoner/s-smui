import React, { useState } from 'react';
import {
    Box,
    Chip,
    IconButton,
    Menu,
    MenuItem,
    TextField,
    Checkbox,
    ListItemText,
    Paper,
    Tooltip,
    Typography,
    Icon,
} from '@mui/material';
import { TrashIcon, EyeSlashIcon, CaretDownIcon } from '@phosphor-icons/react';
import type { ActiveFilter, FilterDefinition, OperatorConfig } from './types';
import { getFilterDefinition } from './filterConfigService';

interface FilterInputProps {
    filter: ActiveFilter;
    availableFilters: FilterDefinition[];
    onChange: (filter: ActiveFilter) => void;
    onDelete: () => void;
    onToggleEnabled: () => void;
}

export const FilterInput: React.FC<FilterInputProps> = ({
    filter,
    availableFilters,
    onChange,
    onDelete,
    onToggleEnabled,
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isToggleVisible, setIsToggleVisible] = useState(false);
    const [filterNameAnchor, setFilterNameAnchor] = useState<null | HTMLElement>(null);
    const [operatorAnchor, setOperatorAnchor] = useState<null | HTMLElement>(null);
    const [valueAnchor, setValueAnchor] = useState<null | HTMLElement>(null);

    const filterDef = getFilterDefinition(filter.filterId);

    if (!filterDef) {
        return null;
    }

    const currentOperator = filterDef.operators.find(op => op.id === filter.operator);

    // Handle filter name change
    const handleFilterNameClick = (event: React.MouseEvent<HTMLElement>) => {
        setFilterNameAnchor(event.currentTarget);
        setIsHovered(false);
    };

    const handleFilterNameClose = () => {
        setFilterNameAnchor(null);
        setIsHovered(false); // Reset hover state when menu closes
    };

    const handleFilterNameSelect = (newFilterId: string) => {
        const newFilterDef = getFilterDefinition(newFilterId);
        if (!newFilterDef) return;

        const defaultOperator = newFilterDef.operators[0];
        let defaultValue: string | string[] = '';

        if (newFilterDef.valueType === 'multi-select') {
            defaultValue = [];
        }

        setIsHovered(false);

        onChange({
            ...filter,
            filterId: newFilterId,
            operator: defaultOperator.id,
            value: defaultValue,
        });
        handleFilterNameClose();
    };

    // Handle operator change
    const handleOperatorClick = (event: React.MouseEvent<HTMLElement>) => {
        setOperatorAnchor(event.currentTarget);
        setIsHovered(false);
    };

    const handleOperatorClose = () => {
        setOperatorAnchor(null);
        setIsHovered(false); // Reset hover state when menu closes
    };

    const handleOperatorSelect = (operator: OperatorConfig) => {
        onChange({
            ...filter,
            operator: operator.id,
        });
        handleOperatorClose();
    };

    // Handle value change
    const handleValueClick = (event: React.MouseEvent<HTMLElement>) => {
        // Only show menu for select types, not for text
        if (filterDef.valueType !== 'text') {
            setValueAnchor(event.currentTarget);
        }
    };

    const handleValueClose = () => {
        setValueAnchor(null);
        setIsHovered(false); // Reset hover state when menu closes
    };

    const handleTextValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange({
            ...filter,
            value: event.target.value,
        });
    };

    const handleSingleSelectChange = (optionId: string) => {
        onChange({
            ...filter,
            value: optionId,
        });
        handleValueClose();
    };

    const handleMultiSelectChange = (optionId: string) => {
        const currentValues = Array.isArray(filter.value) ? filter.value : [];
        const newValues = currentValues.includes(optionId)
            ? currentValues.filter(id => id !== optionId)
            : [...currentValues, optionId];

        onChange({
            ...filter,
            value: newValues,
        });
    };

    // Handle toggle button visibility
    const handleToggleClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsToggleVisible(!isToggleVisible);
        onToggleEnabled();
    };

    // Get display value
    const getDisplayValue = (): string => {
        if (filterDef.valueType === 'text') {
            return filter.value as string || 'Enter value...';
        }

        if (filterDef.valueType === 'single-select') {
            const option = filterDef.options?.find(opt => opt.id === filter.value);
            return option?.label || 'Select...';
        }

        if (filterDef.valueType === 'multi-select') {
            const values = Array.isArray(filter.value) ? filter.value : [];
            if (values.length === 0) return 'Select...';
            if (values.length === 1) {
                const option = filterDef.options?.find(opt => opt.id === values[0]);
                return option?.label || 'Select...';
            }
            return `${values.length} selected`;
        }

        return '';
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
                    flex: 1, // Take up available width
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    opacity: filter.enabled ? 1 : 0.5,
                    transition: 'all 0.2s',
                    overflow: 'hidden',
                    boxShadow: '0px 1px 2px 0px rgba(65, 50, 42, 0.08)',
                    '&:hover': {
                        borderColor: 'primary.light',
                    },
                }}
            >
                {/* Filter Name Row */}
                <Box
                    onClick={filter.enabled ? handleFilterNameClick : undefined}
                    sx={{
                        minHeight: 44,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        px: 2,
                        py: 1,
                        cursor: filter.enabled ? 'pointer' : 'default',
                        '&:hover': filter.enabled ? {
                            bgcolor: 'action.hover',
                        } : {},
                    }}
                >
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Typography variant="body1">
                            {filterDef.name}
                        </Typography>
                    </Box>
                    <Icon
                        fontSize='small'
                        sx={{
                            color: 'action.active',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <CaretDownIcon />
                    </Icon>
                </Box>

                {/* Divider */}
                <Box sx={{ height: '1px', bgcolor: 'divider' }} />

                {/* Value and Operator Row */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'stretch',
                        minHeight: 44,
                    }}
                >

                    {/* Operator Section */}
                    <Box
                        onClick={filter.enabled ? handleOperatorClick : undefined}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flex: 1,
                            px: 2,
                            py: 1,
                            cursor: filter.enabled ? 'pointer' : 'default',
                            '&:hover': filter.enabled ? {
                                bgcolor: 'action.hover',
                            } : {},
                        }}
                    >
                        <Chip
                            label={currentOperator?.label || ''}
                            size="small"
                            color={currentOperator?.color || 'default'}
                            sx={{
                                fontWeight: 400,
                                height: 24,
                                '& .MuiChip-label': {
                                    fontSize: '13px',
                                    lineHeight: '18px',
                                    px: 1,
                                },
                            }}
                        />
                        <Icon
                            fontSize='small'
                            sx={{
                                color: 'action.active',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <CaretDownIcon />
                        </Icon>
                    </Box>

                    {/* Vertical Divider */}
                    <Box sx={{ width: '1px', height: 44, bgcolor: 'divider' }} />


                    {/* Value Section */}
                    {filterDef.valueType === 'text' ? (
                        // Text input directly in the value section
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
                                disabled={!filter.enabled}
                                autoComplete="off"
                                slotProps={{
                                    input: {
                                        disableUnderline: true,
                                    },
                                }}
                            />
                        </Box>
                    ) : (
                        // Clickable area for select types
                        <Box
                            onClick={filter.enabled ? handleValueClick : undefined}
                            sx={{
                                flex: 1.6,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                px: 2,
                                py: 1,
                                cursor: filter.enabled ? 'pointer' : 'default',
                                '&:hover': filter.enabled ? {
                                    bgcolor: 'action.hover',
                                } : {},
                            }}
                        >
                            <Typography variant="body1" sx={{ fontWeight: 400 }}>
                                {getDisplayValue()}
                            </Typography>
                            <Icon
                                fontSize='small'
                                sx={{
                                    color: 'action.active',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <CaretDownIcon />
                            </Icon>
                        </Box>
                    )}
                </Box>
            </Paper>

            {/* Reserved Action Space - Always present to prevent layout shift */}
            <Box
                sx={{
                    display: 'flex',
                    gap: 1,
                    flexDirection: 'column',
                    alignItems: 'center',
                    // width: 80, // Fixed width to reserve space
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

            {/* Filter Name Menu */}
            <Menu
                anchorEl={filterNameAnchor}
                open={Boolean(filterNameAnchor)}
                onClose={handleFilterNameClose}
            >
                {availableFilters.map((filterOption) => (
                    <MenuItem
                        key={filterOption.id}
                        onClick={() => handleFilterNameSelect(filterOption.id)}
                        selected={filterOption.id === filter.filterId}
                    >
                        {filterOption.name}
                    </MenuItem>
                ))}
            </Menu>

            {/* Operator Menu */}
            <Menu
                anchorEl={operatorAnchor}
                open={Boolean(operatorAnchor)}
                onClose={handleOperatorClose}
            >
                {filterDef.operators.map((operator) => (
                    <MenuItem
                        key={operator.id}
                        onClick={() => handleOperatorSelect(operator)}
                        selected={operator.id === filter.operator}
                    >
                        <Chip
                            label={operator.label}
                            size="small"
                            color={operator.color}
                            sx={{ fontWeight: 500 }}
                        />
                    </MenuItem>
                ))}
            </Menu>

            {/* Value Menu/Input */}
            {filterDef.valueType === 'text' && (
                <Menu
                    anchorEl={valueAnchor}
                    open={Boolean(valueAnchor)}
                    onClose={handleValueClose}
                >
                    <Box sx={{ p: 2, minWidth: 250 }}>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder={filterDef.placeholder}
                            value={filter.value as string}
                            onChange={handleTextValueChange}
                            autoFocus
                            autoComplete="off"
                            slotProps={{
                                input: {
                                    autoComplete: 'off',
                                },
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleValueClose();
                                }
                            }}
                        />
                    </Box>
                </Menu>
            )}

            {filterDef.valueType === 'single-select' && (
                <Menu
                    anchorEl={valueAnchor}
                    open={Boolean(valueAnchor)}
                    onClose={handleValueClose}
                >
                    {filterDef.options?.map((option) => (
                        <MenuItem
                            key={option.id}
                            onClick={() => handleSingleSelectChange(option.id)}
                            selected={option.id === filter.value}
                        >
                            {option.label}
                        </MenuItem>
                    ))}
                </Menu>
            )}

            {filterDef.valueType === 'multi-select' && (
                <Menu
                    anchorEl={valueAnchor}
                    open={Boolean(valueAnchor)}
                    onClose={handleValueClose}
                >
                    {filterDef.options?.map((option) => {
                        const values = Array.isArray(filter.value) ? filter.value : [];
                        const isChecked = values.includes(option.id);

                        return (
                            <MenuItem
                                key={option.id}
                                onClick={() => handleMultiSelectChange(option.id)}
                            >
                                <Checkbox checked={isChecked} />
                                <ListItemText primary={option.label} />
                            </MenuItem>
                        );
                    })}
                </Menu>
            )}
        </Box>
    );
};
