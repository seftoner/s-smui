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
    Snackbar,
    Alert,
} from '@mui/material';
import {
    PencilCircleIcon,
    CheckCircleIcon,
    FileTextIcon,
    PaperclipIcon,
    ArrowUpIcon,
} from '@phosphor-icons/react';
import { useMachine } from '@xstate/react';
import { FileAttachmentsBar } from './FileAttachmentsBar';
import { promptInputMachine } from './promptInputMachine';
import type { PromptInputProps, SuggestionChip } from './types';
import { FILE_UPLOAD_CONSTANTS } from './types';
import { fileListToArray } from './fileUploadUtils';
import { useTextareaIsMultiline, useFileAttachments } from '../../hooks';

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

// Reusable send button component to avoid duplication
const SendButton = React.memo<{ onClick: () => void; disabled: boolean; color?: 'primary' | 'default' }>(({ onClick, disabled, color = 'primary' }) => {
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
});
SendButton.displayName = 'SendButton';

// Reusable file attachment button
const FileAttachmentButton = React.memo<{
    size?: 'small' | 'medium';
    onClick: () => void;
}>(({ size = 'small', onClick }) => {
    return (
        <IconButton
            onClick={onClick}
            size={size}
        >
            <PaperclipIcon />
        </IconButton>
    );
});
FileAttachmentButton.displayName = 'FileAttachmentButton';

// Main input row component (used by both modes)
const InputRow = React.memo<{
    state: any;
    send: any;
    placeholder: string;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleKeyPress: (event: React.KeyboardEvent) => void;
    handleAddFilesClick: () => void;
    textFieldRef: React.RefObject<HTMLDivElement | null>;
    disabled: boolean;
    canSend: () => boolean;
    handleSend: () => void;
    theme: any;
}>(({
    state,
    send,
    placeholder,
    handleInputChange,
    handleKeyPress,
    handleAddFilesClick,
    textFieldRef,
    disabled,
    canSend,
    handleSend,
}) => {
    const isChat = state.context.mode === 'chat';
    const { ref: textareaRef, isMultiline } = useTextareaIsMultiline<HTMLTextAreaElement>();
    const shouldUseVerticalLayout = isChat && isMultiline;

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: shouldUseVerticalLayout ? 'column' : 'row',
            alignItems: shouldUseVerticalLayout ? 'stretch' : 'center',
            mb: isChat ? 0 : 2,
            ml: isChat ? 0 : 2,
        }}>
            {/* File attachment button for horizontal layout */}
            {isChat && !shouldUseVerticalLayout && (
                <FileAttachmentButton onClick={handleAddFilesClick} />
            )}

            {/* Text Field - always present, same component */}
            <InputBase
                ref={textFieldRef}
                inputRef={textareaRef}
                fullWidth
                multiline
                maxRows={6}
                // minRows={shouldUseVerticalLayout ? 2 : 1}
                placeholder={placeholder}
                value={state.context.value}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                onFocus={() => send({ type: 'FOCUS' })}
                onBlur={() => send({ type: 'BLUR' })}
                disabled={disabled}

            />

            {/* Send button for horizontal layout */}
            {isChat && !shouldUseVerticalLayout && (
                <SendButton onClick={handleSend} disabled={!canSend()} color="primary" />
            )}

            {/* Buttons Container for vertical layout only */}
            {isChat && shouldUseVerticalLayout && (
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    transition: 'all 0.3s ease-in-out',
                }}>
                    <FileAttachmentButton onClick={handleAddFilesClick} />
                    <SendButton onClick={handleSend} disabled={!canSend()} color="primary" />
                </Box>
            )}
        </Box>
    );
});
InputRow.displayName = 'InputRow';

// Footer component for landing mode
const LandingFooter = React.memo<{
    state: any;
    handleAddFilesClick: () => void;
    handleSuggestionClick: (chipId: string) => void;
    canSend: () => boolean;
    handleSend: () => void;
}>(({
    state,
    handleAddFilesClick,
    handleSuggestionClick,
    canSend,
    handleSend
}) => {
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2
        }}>
            {/* Left side: File button + Suggestion Chips */}
            <Box sx={{
                display: 'flex',
                gap: 2,
                flex: 1,
                justifyContent: 'flex-start',
                flexWrap: 'wrap',
                alignItems: 'center'
            }}>
                <FileAttachmentButton onClick={handleAddFilesClick} />

                {/* Suggestion chips */}
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

            {/* Right side: Send Button */}
            <SendButton onClick={handleSend} disabled={!canSend()} color="primary" />
        </Box>
    );
});
LandingFooter.displayName = 'LandingFooter';

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
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Use the file attachments hook
    const {
        attachedFiles,
        addFiles,
        removeFile,
        hasUploadingFiles,
        hasFailedFiles,
        showError,
        snackbar,
    } = useFileAttachments();

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
        const normalizedHelperText = externalHelperText ?? '';
        if (externalError !== state.context.error || normalizedHelperText !== state.context.helperText) {
            send({
                type: 'SET_ERROR',
                error: externalError,
                helperText: normalizedHelperText
            });
        }
    }, [externalError, externalHelperText, state.context.error, state.context.helperText, send]);

    // Notify parent when active chip changes
    React.useEffect(() => {
        if (onChipChange) {
            onChipChange(state.context.activeChipId);
        }
    }, [state.context.activeChipId, onChipChange]);

    const handleInputChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newValue = event.target.value;
        send({ type: 'SET_VALUE', value: newValue });
        onChange(newValue);
    }, [send, onChange]);

    // File handling functions
    const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const fileArray = fileListToArray(files);
            await addFiles(fileArray);
        }

        // Reset file input
        event.target.value = '';
    };

    const handleAddFilesClick = () => {
        fileInputRef.current?.click();
    };

    // Helper function to check if send is allowed
    const canSend = React.useCallback(() => {
        const hasText = state.context.value.trim().length > 0;
        return hasText && !hasUploadingFiles && !hasFailedFiles && !disabled;
    }, [state.context.value, hasUploadingFiles, hasFailedFiles, disabled]);

    const handleSend = React.useCallback(() => {
        if (!canSend()) {
            // Show appropriate error message
            if (!state.context.value.trim()) {
                showError('Please enter a message before sending.', 'warning');
            } else if (hasUploadingFiles) {
                showError('Please wait for files to finish uploading.', 'warning');
            } else if (hasFailedFiles) {
                showError('Please remove or re-upload failed files.', 'error');
            }
            return;
        }

        send({ type: 'SEND' });
        onSend();

        // Simulate async operation - in real app this would be handled by the parent
        setTimeout(() => {
            send({ type: 'SEND_SUCCESS' });
        }, 100);
    }, [canSend, state.context.value, hasUploadingFiles, hasFailedFiles, send, onSend, showError]);

    const handleSuggestionClick = React.useCallback((chipId: string) => {
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
    }, [send]);

    const handleKeyPress = React.useCallback((event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSend();
        }
    }, [handleSend]);

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

    return (
        <Box>
            {/* Hidden File Input */}
            <input
                ref={fileInputRef}
                type="file"
                multiple
                accept={FILE_UPLOAD_CONSTANTS.ALLOWED_TYPES.join(',')}
                style={{ display: 'none' }}
                onChange={handleFileSelect}
            />

            {/* Main Input Container */}
            <Paper
                elevation={0}
                onMouseEnter={() => send({ type: 'HOVER' })}
                onMouseLeave={() => send({ type: 'UNHOVER' })}
                /* drag & drop handlers removed - keep file input for attachments */
                sx={{
                    backgroundColor: getBackgroundColor(),
                    borderRadius: 8, // 24px based on cornerRadius-4
                    border: `1px solid ${getBorderColor()}`,
                    overflow: 'hidden',
                    boxShadow: theme.customShadows.promptInput,
                    position: 'relative',
                    '&:hover': {
                        borderColor: !isFocused ? theme.vars.palette.primary.light : theme.vars.palette.primary.main,
                    },
                    /* drag styling removed */
                }}
            >
                <Box sx={{ p: 2 }}>
                    {/* File Attachments Area */}
                    <FileAttachmentsBar
                        files={attachedFiles}
                        onRemoveFile={removeFile}
                    />

                    {/* Main Input Row */}
                    <InputRow
                        state={state}
                        send={send}
                        placeholder={placeholder}
                        handleInputChange={handleInputChange}
                        handleKeyPress={handleKeyPress}
                        handleAddFilesClick={handleAddFilesClick}
                        textFieldRef={textFieldRef}
                        disabled={disabled}
                        canSend={canSend}
                        handleSend={handleSend}
                        theme={theme}
                    />


                    {/* Footer for Landing Mode */}
                    {state.context.mode === 'landing' && (
                        <LandingFooter
                            state={state}
                            handleAddFilesClick={handleAddFilesClick}
                            handleSuggestionClick={handleSuggestionClick}
                            canSend={canSend}
                            handleSend={handleSend}
                        />
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

            {/* Snackbar for error notifications */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={snackbar.onClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={snackbar.onClose}
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};
