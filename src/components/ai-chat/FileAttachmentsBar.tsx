/**
 * FileAttachmentsBar - Presentational component for displaying attached files
 * Shows files with upload progress, previews, and removal capability
 */

import React from 'react';
import { Box } from '@mui/material';
import { FileAttachment } from '../shared/FileAttachment';
import type { AttachedFile } from './types';

export interface FileAttachmentsBarProps {
    /**
     * Array of attached files to display
     */
    files: AttachedFile[];

    /**
     * Callback when a file should be removed
     */
    onRemoveFile: (fileId: string) => void;

    /**
     * Whether to use compact mode (for images with previews)
     */
    compact?: boolean;
}

/**
 * Displays a horizontal scrollable bar of attached files
 */
export const FileAttachmentsBar: React.FC<FileAttachmentsBarProps> = ({
    files,
    onRemoveFile,
    compact = false,
}) => {
    // Don't render if no files
    if (files.length === 0) {
        return null;
    }

    return (
        <Box
            sx={{
                mb: 2,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    gap: 3,
                    overflowX: 'auto',

                }}
            >
                {files.map((file) => (
                    <Box key={file.id} sx={{ flexShrink: 0 }}>
                        <FileAttachment
                            fileName={file.fileName}
                            mimeType={file.mimeType}
                            uploading={file.uploadStatus === 'uploading'}
                            uploadProgress={file.uploadProgress}
                            imagePreview={file.imagePreview}
                            compact={compact || (file.mimeType?.startsWith('image/') && !!file.imagePreview)}
                            onRemove={() => onRemoveFile(file.id)}
                        />
                    </Box>
                ))}
            </Box>
        </Box>
    );
};
