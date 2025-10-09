import type { } from '@mui/material/themeCssVarsAugmentation';
import React from 'react';
import {
    Box,
    Typography,
    IconButton,
    CircularProgress,
    useTheme,
} from '@mui/material';
import { X } from '@phosphor-icons/react';
import {
    ArchiveIcon,
    DocumentIcon,
    FileIcon,
    PDFIcon,
    SDocumentIcon,
    SpreadsheetIcon,
} from '../../assets/icons';

// File type mapping for icons
const FILE_TYPE_CONFIG = {
    document: {
        icon: DocumentIcon,
        label: 'Document',
        mimeTypes: ['text/plain', 'application/rtf', 'text/markdown'],
    },
    pdf: {
        icon: PDFIcon,
        label: 'PDF',
        mimeTypes: ['application/pdf'],
    },
    word: {
        icon: SDocumentIcon,
        label: 'Document',
        mimeTypes: [
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ],
    },
    archive: {
        icon: ArchiveIcon,
        label: 'Archive',
        mimeTypes: [
            'application/zip',
            'application/x-7z-compressed',
            'application/x-tar',
            'application/gzip',
        ],
    },
    code: {
        icon: FileIcon,
        label: 'Code',
        mimeTypes: [
            'application/json',
            'application/javascript',
            'text/html',
            'text/x-python',
            'text/x-cpp',
            'application/x-sh',
        ],
    },
    spreadsheet: {
        icon: SpreadsheetIcon,
        label: 'Spreadsheet',
        mimeTypes: [
            'text/csv',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ],
    },
    email: {
        icon: FileIcon,
        label: 'Email',
        mimeTypes: ['message/rfc822', 'application/eml'],
    },
} as const;

export interface FileAttachmentProps {
    /** File name to display */
    fileName: string;
    /** File MIME type for icon selection */
    mimeType?: string;
    /** File extension (fallback if MIME type is unknown) */
    fileExtension?: string;
    /** Whether the file is currently uploading */
    uploading?: boolean;
    /** Image preview URL (for image files) */
    imagePreview?: string;
    /** Whether to show in compact mode (image only) */
    compact?: boolean;
    /** Callback when remove button is clicked */
    onRemove?: () => void;
    /** Upload progress (0-100) */
    uploadProgress?: number;
    /** Additional CSS class */
    className?: string;
}

/**
 * Get file type configuration based on MIME type or extension
 */
function getFileTypeConfig(mimeType?: string, fileExtension?: string) {
    // Check MIME type first
    if (mimeType) {
        for (const config of Object.values(FILE_TYPE_CONFIG)) {
            if (config.mimeTypes.some(type => mimeType.startsWith(type))) {
                return config;
            }
        }
    }

    // Fallback to file extension
    if (fileExtension) {
        const ext = fileExtension.toLowerCase().replace('.', '');
        switch (ext) {
            case 'pdf':
                return FILE_TYPE_CONFIG.pdf;
            case 'doc':
            case 'docx':
                return FILE_TYPE_CONFIG.word;
            case 'zip':
            case '7z':
            case 'tar':
            case 'gz':
                return FILE_TYPE_CONFIG.archive;
            case 'js':
            case 'ts':
            case 'jsx':
            case 'tsx':
            case 'html':
            case 'css':
            case 'py':
            case 'cpp':
            case 'c':
            case 'sh':
            case 'json':
                return FILE_TYPE_CONFIG.code;
            case 'csv':
            case 'xls':
            case 'xlsx':
                return FILE_TYPE_CONFIG.spreadsheet;
            case 'eml':
            case 'msg':
                return FILE_TYPE_CONFIG.email;
            default:
                return FILE_TYPE_CONFIG.document;
        }
    }

    return FILE_TYPE_CONFIG.document;
}

/**
 * Extract file extension from filename
 */
function getFileExtension(fileName: string): string {
    const parts = fileName.split('.');
    return parts.length > 1 ? `.${parts[parts.length - 1]}` : '';
}

/**
 * File attachment component for displaying uploaded files
 */
export const FileAttachment: React.FC<FileAttachmentProps> = ({
    fileName,
    mimeType,
    fileExtension,
    uploading = false,
    imagePreview,
    compact = false,
    onRemove,
    uploadProgress = 0,
    className,
}) => {
    const theme = useTheme();

    // Determine if this is an image file
    const isImage = imagePreview || (mimeType && mimeType.startsWith('image/'));

    // Get file type configuration
    const detectedExtension = fileExtension || getFileExtension(fileName);
    const fileConfig = getFileTypeConfig(mimeType, detectedExtension);

    // For image files in compact mode, show only the image preview
    if (isImage && compact) {
        return (
            <Box
                className={className}
                sx={{
                    position: 'relative',
                    width: 56,
                    height: 56,
                    borderRadius: 2,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    '&:hover .remove-button': {
                        opacity: 1,
                    },
                }}
            >
                {/* Image Preview */}
                {imagePreview ? (
                    <Box
                        component="img"
                        src={imagePreview}
                        alt={fileName}
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: 2,
                        }}
                    />
                ) : (
                    <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: theme.vars.palette.action.selected,
                            borderRadius: 2,
                        }}
                    >
                        <img
                            src={FileIcon}
                            alt="File"
                            style={{
                                width: 24,
                                height: 24,
                                opacity: 0.6
                            }}
                        />
                    </Box>
                )}

                {/* Upload Progress Overlay */}
                {uploading && (
                    <Box
                        sx={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: theme.vars.palette.action.disabledBackground,
                            borderRadius: 2,
                        }}
                    >
                        <CircularProgress
                            size={24}
                            variant={uploadProgress > 0 ? 'determinate' : 'indeterminate'}
                            value={uploadProgress}
                        />
                    </Box>
                )}

                {/* Remove Button */}
                {onRemove && !uploading && (
                    <IconButton
                        className="remove-button"
                        size="small"
                        onClick={(e) => {
                            e.stopPropagation();
                            onRemove();
                        }}
                        sx={{
                            position: 'absolute',
                            top: -8,
                            right: -8,
                            width: 20,
                            height: 20,
                            backgroundColor: theme.vars.palette.background.default,
                            border: `1px solid ${theme.vars.palette.divider}`,
                            opacity: 0,
                            transition: 'opacity 0.2s ease',
                            '&:hover': {
                                backgroundColor: theme.vars.palette.action.hover,
                            },
                        }}
                    >
                        <X size={12} />
                    </IconButton>
                )}
            </Box>
        );
    }

    // Full file attachment card
    return (
        <Box
            className={className}
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                padding: 2,
                borderRadius: 4,
                backgroundColor: theme.vars.palette.background.paper,
                border: `1px solid ${theme.vars.palette.divider}`,
                // minHeight: 56,
                width: 220,
                position: 'relative',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': {
                    backgroundColor: theme.vars.palette.action.hover,
                    '.remove-button': {
                        opacity: 1,
                    },
                },
            }}
        >
            {/* File Icon or Image Preview */}
            <Box
                sx={{
                    width: 40,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 2,
                    flexShrink: 0,
                    overflow: 'hidden',
                }}
            >
                {uploading ? (
                    <CircularProgress
                        size={24}
                        variant={uploadProgress > 0 ? 'determinate' : 'indeterminate'}
                        value={uploadProgress}
                    />
                ) : isImage && imagePreview ? (
                    <Box
                        component="img"
                        src={imagePreview}
                        alt={fileName}
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: 1,
                        }}
                    />
                ) : (
                    <img
                        src={fileConfig.icon}
                        alt={fileConfig.label}
                    />
                )}
            </Box>

            {/* File Information */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                    variant="subtitle2"
                    color='text.primary'
                    noWrap
                    sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {fileName}
                </Typography>
                <Typography
                    variant="caption"
                    color='text.secondary'
                    sx={{
                        display: 'block',
                    }}
                >
                    {fileConfig.label}
                </Typography>
            </Box>

            {/* Remove Button */}
            {onRemove && !uploading && (
                <IconButton
                    className="remove-button"
                    size="small"
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove();
                    }}
                    sx={{
                        position: 'absolute',
                        top: -8,
                        right: -8,
                        width: 20,
                        height: 20,
                        backgroundColor: theme.vars.palette.background.default,
                        border: `1px solid ${theme.vars.palette.divider}`,
                        opacity: 0,
                        transition: 'opacity 0.2s ease',
                        '&:hover': {
                            backgroundColor: theme.vars.palette.action.hover,
                        },
                    }}
                >
                    <X size={12} />
                </IconButton>
            )}
        </Box>
    );
};

export default FileAttachment;