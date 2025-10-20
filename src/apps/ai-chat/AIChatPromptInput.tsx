import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Box, Chip, IconButton } from '@mui/material';
import { ArrowUpIcon, PaperclipIcon } from '@phosphor-icons/react';
import {
    PromptInput,
    FileAttachmentsBar,
} from '../../components/ai-chat';
import { useFileAttachments } from '../../hooks';
import {
    FILE_UPLOAD_CONSTANTS,
    type PromptInputSlotState,
    type SuggestionChip,
} from '../../components/ai-chat/types';
import { fileListToArray } from '../../components/ai-chat/fileUploadUtils';

interface AIChatPromptInputProps {
    value: string;
    onChange: (value: string) => void;
    onSend: () => void;
    suggestions?: SuggestionChip[];
    disabled?: boolean;
    placeholder?: string;
}

export const AIChatPromptInput: React.FC<AIChatPromptInputProps> = ({
    value,
    onChange,
    onSend,
    suggestions,
    disabled = false,
    placeholder = "Ask me anything...",
}) => {
    const [activeSuggestionId, setActiveSuggestionId] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const {
        attachedFiles,
        addFiles,
        removeFile,
        hasUploadingFiles,
        hasFailedFiles,
    } = useFileAttachments();

    const handleFileSelect = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const fileArray = fileListToArray(files);
            await addFiles(fileArray);
        }
        event.target.value = '';
    }, [addFiles]);

    const handleAddFilesClick = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const suggestionList = useMemo(() => suggestions ?? [], [suggestions]);

    const renderAttachmentButton = useCallback((slotState: PromptInputSlotState) => (
        <IconButton onClick={handleAddFilesClick} size="small" disabled={slotState.disabled}>
            <PaperclipIcon />
        </IconButton>
    ), [handleAddFilesClick]);

    const renderSendButton = useCallback((slotState: PromptInputSlotState) => {
        const isDisabled = !slotState.canSend || hasUploadingFiles || hasFailedFiles;

        return (
            <IconButton
                size="small"
                color="primary"
                onClick={() => {
                    if (!isDisabled) {
                        slotState.send();
                    }
                }}
                disabled={isDisabled}
                sx={{
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                        transform: isDisabled ? 'none' : 'scale(1.05)',
                    },
                }}
            >
                <ArrowUpIcon />
            </IconButton>
        );
    }, [hasFailedFiles, hasUploadingFiles]);

    const renderFooter = useCallback((slotState: PromptInputSlotState) => {
        if (suggestionList.length === 0) {
            return null;
        }

        const isSendDisabled = !slotState.canSend || hasUploadingFiles || hasFailedFiles;

        return (
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2
            }}>
                <Box sx={{
                    display: 'flex',
                    gap: 2,
                    flex: 1,
                    justifyContent: 'flex-start',
                    flexWrap: 'wrap',
                    alignItems: 'center'
                }}>
                    <IconButton onClick={handleAddFilesClick} size="small" disabled={slotState.disabled}>
                        <PaperclipIcon />
                    </IconButton>
                    {suggestionList.map((suggestion) => {
                        const isActive = activeSuggestionId === suggestion.id;
                        return (
                            <Chip
                                key={suggestion.id}
                                label={suggestion.label}
                                icon={suggestion.icon}
                                variant={isActive ? "selected" : "outlined"}
                                size="small"
                                onClick={() => {
                                    setActiveSuggestionId(prev =>
                                        prev === suggestion.id ? null : suggestion.id
                                    );
                                    slotState.focusInput();
                                }}
                            />
                        );
                    })}
                </Box>

                <IconButton
                    size="small"
                    color="primary"
                    onClick={() => {
                        if (!isSendDisabled) {
                            slotState.send();
                        }
                    }}
                    disabled={isSendDisabled}
                    sx={{
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                            transform: isSendDisabled ? 'none' : 'scale(1.05)',
                        },
                    }}
                >
                    <ArrowUpIcon />
                </IconButton>
            </Box>
        );
    }, [activeSuggestionId, hasFailedFiles, hasUploadingFiles, handleAddFilesClick, suggestionList]);

    const slots = useMemo(() => ({
        top: attachedFiles.length > 0 ? (
            <FileAttachmentsBar
                files={attachedFiles}
                onRemoveFile={removeFile}
            />
        ) : null,
        inlineStart: renderAttachmentButton,
        inlineEnd: renderSendButton,
        footer: suggestionList.length > 0 ? renderFooter : undefined,
    }), [
        attachedFiles,
        removeFile,
        renderAttachmentButton,
        renderSendButton,
        renderFooter,
        suggestionList,
    ]);

    return (
        <>
            <input
                ref={fileInputRef}
                type="file"
                multiple
                accept={FILE_UPLOAD_CONSTANTS.ALLOWED_TYPES.join(',')}
                style={{ display: 'none' }}
                onChange={handleFileSelect}
            />
            <PromptInput
                value={value}
                onChange={onChange}
                onSend={onSend}
                disabled={disabled}
                disableSend={hasUploadingFiles || hasFailedFiles}
                placeholder={placeholder}
                slots={slots}
            />
        </>
    );
};
