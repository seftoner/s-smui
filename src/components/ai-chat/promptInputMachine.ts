import { createMachine, assign } from 'xstate';
import type { PromptInputContext, PromptInputEvent, AttachedFile } from './types';
import { FILE_UPLOAD_CONSTANTS } from './types';
import { validateFile } from './fileUploadUtils';

/**
 * Generate unique ID for files
 */
const generateFileId = (): string => {
  return `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Create attached file object from File
 */
const createAttachedFile = (file: File): AttachedFile => ({
  id: generateFileId(),
  file,
  fileName: file.name,
  fileSize: file.size,
  mimeType: file.type,
  uploadStatus: 'uploading',
  uploadProgress: 0,
});

/**
 * Type guard to check if an event is a value change event
 */
export const isValueChangeEvent = (event: PromptInputEvent): event is Extract<PromptInputEvent, { type: 'SET_VALUE' }> => {
  return event.type === 'SET_VALUE';
};

/**
 * XState machine for managing PromptInput component state
 * 
 * States:
 * - idle: Default state, no user interaction
 * - hovered: Mouse is over the input
 * - focused: Input has keyboard focus
 * - focusedAndHovered: Input is both focused and hovered
 * - sending: Message is being sent
 * 
 * Context:
 * - value: Current input text value
 * - error: Whether there's an error state
 * - helperText: Help/error message text
 * - mode: UI mode ('landing' | 'chat')
 * 
 * Events: See PromptInputEvent type for all supported events
 */
export const promptInputMachine = createMachine({
  id: 'promptInput',
  initial: 'idle',
  context: {
    value: '',
    error: false,
    helperText: '',
    mode: 'landing',
    activeChipId: null,
    attachedFiles: [],
    isDragOver: false,
  } as PromptInputContext,
  states: {
    idle: {
      on: {
        FOCUS: 'focused',
        HOVER: 'hovered',
        SET_VALUE: {
          actions: assign({
            value: ({ event }) => event.value,
          }),
        },
        SET_ERROR: {
          actions: assign({
            error: ({ event }) => event.error,
            helperText: ({ event }) => event.helperText || '',
          }),
        },
        SET_MODE: {
          actions: assign({
            mode: ({ event }) => event.mode,
          }),
        },
        SELECT_CHIP: {
          actions: assign({
            activeChipId: ({ event, context }) => 
              context.activeChipId === event.chipId ? null : event.chipId, // Toggle: deselect if already selected
          }),
        },
        DESELECT_CHIP: {
          actions: assign({
            activeChipId: () => null,
          }),
        },
        // File attachment actions
        ADD_FILES: {
          actions: assign({
            attachedFiles: ({ event, context }) => {
              // Check if adding files would exceed the limit
              if (context.attachedFiles.length + event.files.length > FILE_UPLOAD_CONSTANTS.MAX_FILES) {
                return context.attachedFiles; // Don't add files if it would exceed limit
              }
              
              // Create attached files (validation already done in component)
              const newFiles = event.files.map((file: AttachedFile) => ({
                ...file,
                uploadStatus: 'uploading' as const,
                uploadProgress: 0,
              }));
              
              return [...context.attachedFiles, ...newFiles];
            },
          }),
        },
        REMOVE_FILE: {
          actions: assign({
            attachedFiles: ({ event, context }) => 
              context.attachedFiles.filter(file => file.id !== event.fileId),
          }),
        },
        UPDATE_FILE_PROGRESS: {
          actions: assign({
            attachedFiles: ({ event, context }) => 
              context.attachedFiles.map(file => 
                file.id === event.fileId 
                  ? { ...file, uploadProgress: event.progress }
                  : file
              ),
          }),
        },
        FILE_UPLOAD_SUCCESS: {
          actions: assign({
            attachedFiles: ({ event, context }) => 
              context.attachedFiles.map(file => 
                file.id === event.fileId 
                  ? { ...file, uploadStatus: 'completed', uploadProgress: 100, uploadedUrl: event.uploadedUrl }
                  : file
              ),
          }),
        },
        FILE_UPLOAD_ERROR: {
          actions: assign({
            attachedFiles: ({ event, context }) => 
              context.attachedFiles.map(file => 
                file.id === event.fileId 
                  ? { ...file, uploadStatus: 'error', error: event.error }
                  : file
              ),
          }),
        },
      },
    },
    hovered: {
      on: {
        FOCUS: 'focused',
        UNHOVER: 'idle',
        SET_VALUE: {
          actions: assign({
            value: ({ event }) => event.value,
          }),
        },
        SET_ERROR: {
          actions: assign({
            error: ({ event }) => event.error,
            helperText: ({ event }) => event.helperText || '',
          }),
        },
        SET_MODE: {
          actions: assign({
            mode: ({ event }) => event.mode,
          }),
        },
        SELECT_CHIP: {
          actions: assign({
            activeChipId: ({ event, context }) => 
              context.activeChipId === event.chipId ? null : event.chipId,
          }),
        },
        DESELECT_CHIP: {
          actions: assign({
            activeChipId: () => null,
          }),
        },
      },
    },
    focused: {
      on: {
        BLUR: 'idle',
        HOVER: 'focusedAndHovered',
        UNHOVER: 'focused',
        SEND: 'sending',
        SET_VALUE: {
          actions: assign({
            value: ({ event }) => event.value,
          }),
        },
        SET_ERROR: {
          actions: assign({
            error: ({ event }) => event.error,
            helperText: ({ event }) => event.helperText || '',
          }),
        },
        SET_MODE: {
          actions: assign({
            mode: ({ event }) => event.mode,
          }),
        },
        SELECT_CHIP: {
          actions: assign({
            activeChipId: ({ event, context }) => 
              context.activeChipId === event.chipId ? null : event.chipId,
          }),
        },
        DESELECT_CHIP: {
          actions: assign({
            activeChipId: () => null,
          }),
        },
      },
    },
    focusedAndHovered: {
      on: {
        BLUR: 'hovered',
        UNHOVER: 'focused',
        SEND: 'sending',
        SET_VALUE: {
          actions: assign({
            value: ({ event }) => event.value,
          }),
        },
        SET_ERROR: {
          actions: assign({
            error: ({ event }) => event.error,
            helperText: ({ event }) => event.helperText || '',
          }),
        },
        SET_MODE: {
          actions: assign({
            mode: ({ event }) => event.mode,
          }),
        },
        SELECT_CHIP: {
          actions: assign({
            activeChipId: ({ event, context }) => 
              context.activeChipId === event.chipId ? null : event.chipId,
          }),
        },
        DESELECT_CHIP: {
          actions: assign({
            activeChipId: () => null,
          }),
        },
      },
    },
    sending: {
      on: {
        SEND_SUCCESS: 'idle',
        SEND_ERROR: {
          target: 'idle',
          actions: assign({
            error: () => true,
            helperText: ({ event }) => event.message || 'Failed to send message',
          }),
        },
        SET_MODE: {
          actions: assign({
            mode: ({ event }) => event.mode,
          }),
        },
        // Allow chip deselection during sending, but not selection
        DESELECT_CHIP: {
          actions: assign({
            activeChipId: () => null,
          }),
        },
      },
    },
  },
});