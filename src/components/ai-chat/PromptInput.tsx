import React, { useState, useRef } from 'react';
import {
    Box,
    InputBase,
    IconButton,
    Paper,
    Typography,
    Chip,
    useTheme,
} from '@mui/material';
import {
    PaperPlaneTiltIcon,
    SparkleIcon,
    PencilCircleIcon,
    CheckCircleIcon,
    FileTextIcon,
    PaperclipIcon,
} from '@phosphor-icons/react';

interface PromptInputProps {
    value: string;
    onChange: (value: string) => void;
    onSend: () => void;
    disabled?: boolean;
    placeholder?: string;
    mode?: 'landing' | 'chat';
    error?: boolean;
    helperText?: string;
}

interface SuggestionChip {
    label: string;
    icon: React.ReactElement;
}

// Suggestion chips configuration
const SUGGESTION_CHIPS: SuggestionChip[] = [
    {
        label: 'Improving writing',
        icon: <PencilCircleIcon size={20} />
    },
    {
        label: 'Auto-correction',
        icon: <CheckCircleIcon size={20} />
    },
    {
        label: 'Text summarisation',
        icon: <FileTextIcon size={20} />
    }
];

export const PromptInput: React.FC<PromptInputProps> = ({
    value,
    onChange,
    onSend,
    disabled = false,
    placeholder = "Ask me anything...",
    mode = 'landing',
    error = false,
    helperText,
}) => {
    const theme = useTheme();
    const [isFocused, setIsFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const textFieldRef = useRef<HTMLDivElement>(null);

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && !event.shiftKey && !disabled) {
            event.preventDefault();
            onSend();
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChange(event.target.value);
    };

    const handleSuggestionClick = (suggestion: string) => {
        onChange(suggestion);
        // Focus the input after clicking a suggestion
        setTimeout(() => {
            if (textFieldRef.current) {
                const input = textFieldRef.current.querySelector('textarea, input');
                if (input) {
                    (input as HTMLElement).focus();
                }
            }
        }, 0);
    };

    const getBorderColor = () => {
        if (error) return theme.palette.error.main;
        if (isFocused) return theme.palette.primary.main;
        if (isHovered) return theme.palette.primary.light;
        return theme.palette.divider;
    };

    const getBackgroundColor = () => {
        if (mode === 'chat') return theme.palette.background.default;
        return theme.palette.background.paper;
    };

    const getSendButtonColor = () => {
        if (!value.trim() || disabled) return theme.palette.action.disabled;
        return theme.palette.primary.main;
    };

    const getSendButtonTextColor = () => {
        if (!value.trim() || disabled) return theme.palette.action.disabled;
        return theme.palette.primary.contrastText;
    };

    return (
        <Box>
            {/* Main Input Container */}
            <Paper
                elevation={0}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                sx={{
                    backgroundColor: getBackgroundColor(),
                    borderRadius: 8, // 24px based on cornerRadius-4
                    border: `1px solid ${getBorderColor()}`,
                    transition: 'all 0.3s ease-in-out',
                    overflow: 'hidden',
                    boxShadow: `
                        0px 8px 12px 1px rgba(166, 126, 48, 0.1),
                        0px 4px 16px -2px rgba(100, 75, 27, 0.08)
                    `,
                    '&:hover': {
                        borderColor: !isFocused ? theme.palette.primary.light : theme.palette.primary.main,
                    },
                }}
            >
                <Box sx={{ p: 2 }}>
                    {/* Text Input Area */}
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        gap: 1,
                        mb: mode === 'landing' ? 2 : 0
                    }}>
                        {/* Voice/Mic Button (Chat mode only) */}
                        {mode === 'chat' && (
                            <IconButton
                                size="small"
                                disabled
                                sx={{
                                    backgroundColor: theme.palette.action.disabledBackground,
                                    width: 32,
                                    height: 32,
                                    '&.Mui-disabled': {
                                        backgroundColor: theme.palette.action.disabledBackground,
                                    }
                                }}
                            >
                                <SparkleIcon size={20} color={theme.palette.action.disabled} />
                            </IconButton>
                        )}

                        {/* Text Field */}
                        <InputBase
                            ref={textFieldRef}
                            fullWidth
                            multiline
                            maxRows={6}
                            minRows={mode === 'chat' ? 1 : 1}
                            placeholder={placeholder}
                            value={value}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyPress}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            disabled={disabled}
                            sx={{
                                fontSize: '0.875rem', // 14px
                                lineHeight: 1.7,
                                fontFamily: theme.typography.fontFamily,
                                '& textarea': {
                                    resize: 'none',

                                },
                            }}
                        />

                        {/* Attachment Button (visible in some modes) */}
                        {mode === 'chat' && (
                            <IconButton
                                size="small"
                                sx={{
                                    width: 32,
                                    height: 32,
                                    color: theme.palette.text.secondary,
                                    '&:hover': {
                                        backgroundColor: theme.palette.action.hover,
                                    }
                                }}
                            >
                                <PaperclipIcon size={20} />
                            </IconButton>
                        )}
                    </Box>

                    {/* Footer - Send button and suggestions (Landing mode) */}
                    {mode === 'landing' && (
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 2
                        }}>
                            {/* Suggestion Chips */}
                            <Box sx={{
                                display: 'flex',
                                gap: 2,
                                flex: 1,
                                justifyContent: 'flex-start',
                                flexWrap: 'wrap'
                            }}>
                                {SUGGESTION_CHIPS.map((suggestion, index) => (
                                    <Chip
                                        key={index}
                                        label={suggestion.label}
                                        icon={suggestion.icon}
                                        variant="outlined"
                                        size="small"
                                        clickable
                                        onClick={() => handleSuggestionClick(suggestion.label)}
                                        sx={{
                                            fontSize: '0.8125rem', // 13px
                                            fontFamily: theme.typography.fontFamily,
                                            backgroundColor: theme.palette.background.default,
                                            borderColor: theme.palette.divider,
                                            color: theme.palette.text.primary,
                                            '& .MuiChip-icon': {
                                                color: theme.palette.text.secondary,
                                                fontSize: '0.875rem',
                                            },
                                            '&:hover': {
                                                backgroundColor: theme.palette.action.hover,
                                                borderColor: theme.palette.primary.light,
                                                transform: 'translateY(-1px)',
                                            },
                                            transition: 'all 0.2s ease-in-out',
                                        }}
                                    />
                                ))}
                            </Box>

                            {/* Send Button */}
                            <IconButton
                                onClick={onSend}
                                disabled={!value.trim() || disabled}
                                size="small"
                                sx={{
                                    backgroundColor: getSendButtonColor(),
                                    color: getSendButtonTextColor(),
                                    width: 32,
                                    height: 32,
                                    transition: 'all 0.2s ease-in-out',
                                    '&:hover': {
                                        backgroundColor: value.trim() && !disabled ?
                                            theme.palette.primary.dark :
                                            theme.palette.action.disabled,
                                        transform: value.trim() && !disabled ? 'scale(1.05)' : 'none',
                                    },
                                    '&.Mui-disabled': {
                                        backgroundColor: theme.palette.action.disabled,
                                        color: theme.palette.action.disabled,
                                    },
                                }}
                            >
                                <PaperPlaneTiltIcon size={20} weight="fill" />
                            </IconButton>
                        </Box>
                    )}

                    {/* Chat mode send button */}
                    {mode === 'chat' && (
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                            <IconButton
                                onClick={onSend}
                                disabled={!value.trim() || disabled}
                                size="small"
                                sx={{
                                    backgroundColor: getSendButtonColor(),
                                    color: getSendButtonTextColor(),
                                    width: 32,
                                    height: 32,
                                    transition: 'all 0.2s ease-in-out',
                                    '&:hover': {
                                        backgroundColor: value.trim() && !disabled ?
                                            theme.palette.primary.dark :
                                            theme.palette.action.disabled,
                                        transform: value.trim() && !disabled ? 'scale(1.05)' : 'none',
                                    },
                                    '&.Mui-disabled': {
                                        backgroundColor: theme.palette.action.disabled,
                                        color: theme.palette.action.disabled,
                                    },
                                }}
                            >
                                <PaperPlaneTiltIcon size={20} weight="fill" />
                            </IconButton>
                        </Box>
                    )}
                </Box>
            </Paper>

            {/* Helper Text */}
            {helperText && (
                <Typography
                    variant="caption"
                    color={error ? "error" : "text.secondary"}
                    sx={{
                        display: 'block',
                        mt: 0.5,
                        textAlign: 'right', // RTL
                        px: 1
                    }}
                >
                    {helperText}
                </Typography>
            )}
        </Box>
    );
};