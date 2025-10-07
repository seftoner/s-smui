import React from 'react';

// Prompt input mode type
export type PromptInputMode = 'landing' | 'chat';

// Machine context interface
export interface PromptInputContext {
  value: string;
  error: boolean;
  helperText: string;
  mode: PromptInputMode;
  activeChipId: string | null; // ID of the currently active predefined prompt chip
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
  | { type: 'SET_MODE'; mode: PromptInputMode }
  | { type: 'SELECT_CHIP'; chipId: string }
  | { type: 'DESELECT_CHIP' };

// Component props interface
export interface PromptInputProps {
  value?: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onChipChange?: (activeChipId: string | null) => void; // Callback when active chip changes
  disabled?: boolean;
  placeholder?: string;
  mode?: PromptInputMode;
  error?: boolean;
  helperText?: string;
}

// Suggestion chip interface
export interface SuggestionChip {
  id: string; // Unique identifier for the chip
  label: string;
  icon: React.ReactElement;
  systemPrompt?: string; // Optional predefined system prompt
}