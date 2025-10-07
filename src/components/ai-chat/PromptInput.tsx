import type { } from '@mui/material/themeCssVarsAugmentation';
import React, { useRef, useState } from 'react';
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
import { FileAttachment } from '../shared/FileAttachment';
import { promptInputMachine } from './promptInputMachine';
import type { PromptInputProps, SuggestionChip, AttachedFile } from './types';
import { FILE_UPLOAD_CONSTANTS } from './types';
import { validateFiles, simulateFileUpload, fileListToArray } from './fileUploadUtils';

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

// Reusable file attachment button
const FileAttachmentButton: React.FC<{
    size?: 'small' | 'medium';
    onClick: () => void;
}> = ({ size = 'small', onClick }) => {
    return (
        <IconButton
            onClick={onClick}
            size={size}
        >
            <PaperclipIcon />
        </IconButton>
    );
};

// Main input row component (used by both modes)
const InputRow: React.FC<{
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
}> = ({
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
    theme
}) => {
        const isChat = state.context.mode === 'chat';

        return (
            <Box sx={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: 1,
                mb: isChat ? 0 : 2
            }}>
                {/* File attachment button for chat mode */}
                {isChat && <FileAttachmentButton onClick={handleAddFilesClick} />}

                {/* Text Field */}
                <InputBase
                    ref={textFieldRef}
                    fullWidth
                    multiline
                    maxRows={6}
                    minRows={1}
                    placeholder={placeholder}
                    value={state.context.value}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    onFocus={() => send({ type: 'FOCUS' })}
                    onBlur={() => send({ type: 'BLUR' })}
                    disabled={disabled}
                />

                {/* Send button for chat mode */}
                {isChat && <SendButton onClick={handleSend} disabled={!canSend()} color="primary" />}
            </Box>
        );
    };

// Footer component for landing mode
const LandingFooter: React.FC<{
    state: any;
    handleAddFilesClick: () => void;
    handleSuggestionClick: (chipId: string) => void;
    canSend: () => boolean;
    handleSend: () => void;
}> = ({
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
    };

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

    // Snackbar state for error notifications
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'error' | 'warning' | 'info' | 'success'>('error');

    // Helper function to show error messages
    const showError = (message: string, severity: 'error' | 'warning' | 'info' | 'success' = 'error') => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

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
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSend(); // handleSend now includes all validation logic
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newValue = event.target.value;
        send({ type: 'SET_VALUE', value: newValue });
        onChange(newValue);
    };

    // Helper function to create AttachedFile from File
    const createAttachedFile = (file: File): AttachedFile => ({
        id: `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        file,
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type,
        uploadStatus: 'uploading',
        uploadProgress: 0,
    });

    // File handling functions
    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const fileArray = fileListToArray(files);
            const { validFiles, errors } = validateFiles(fileArray, state.context.attachedFiles.length);

            if (validFiles.length > 0) {
                // Convert to AttachedFile objects
                const attachedFiles = validFiles.map(createAttachedFile);

                send({ type: 'ADD_FILES', files: attachedFiles });

                // Start upload simulation for each file
                attachedFiles.forEach(attachedFile => {
                    simulateFileUpload(
                        attachedFile.id,
                        (fileId, progress) => send({ type: 'UPDATE_FILE_PROGRESS', fileId, progress }),
                        (fileId, uploadedUrl) => send({ type: 'FILE_UPLOAD_SUCCESS', fileId, uploadedUrl }),
                        (fileId, error) => send({ type: 'FILE_UPLOAD_ERROR', fileId, error })
                    );
                });
            }

            // Show errors if any
            if (errors.length > 0) {
                console.error('File validation errors:', errors);
                errors.forEach(error => showError(error));
            }
        }

        // Reset file input
        event.target.value = '';
    };

    const handleAddFilesClick = () => {
        fileInputRef.current?.click();
    };

    const handleRemoveFile = (fileId: string) => {
        send({ type: 'REMOVE_FILE', fileId });
    };

    // Drag & Drop handlers
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        send({ type: 'DRAG_ENTER' });
    };

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        // Only trigger drag leave if we're leaving the main container
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
            send({ type: 'DRAG_LEAVE' });
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        send({ type: 'DRAG_LEAVE' });

        const files = event.dataTransfer.files;
        if (files.length > 0) {
            const fileArray = fileListToArray(files);

            // Validate files before adding
            const { validFiles, errors } = validateFiles(fileArray, state.context.attachedFiles.length);

            if (validFiles.length > 0) {
                // Convert to AttachedFile objects
                const attachedFiles = validFiles.map(createAttachedFile);

                send({ type: 'ADD_FILES', files: attachedFiles });

                // Start upload simulation for each file
                attachedFiles.forEach(attachedFile => {
                    simulateFileUpload(
                        attachedFile.id,
                        (fileId, progress) => {
                            send({ type: 'UPDATE_FILE_PROGRESS', fileId, progress });
                        },
                        (fileId, uploadedUrl) => {
                            send({ type: 'FILE_UPLOAD_SUCCESS', fileId, uploadedUrl });
                        },
                        (fileId, error) => {
                            send({ type: 'FILE_UPLOAD_ERROR', fileId, error });
                        }
                    );
                });
            }

            // Show errors if any
            if (errors.length > 0) {
                console.error('File validation errors:', errors);
                errors.forEach(error => showError(error));
            }
        }
    };

    // Helper function to check if send is allowed
    const canSend = () => {
        const hasText = state.context.value.trim().length > 0;
        const hasUploadingFiles = state.context.attachedFiles.some(file => file.uploadStatus === 'uploading');
        const hasFailedFiles = state.context.attachedFiles.some(file => file.uploadStatus === 'error');

        return hasText && !hasUploadingFiles && !hasFailedFiles && !disabled;
    };

    const handleSend = () => {
        if (!canSend()) {
            // Show appropriate error message
            if (!state.context.value.trim()) {
                showError('Please enter a message before sending.', 'warning');
            } else if (state.context.attachedFiles.some(file => file.uploadStatus === 'uploading')) {
                showError('Please wait for files to finish uploading.', 'warning');
            } else if (state.context.attachedFiles.some(file => file.uploadStatus === 'error')) {
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
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                sx={{
                    backgroundColor: getBackgroundColor(),
                    borderRadius: 8, // 24px based on cornerRadius-4
                    border: `1px solid ${getBorderColor()}`,
                    transition: 'all 0.3s ease-in-out',
                    overflow: 'hidden',
                    boxShadow: theme.customShadows.promptInput,
                    position: 'relative',
                    '&:hover': {
                        borderColor: !isFocused ? theme.vars.palette.primary.light : theme.vars.palette.primary.main,
                    },
                    // Drag over styling
                    ...(state.context.isDragOver && {
                        borderColor: theme.vars.palette.primary.main,
                        borderWidth: 2,
                        backgroundColor: theme.vars.palette.action.hover,
                    }),
                }}
            >
                <Box sx={{ p: 2 }}>
                    {/* File Attachments Area */}
                    {state.context.attachedFiles.length > 0 && (
                        <Box sx={{
                            mt: 2,
                            mb: state.context.mode === 'landing' ? 2 : 0
                        }}>
                            <Box sx={{
                                display: 'flex',
                                gap: 3,
                                overflowX: 'auto',
                                pb: 1,
                            }}>
                                {state.context.attachedFiles.map((file) => (
                                    <Box key={file.id} sx={{ flexShrink: 0 }}>
                                        <FileAttachment
                                            fileName={file.fileName}
                                            mimeType={file.mimeType}
                                            uploading={file.uploadStatus === 'uploading'}
                                            uploadProgress={file.uploadProgress}
                                            onRemove={() => handleRemoveFile(file.id)}
                                        />
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    )}

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
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity={snackbarSeverity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};