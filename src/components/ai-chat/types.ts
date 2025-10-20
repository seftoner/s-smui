import React from 'react';

// File upload states
export type FileUploadStatus = 'uploading' | 'completed' | 'error';

// Attached file interface
export interface AttachedFile {
  id: string; // Unique identifier
  file: File; // Original file object
  fileName: string;
  fileSize: number; // in bytes
  mimeType: string;
  uploadStatus: FileUploadStatus;
  uploadProgress: number; // 0-100
  error?: string; // Error message if upload failed
  uploadedUrl?: string; // URL after successful upload
  imagePreview?: string; // Data URL for image preview
}

// Machine context interface
export interface PromptInputContext {
  value: string;
  error: boolean;
  helperText: string;
}

// Machine events
export type PromptInputEvent =
  | { type: 'FOCUS' }
  | { type: 'BLUR' }
  | { type: 'HOVER' }
  | { type: 'UNHOVER' }
  | { type: 'SEND' }
  | { type: 'SEND_SUCCESS' }
  | { type: 'SEND_ERROR'; message?: string }
  | { type: 'SET_VALUE'; value: string }
  | { type: 'SET_ERROR'; error: boolean; helperText?: string }
  | { type: 'DRAG_ENTER' }
  | { type: 'DRAG_LEAVE' };

// Component props interface
export interface PromptInputProps {
  value?: string;
  onChange: (value: string) => void;
  onSend: () => void | Promise<void>;
  disabled?: boolean;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  disableSend?: boolean;
  layout?: PromptInputLayout;
  slots?: PromptInputSlots;
}

// Suggestion chip interface
export interface SuggestionChip {
  id: string; // Unique identifier for the chip
  label: string;
  icon: React.ReactElement;
  systemPrompt?: string; // Optional predefined system prompt
}

export type PromptInputSlotRenderer = ((state: PromptInputSlotState) => React.ReactNode) | React.ReactNode;

export interface PromptInputSlots {
  top?: PromptInputSlotRenderer;
  inlineStart?: PromptInputSlotRenderer;
  inlineEnd?: PromptInputSlotRenderer;
  stackedStart?: PromptInputSlotRenderer;
  stackedEnd?: PromptInputSlotRenderer;
  footer?: PromptInputSlotRenderer;
}

export interface PromptInputSlotState {
  layout: {
    variant: 'compact' | 'expanded';
    isStacked: boolean;
  };
  disabled: boolean;
  value: string;
  isFocused: boolean;
  canSend: boolean;
  focusInput: () => void;
  send: () => void;
}

export type PromptInputLayout = 'auto' | 'compact' | 'expanded';

// File validation constants
export const FILE_UPLOAD_CONSTANTS = {
  MAX_FILES: 10,
  MAX_FILE_SIZE: 20 * 1024 * 1024, // 20MB in bytes
  ALLOWED_TYPES: [
    // Images
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml',
    // Documents
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
    'application/rtf',
    'text/markdown',
    // Spreadsheets
    'text/csv',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    // Archives
    'application/zip',
    'application/x-7z-compressed',
    'application/x-tar',
    'application/gzip',
    // Code files
    'application/json',
    'application/javascript',
    'text/html',
    'text/css',
    'text/x-python',
    'text/x-cpp',
    'application/x-sh',
  ],
} as const;
