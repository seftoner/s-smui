import { assign, setup } from 'xstate';
import type { PromptInputContext, AttachedFile } from './types';
import { FILE_UPLOAD_CONSTANTS } from './types';

/**
 * XState machine for managing PromptInput component state using modern v5 setup pattern
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
export const promptInputMachine = setup({
  // Define all shared actions here - available in all states
  actions: {
    setValue: assign({
      value: ({ event }) => event.value,
    }),
    setError: assign({
      error: ({ event }) => event.error,
      helperText: ({ event }) => event.helperText || '',
    }),
    setMode: assign({
      mode: ({ event }) => event.mode,
    }),
    selectChip: assign({  
      activeChipId: ({ event, context }) => 
        context.activeChipId === event.chipId ? null : event.chipId,
    }),
    deselectChip: assign({
      activeChipId: () => null,
    }),
    addFiles: assign({
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
    removeFile: assign({
      attachedFiles: ({ event, context }) => 
        context.attachedFiles.filter((file: AttachedFile) => file.id !== event.fileId),
    }),
    updateFileProgress: assign({
      attachedFiles: ({ event, context }) => 
        context.attachedFiles.map((file: AttachedFile) => 
          file.id === event.fileId 
            ? { ...file, uploadProgress: event.progress }
            : file
        ),
    }),
    fileUploadSuccess: assign({
      attachedFiles: ({ event, context }) => 
        context.attachedFiles.map((file: AttachedFile) => 
          file.id === event.fileId 
            ? { ...file, uploadStatus: 'completed', uploadProgress: 100, uploadedUrl: event.uploadedUrl }
            : file
        ),
    }),
    fileUploadError: assign({
      attachedFiles: ({ event, context }) => 
        context.attachedFiles.map((file: AttachedFile) => 
          file.id === event.fileId 
            ? { ...file, uploadStatus: 'error', error: event.error }
            : file
        ),
    }),
    setSendError: assign({
      error: () => true,
      helperText: ({ event }) => event.message || 'Failed to send message',
    }),
  },
}).createMachine({
  id: 'promptInput',
  initial: 'idle',
  context: (): PromptInputContext => ({
    value: '',
    error: false,
    helperText: '',
    mode: 'landing',
    activeChipId: null,
    attachedFiles: [],
    isDragOver: false,
  }),
  
  // Define shared actions that are available in all states
  on: {
    SET_VALUE: { actions: 'setValue' },
    SET_ERROR: { actions: 'setError' },
    SET_MODE: { actions: 'setMode' },
    SELECT_CHIP: { actions: 'selectChip' },
    DESELECT_CHIP: { actions: 'deselectChip' },
    ADD_FILES: { actions: 'addFiles' },
    REMOVE_FILE: { actions: 'removeFile' },
    UPDATE_FILE_PROGRESS: { actions: 'updateFileProgress' },
    FILE_UPLOAD_SUCCESS: { actions: 'fileUploadSuccess' },
    FILE_UPLOAD_ERROR: { actions: 'fileUploadError' },
  },
  
  states: {
    idle: {
      on: {
        FOCUS: 'focused',
        HOVER: 'hovered',
      },
    },
    hovered: {
      on: {
        FOCUS: 'focused',
        UNHOVER: 'idle',
      },
    },
    focused: {
      on: {
        BLUR: 'idle',
        HOVER: 'focusedAndHovered',
        UNHOVER: 'focused',
        SEND: 'sending',
      },
    },
    focusedAndHovered: {
      on: {
        BLUR: 'hovered',
        UNHOVER: 'focused',
        SEND: 'sending',
      },
    },
    sending: {
      on: {
        SEND_SUCCESS: 'idle',
        SEND_ERROR: {
          target: 'idle',
          actions: 'setSendError',
        },
        // Only allow chip deselection during sending, not selection
        SELECT_CHIP: undefined, // Disable chip selection during sending
      },
    },
  },
});