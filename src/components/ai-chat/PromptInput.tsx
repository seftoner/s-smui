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
    PaperclipIcon,
    ArrowUpIcon,
} from '@phosphor-icons/react';
import { useMachine } from '@xstate/react';
import type { ActorRefFrom } from 'xstate';
import { FileAttachmentsBar } from './FileAttachmentsBar';
import { promptInputMachine } from './promptInputMachine';
import type { PromptInputProps, SuggestionChip } from './types';
import { FILE_UPLOAD_CONSTANTS } from './types';
import { fileListToArray } from './fileUploadUtils';
import { useTextareaIsMultiline, useFileAttachments } from '../../hooks';
import type { SnapshotFrom } from 'xstate';

type PromptInputSnapshot = SnapshotFrom<typeof promptInputMachine>;
type PromptInputSend = ActorRefFrom<typeof promptInputMachine>['send'];


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

// Props interfaces for better organization
interface InputFieldHandlers {
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onKeyPress: (event: React.KeyboardEvent) => void;
    onAddFiles: () => void;
    onSend: () => void;
}

interface InputRowProps {
    state: PromptInputSnapshot;
    send: PromptInputSend;
    placeholder: string;
    handlers: InputFieldHandlers;
    textFieldRef: React.RefObject<HTMLDivElement | null>;
    disabled: boolean;
    canSendMessage: boolean;
    showCompactLayout: boolean;
}

// Main input row component
const InputRow = React.memo<InputRowProps>(({
    state,
    send,
    placeholder,
    handlers,
    textFieldRef,
    disabled,
    canSendMessage,
    showCompactLayout,
}) => {
    const { ref: textareaRef, isMultiline } = useTextareaIsMultiline<HTMLTextAreaElement>();
    const shouldUseVerticalLayout = showCompactLayout && isMultiline;

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: shouldUseVerticalLayout ? 'column' : 'row',
            alignItems: shouldUseVerticalLayout ? 'stretch' : 'center',
            mb: showCompactLayout ? 0 : 2,
            ml: showCompactLayout ? 0 : 2,
        }}>
            {/* File attachment button for horizontal layout */}
            {showCompactLayout && !shouldUseVerticalLayout && (
                <FileAttachmentButton onClick={handlers.onAddFiles} />
            )}

            {/* Text Field - always present, same component */}
            <InputBase
                ref={textFieldRef}
                inputRef={textareaRef}
                fullWidth
                multiline
                maxRows={6}
                placeholder={placeholder}
                value={state.context.value}
                onChange={handlers.onChange}
                onKeyDown={handlers.onKeyPress}
                onFocus={() => send({ type: 'FOCUS' })}
                onBlur={() => send({ type: 'BLUR' })}
                disabled={disabled}
            />

            {/* Send button for horizontal layout */}
            {showCompactLayout && !shouldUseVerticalLayout && (
                <SendButton onClick={handlers.onSend} disabled={!canSendMessage} color="primary" />
            )}

            {/* Buttons Container for vertical layout only */}
            {showCompactLayout && shouldUseVerticalLayout && (
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    transition: 'all 0.3s ease-in-out',
                }}>
                    <FileAttachmentButton onClick={handlers.onAddFiles} />
                    <SendButton onClick={handlers.onSend} disabled={!canSendMessage} color="primary" />
                </Box>
            )}
        </Box>
    );
});
InputRow.displayName = 'InputRow';

// Suggestions footer props interface
interface SuggestionsFooterProps {
    suggestions: SuggestionChip[];
    activeChipId: string | null;
    onAddFiles: () => void;
    onSuggestionClick: (chipId: string) => void;
    canSendMessage: boolean;
    onSend: () => void;
}

// Suggestions footer - shows suggestion chips and controls
const SuggestionsFooter = React.memo<SuggestionsFooterProps>(({
    suggestions,
    activeChipId,
    onAddFiles,
    onSuggestionClick,
    canSendMessage,
    onSend
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
                <FileAttachmentButton onClick={onAddFiles} />

                {/* Suggestion chips */}
                {suggestions.map((suggestion) => {
                    const isActive = activeChipId === suggestion.id;
                    return (
                        <Chip
                            key={suggestion.id}
                            label={suggestion.label}
                            icon={suggestion.icon}
                            variant={isActive ? "selected" : "outlined"}
                            size="small"
                            onClick={() => onSuggestionClick(suggestion.id)}
                        />
                    );
                })}
            </Box>

            {/* Right side: Send Button */}
            <SendButton onClick={onSend} disabled={!canSendMessage} color="primary" />
        </Box>
    );
});
SuggestionsFooter.displayName = 'SuggestionsFooter';

export const PromptInput: React.FC<PromptInputProps> = ({
    value: externalValue,
    onChange,
    onSend,
    onChipChange,
    disabled = false,
    placeholder = "Ask me anything...",
    suggestions,
    error: externalError = false,
    helperText: externalHelperText,
}) => {
    const theme = useTheme();
    const textFieldRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Check if we should show suggestions footer
    const hasSuggestions = Boolean(suggestions && suggestions.length > 0);

    // Use the file attachments hook
    const {
        attachedFiles,
        addFiles,
        removeFile,
        hasUploadingFiles,
        hasFailedFiles,
    } = useFileAttachments();

    // Initialize the state machine
    const [state, send] = useMachine(promptInputMachine);

    // Sync external value changes with the machine
    React.useEffect(() => {
        if (externalValue !== undefined && externalValue !== state.context.value) {
            send({ type: 'SET_VALUE', value: externalValue });
        }
    }, [externalValue, state.context.value, send]);

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

    const canSendMessage = canSend();

    const handleSend = React.useCallback(() => {
        if (!canSend()) {
            return;
        }

        send({ type: 'SEND' });
        onSend();
    }, [canSend, send, onSend]);

    // Simulate async send success - in real app this would be handled by the parent
    React.useEffect(() => {
        if (state.matches('sending')) {
            const timeoutId = setTimeout(() => {
                send({ type: 'SEND_SUCCESS' });
            }, 100);

            return () => clearTimeout(timeoutId);
        }
    }, [state, send]);

    const handleSuggestionClick = React.useCallback((chipId: string) => {
        send({ type: 'SELECT_CHIP', chipId });

        // Focus the input after clicking a suggestion
        const input = textFieldRef.current?.querySelector<HTMLTextAreaElement | HTMLInputElement>('textarea, input');
        input?.focus();
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
                sx={{
                    borderRadius: 8, // 24px based on cornerRadius-4
                    border: `1px solid ${getBorderColor()}`,
                    overflow: 'hidden',
                    boxShadow: theme.customShadows.promptInput,
                    position: 'relative',
                    '&:hover': {
                        borderColor: !isFocused ? theme.vars.palette.primary.light : theme.vars.palette.primary.main,
                    },
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
                        handlers={{
                            onChange: handleInputChange,
                            onKeyPress: handleKeyPress,
                            onAddFiles: handleAddFilesClick,
                            onSend: handleSend,
                        }}
                        textFieldRef={textFieldRef}
                        disabled={disabled}
                        canSendMessage={canSendMessage}
                        showCompactLayout={!hasSuggestions}
                    />


                    {/* Suggestions Footer - only shown when suggestions are provided */}
                    {hasSuggestions && suggestions && (
                        <SuggestionsFooter
                            suggestions={suggestions}
                            activeChipId={state.context.activeChipId}
                            onAddFiles={handleAddFilesClick}
                            onSuggestionClick={handleSuggestionClick}
                            canSendMessage={canSendMessage}
                            onSend={handleSend}
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
        </Box>
    );
};
