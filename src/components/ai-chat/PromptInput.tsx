import type { } from '@mui/material/themeCssVarsAugmentation';
import React, { useRef } from 'react';
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
    SparkleIcon,
    PencilCircleIcon,
    CheckCircleIcon,
    FileTextIcon,
    PaperclipIcon,
    ArrowUpIcon,
} from '@phosphor-icons/react';
import { useMachine } from '@xstate/react';
import { promptInputMachine } from './promptInputMachine';
import type { PromptInputProps, SuggestionChip } from './types';

// Suggestion chips configuration
const SUGGESTION_CHIPS: SuggestionChip[] = [
    {
        id: 'improving-writing',
        label: 'Improving writing',
        icon: <PencilCircleIcon size={20} />,
        systemPrompt: 'You are a writing assistant focused on improving text quality, grammar, and style.'
    },
    {
        id: 'auto-correction',
        label: 'Auto-correction',
        icon: <CheckCircleIcon size={20} />,
        systemPrompt: 'You are a proofreading assistant that corrects spelling, grammar, and punctuation errors.'
    },
    {
        id: 'text-summarisation',
        label: 'Text summarisation',
        icon: <FileTextIcon size={20} />,
        systemPrompt: 'You are a summarization assistant that creates concise summaries of provided text.'
    }
];

export const PromptInput: React.FC<PromptInputProps> = ({
    value: externalValue,
    onChange,
    onSend,
    onChipChange,
    disabled = false,
    placeholder = "Ask me anything...",
    mode: externalMode = 'landing',
    error: externalError = false,
    helperText: externalHelperText,
}) => {
    const theme = useTheme();
    const textFieldRef = useRef<HTMLDivElement>(null);

    // Initialize the state machine
    const [state, send] = useMachine(promptInputMachine);

    // Sync external value changes with the machine
    React.useEffect(() => {
        if (externalValue !== undefined && externalValue !== state.context.value) {
            send({ type: 'SET_VALUE', value: externalValue });
        }
    }, [externalValue, state.context.value, send]);

    // Sync external mode changes with the machine
    React.useEffect(() => {
        if (externalMode !== state.context.mode) {
            send({ type: 'SET_MODE', mode: externalMode });
        }
    }, [externalMode, state.context.mode, send]);

    // Sync external error state with the machine
    React.useEffect(() => {
        if (externalError !== state.context.error || externalHelperText !== state.context.helperText) {
            send({
                type: 'SET_ERROR',
                error: externalError,
                helperText: externalHelperText || ''
            });
        }
    }, [externalError, externalHelperText, state.context.error, state.context.helperText, send]);

    // Notify parent when active chip changes
    React.useEffect(() => {
        if (onChipChange) {
            onChipChange(state.context.activeChipId);
        }
    }, [state.context.activeChipId, onChipChange]);

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && !event.shiftKey && !disabled) {
            event.preventDefault();
            handleSend();
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newValue = event.target.value;
        send({ type: 'SET_VALUE', value: newValue });
        onChange(newValue);
    };

    const handleSend = () => {
        if (!state.context.value.trim() || disabled) return;

        send({ type: 'SEND' });
        onSend();

        // Simulate async operation - in real app this would be handled by the parent
        setTimeout(() => {
            send({ type: 'SEND_SUCCESS' });
        }, 100);
    };

    const handleSuggestionClick = (chipId: string) => {
        send({ type: 'SELECT_CHIP', chipId });
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
        if (state.context.error) return theme.vars.palette.error.main;
        if (state.matches('focused') || state.matches('focusedAndHovered')) return theme.vars.palette.primary.main;
        if (state.matches('hovered') || state.matches('focusedAndHovered')) return theme.vars.palette.primary.light;
        return theme.vars.palette.divider;
    };

    const getBackgroundColor = () => {
        if (state.context.mode === 'chat') return theme.vars.palette.background.default;
        return theme.vars.palette.background.paper;
    };

    const isFocused = state.matches('focused') || state.matches('focusedAndHovered');

    // Reusable send button component to avoid duplication
    const SendButton: React.FC<{ onClick: () => void; disabled: boolean; color?: 'primary' | 'default' }> = ({ onClick, disabled, color = 'primary' }) => {

        return (
            <IconButton
                onClick={onClick}
                color={color as any}
                disabled={disabled}
                size="small"
                sx={{
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                        transform: !disabled ? 'scale(1.05)' : 'none',
                    },
                }}
            >
                <ArrowUpIcon />
            </IconButton>
        );
    };

    return (
        <Box>
            {/* Main Input Container */}
            <Paper
                elevation={0}
                onMouseEnter={() => send({ type: 'HOVER' })}
                onMouseLeave={() => send({ type: 'UNHOVER' })}
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
                        borderColor: !isFocused ? theme.vars.palette.primary.light : theme.vars.palette.primary.main,
                    },
                }}
            >
                <Box sx={{ p: 2 }}>
                    {/* Text Input Area */}
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        gap: 1,
                        mb: state.context.mode === 'landing' ? 2 : 0
                    }}>
                        {/* Voice/Mic Button (Chat mode only) */}
                        {state.context.mode === 'chat' && (
                            <IconButton
                                size="small"
                                disabled
                                sx={{
                                    backgroundColor: theme.vars.palette.action.disabledBackground,
                                    width: 32,
                                    height: 32,
                                    '&.Mui-disabled': {
                                        backgroundColor: theme.vars.palette.action.disabledBackground,
                                    }
                                }}
                            >
                                <SparkleIcon size={20} color={theme.vars.palette.action.disabled} />
                            </IconButton>
                        )}

                        {/* Text Field */}
                        <InputBase
                            ref={textFieldRef}
                            fullWidth
                            multiline
                            maxRows={6}
                            minRows={state.context.mode === 'chat' ? 1 : 1}
                            placeholder={placeholder}
                            value={state.context.value}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyPress}
                            onFocus={() => send({ type: 'FOCUS' })}
                            onBlur={() => send({ type: 'BLUR' })}
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
                        {state.context.mode === 'chat' && (
                            <IconButton
                                size="small"
                                sx={{
                                    width: 32,
                                    height: 32,
                                    color: theme.vars.palette.text.secondary,
                                    '&:hover': {
                                        backgroundColor: theme.vars.palette.action.hover,
                                    }
                                }}
                            >
                                <PaperclipIcon size={20} />
                            </IconButton>
                        )}
                    </Box>

                    {/* Footer - Send button and suggestions (Landing mode) */}
                    {state.context.mode === 'landing' && (
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
                                {SUGGESTION_CHIPS.map((suggestion) => {
                                    const isActive = state.context.activeChipId === suggestion.id;
                                    return (
                                        <Chip
                                            key={suggestion.id}
                                            label={suggestion.label}
                                            icon={suggestion.icon}
                                            variant={isActive ? "selected" : "outlined"}
                                            size="small"
                                            onClick={() => handleSuggestionClick(suggestion.id)}
                                        />
                                    );
                                })}
                            </Box>

                            {/* Send Button */}
                            <SendButton onClick={handleSend} disabled={!state.context.value.trim() || disabled} color="primary" />
                        </Box>
                    )}

                    {/* Chat mode send button */}
                    {state.context.mode === 'chat' && (
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                            <SendButton onClick={handleSend} disabled={!state.context.value.trim() || disabled} color="primary" />
                        </Box>
                    )}
                </Box>
            </Paper>

            {/* Helper Text */}
            {state.context.helperText && (
                <Typography
                    variant="caption"
                    color={state.context.error ? "error" : "text.secondary"}
                    sx={{
                        display: 'block',
                        mt: 0.5,
                        textAlign: 'right', // RTL
                        px: 1
                    }}
                >
                    {state.context.helperText}
                </Typography>
            )}
        </Box>
    );
};