import React, { useState, useRef } from 'react';
import {
    Box,
    TextField,
    Chip,
    IconButton,
    Popper,
    Paper,
    Typography,
    InputAdornment,
    styled,
} from '@mui/material';
import { PlusIcon, XIcon } from '@phosphor-icons/react';
import { MultiValueLogicSelector } from './MultiValueLogicSelector';
import type { ValueLogicOperator } from './types';


const MenuPaper = styled(Paper)(({ theme }) => ({
    marginTop: theme.spacing(0.5),
    borderRadius: 12,
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows[4],
    minWidth: 300,
    maxHeight: 400,
    overflow: 'auto',
}));

const ValueItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(1, 2),
    gap: theme.spacing(1),
    borderBottom: `1px solid ${theme.palette.divider}`,
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
}));

const CollapsedDisplay = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    padding: theme.spacing(0, 2),
    minHeight: 44,
    cursor: 'text',
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
}));

const StyledChip = styled(Chip)(({ theme }) => ({
    height: 24,
    '& .MuiChip-label': {
        padding: theme.spacing(0, 1),
    },
}));

interface MultiTextInputProps {
    values: string[];
    logicOperator: ValueLogicOperator;
    placeholder?: string;
    disabled?: boolean;
    onChange: (values: string[]) => void;
    onLogicOperatorChange: (operator: ValueLogicOperator) => void;
}

/**
 * MultiTextInput - Text input that allows adding multiple text values
 * Features:
 * - Enter text and press Enter or click + button to add
 * - Shows all values in dropdown menu when focused
 * - AND/OR selector appears when 2+ values exist
 * - Collapsed view shows first value + operator chip + count chip
 */
export const MultiTextInput: React.FC<MultiTextInputProps> = ({
    values,
    logicOperator,
    placeholder = 'Enter value...',
    disabled = false,
    onChange,
    onLogicOperatorChange,
}) => {
    const [inputValue, setInputValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editingValue, setEditingValue] = useState('');
    const inputRef = useRef<HTMLDivElement>(null);
    const anchorRef = useRef<HTMLDivElement>(null);

    const handleAddValue = () => {
        if (inputValue.trim()) {
            onChange([...values, inputValue.trim()]);
            setInputValue('');
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleAddValue();
        }
    };

    const handleDeleteValue = (index: number) => {
        onChange(values.filter((_, i) => i !== index));
    };

    const handleEditValue = (index: number) => {
        setEditingIndex(index);
        setEditingValue(values[index]);
    };

    const handleSaveEdit = (index: number) => {
        if (editingValue.trim()) {
            const newValues = [...values];
            newValues[index] = editingValue.trim();
            onChange(newValues);
        }
        setEditingIndex(null);
        setEditingValue('');
    };

    const handleEditKeyDown = (event: React.KeyboardEvent, index: number) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSaveEdit(index);
        } else if (event.key === 'Escape') {
            setEditingIndex(null);
            setEditingValue('');
        }
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = (event: React.FocusEvent) => {
        // Check if focus is moving to an element within the popper
        if (
            anchorRef.current?.contains(event.relatedTarget as Node) ||
            (event.relatedTarget as HTMLElement)?.closest('[role="presentation"]')
        ) {
            return;
        }
        setIsFocused(false);
        setEditingIndex(null);
        setInputValue('');
    };

    const handleCollapsedClick = () => {
        inputRef.current?.querySelector('input')?.focus();
    };

    // Collapsed view when not focused and has values
    if (!isFocused && values.length > 0) {
        return (
            <CollapsedDisplay ref={anchorRef} onClick={handleCollapsedClick}>
                <Typography variant="body2" sx={{ flex: 1 }}>
                    {values[0]}
                </Typography>
                {values.length > 1 && (
                    <>
                        <StyledChip
                            label={logicOperator.toUpperCase()}
                            size="small"
                            color="default"
                            variant="outlined"
                        />
                        <StyledChip
                            label={`+${values.length - 1}`}
                            size="small"
                            color="default"
                        />
                    </>
                )}
            </CollapsedDisplay>
        );
    }

    return (
        <Box ref={anchorRef} sx={{ flex: 1 }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    px: 2,
                    minHeight: 44,
                    '&:hover': !disabled ? {
                        bgcolor: 'action.hover',
                    } : {},
                }}
            >
                <TextField
                    ref={inputRef}
                    fullWidth
                    size="small"
                    variant="standard"
                    placeholder={values.length === 0 ? placeholder : 'Add another value...'}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    disabled={disabled}
                    autoComplete="off"
                    slotProps={{
                        input: {
                            disableUnderline: true,
                            endAdornment: inputValue.trim() && (
                                <InputAdornment position="end">
                                    <IconButton
                                        size="small"
                                        onClick={handleAddValue}
                                        edge="end"
                                    >
                                        <PlusIcon size={20} />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                />
            </Box>

            <Popper
                open={isFocused}
                anchorEl={anchorRef.current}
                placement="bottom-start"
                style={{ width: anchorRef.current?.offsetWidth }}
            >
                <MenuPaper>
                    {values.length === 0 ? (
                        <Typography variant="body2" color='text.secondary'>Type text and press enter to add value</Typography>
                    ) : (
                        <>
                            {/* AND/OR selector - show only when 2+ values */}
                            {values.length >= 2 && (
                                <MultiValueLogicSelector
                                    value={logicOperator}
                                    onChange={onLogicOperatorChange}
                                    disabled={disabled}
                                />
                            )}

                            {/* Values list */}
                            {values.map((value, index) => (
                                <ValueItem key={index}>
                                    {editingIndex === index ? (
                                        <TextField
                                            fullWidth
                                            size="small"
                                            variant="standard"
                                            value={editingValue}
                                            onChange={(e) => setEditingValue(e.target.value)}
                                            onKeyDown={(e) => handleEditKeyDown(e, index)}
                                            onBlur={() => handleSaveEdit(index)}
                                            autoFocus
                                            slotProps={{
                                                input: {
                                                    disableUnderline: true,
                                                },
                                            }}
                                        />
                                    ) : (
                                        <>
                                            <Typography
                                                variant="body2"
                                                sx={{ flex: 1, cursor: 'pointer' }}
                                                onClick={() => handleEditValue(index)}
                                            >
                                                {value}
                                            </Typography>
                                            <IconButton
                                                size="small"
                                                onClick={() => handleDeleteValue(index)}
                                                sx={{ color: 'error.main' }}
                                            >
                                                <XIcon size={16} />
                                            </IconButton>
                                        </>
                                    )}
                                </ValueItem>
                            ))}
                        </>
                    )}
                </MenuPaper>
            </Popper>
        </Box>
    );
};
