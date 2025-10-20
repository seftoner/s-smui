import { assign, setup } from 'xstate';
import type { PromptInputContext } from './types';

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
  }),
  
  // Define shared actions that are available in all states
  on: {
    SET_VALUE: { actions: 'setValue' },
    SET_ERROR: { actions: 'setError' },
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
      },
    },
  },
});
