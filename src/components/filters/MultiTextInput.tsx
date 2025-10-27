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
import type { SxProps, Theme } from '@mui/material';
import { PlusIcon, XIcon } from '@phosphor-icons/react';
import { MultiValueLogicSelector } from './MultiValueLogicSelector';
import type { ValueLogicOperator } from './types';


const MenuPaper = styled(Paper)(({ theme }) => ({
    borderRadius: 8,
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows[4],
    minWidth: 300,
    maxHeight: 400,
    overflow: 'auto',
    padding: theme.spacing(2, 4, 2, 2),
}));

const ValueItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(1, 0),
    gap: theme.spacing(1),
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
    sx?: SxProps<Theme>;
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
    sx,
    onChange,
    onLogicOperatorChange,
}) => {
    const [inputValue, setInputValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLDivElement>(null);
    const anchorRef = useRef<HTMLDivElement>(null);
    const popperRef = useRef<HTMLDivElement>(null);

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
        } else if (event.key === 'Escape') {
            event.preventDefault();
            setIsFocused(false);
            setInputValue('');
        }
    };

    const handleDeleteValue = (index: number) => {
        onChange(values.filter((_, i) => i !== index));
    };

    const handleUpdateValue = (index: number, newValue: string) => {
        const newValues = [...values];
        newValues[index] = newValue;
        onChange(newValues);
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = (event: React.FocusEvent) => {
        // Only close if focus is moving completely outside the component
        const relatedTarget = event.relatedTarget as HTMLElement;

        // Check if focus is staying within our component or popper
        if (
            anchorRef.current?.contains(relatedTarget) ||
            popperRef.current?.contains(relatedTarget)
        ) {
            return;
        }

        setIsFocused(false);
        setInputValue('');
    };

    // Handle clicks outside the component to close the popup
    React.useEffect(() => {
        if (!isFocused) return;

        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;

            // Close if clicking outside both the anchor and popper
            if (
                anchorRef.current &&
                !anchorRef.current.contains(target) &&
                popperRef.current &&
                !popperRef.current.contains(target)
            ) {
                setIsFocused(false);
                setInputValue('');
            }
        };

        // Add a small delay to avoid immediate closure
        const timeoutId = setTimeout(() => {
            document.addEventListener('mousedown', handleClickOutside);
        }, 0);

        return () => {
            clearTimeout(timeoutId);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isFocused]);

    const handleCollapsedClick = () => {
        setIsFocused(true);
        // Use setTimeout to ensure the input is rendered before focusing
        setTimeout(() => {
            inputRef.current?.querySelector('input')?.focus();
        }, 0);
    };

    // Collapsed view when not focused and has values
    if (!isFocused && values.length > 0) {
        return (
            <Box sx={sx} ref={anchorRef}>
                <CollapsedDisplay onClick={handleCollapsedClick}>
                    <Typography
                        variant="body2"
                        sx={{
                            flex: 1,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {values[0]}
                    </Typography>
                    {values.length > 1 && (
                        <>
                            <Typography
                                variant='caption'
                                color="text.secondary"
                                sx={{ flexShrink: 0 }}
                            >
                                {logicOperator.toUpperCase()}
                            </Typography>
                            <StyledChip
                                label={`+${values.length - 1}`}
                                size="small"
                                color="default"
                            />
                        </>
                    )}
                </CollapsedDisplay>
            </Box>
        );
    }

    return (
        <Box ref={anchorRef} sx={sx}>
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
                <MenuPaper ref={popperRef}>
                    {values.length === 0 ? (
                        <Typography variant="body2" color='text.secondary'>Type text and press enter to add value</Typography>
                    ) : (
                        <>
                            {/* AND/OR selector - show only when 2+ values */}
                            {values.length >= 2 && (
                                <Box sx={{ pb: 3 }}>
                                    <MultiValueLogicSelector
                                        value={logicOperator}
                                        onChange={onLogicOperatorChange}
                                    />
                                </Box>
                            )}

                            {/* Values list */}
                            {values.map((value, index) => (
                                <ValueItem key={index}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        value={value}
                                        onChange={(e) => handleUpdateValue(index, e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                // Find the next TextField input
                                                const allInputs = popperRef.current?.querySelectorAll('input');
                                                if (allInputs) {
                                                    const currentInput = e.target as HTMLInputElement;
                                                    const currentIndex = Array.from(allInputs).indexOf(currentInput);
                                                    const nextInput = allInputs[currentIndex + 1];
                                                    if (nextInput) {
                                                        nextInput.focus();
                                                    }
                                                }
                                            }
                                        }}
                                        disabled={disabled}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                fontSize: '0.875rem',
                                            },
                                        }}
                                    />
                                    <IconButton
                                        size="small"
                                        onClick={() => handleDeleteValue(index)}
                                        sx={{
                                            color: 'error.main',
                                            '&:hover': {
                                                backgroundColor: 'error.lighter',
                                            },
                                        }}
                                    >
                                        <XIcon size={16} />
                                    </IconButton>
                                </ValueItem>
                            ))}
                        </>
                    )}
                </MenuPaper>
            </Popper>
        </Box>
    );
};
