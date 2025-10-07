import { createMachine, assign } from 'xstate';
import type { PromptInputContext, PromptInputEvent } from './types';

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
      },
    },
  },
});