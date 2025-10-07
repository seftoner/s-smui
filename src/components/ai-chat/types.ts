import React from 'react';

// Prompt input mode type
export type PromptInputMode = 'landing' | 'chat';

// Machine context interface
export interface PromptInputContext {
  value: string;
  error: boolean;
  helperText: string;
  mode: PromptInputMode;
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
  | { type: 'SET_MODE'; mode: PromptInputMode };

// Component props interface
export interface PromptInputProps {
  value?: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
  placeholder?: string;
  mode?: PromptInputMode;
  error?: boolean;
  helperText?: string;
}

// Suggestion chip interface
export interface SuggestionChip {
  label: string;
  icon: React.ReactElement;
}