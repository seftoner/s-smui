import type { } from '@mui/material/themeCssVarsAugmentation';
import React from 'react';
import {
    Box,
    InputBase,
    Paper,
    Typography,
    useTheme,
} from '@mui/material';
import { useMachine } from '@xstate/react';
import { promptInputMachine } from './promptInputMachine';
import type {
    PromptInputLayout,
    PromptInputProps,
    PromptInputSlotRenderer,
    PromptInputSlotState,
    PromptInputSlots,
} from './types';
import { useTextareaIsMultiline } from '../../hooks';

const isClassComponent = (value: unknown): value is React.ComponentClass<PromptInputSlotState> =>
    typeof value === 'function' && !!(value as React.ComponentClass).prototype?.isReactComponent;

const renderSlot = (slot: PromptInputSlotRenderer | undefined, state: PromptInputSlotState) => {
    if (!slot) {
        return null;
    }

    if (React.isValidElement(slot)) {
        return slot;
    }

    if (isClassComponent(slot)) {
        const Component = slot as React.ComponentType<PromptInputSlotState>;
        return <Component {...state} />;
    }

    if (typeof slot === 'function') {
        return (slot as (state: PromptInputSlotState) => React.ReactNode)(state);
    }

    return slot ?? null;
};

interface InputRowProps {
    value: string;
    placeholder: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onKeyPress: (event: React.KeyboardEvent) => void;
    onFocus: () => void;
    onBlur: () => void;
    textFieldRef: React.RefObject<HTMLDivElement | null>;
    textareaRef: React.RefObject<HTMLTextAreaElement | null>;
    disabled: boolean;
    showCompactLayout: boolean;
    shouldUseVerticalLayout: boolean;
    slots: Pick<PromptInputSlots, 'inlineStart' | 'inlineEnd' | 'stackedStart' | 'stackedEnd'>;
    slotState: PromptInputSlotState;
}

const InputRow: React.FC<InputRowProps> = ({
    value,
    placeholder,
    onChange,
    onKeyPress,
    onFocus,
    onBlur,
    textFieldRef,
    textareaRef,
    disabled,
    showCompactLayout,
    shouldUseVerticalLayout,
    slots,
    slotState,
}) => {
    const inlineStart = showCompactLayout && !shouldUseVerticalLayout
        ? renderSlot(slots.inlineStart, slotState)
        : null;

    const inlineEnd = showCompactLayout && !shouldUseVerticalLayout
        ? renderSlot(slots.inlineEnd, slotState)
        : null;

    const stackedStartRenderer = slots.stackedStart ?? slots.inlineStart;
    const stackedEndRenderer = slots.stackedEnd ?? slots.inlineEnd;
    const stackedStart = showCompactLayout && shouldUseVerticalLayout
        ? renderSlot(stackedStartRenderer, slotState)
        : null;
    const stackedEnd = showCompactLayout && shouldUseVerticalLayout
        ? renderSlot(stackedEndRenderer, slotState)
        : null;

    const hasStackedContent = Boolean(stackedStart) || Boolean(stackedEnd);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: showCompactLayout && shouldUseVerticalLayout ? 'column' : 'row',
            alignItems: showCompactLayout && shouldUseVerticalLayout ? 'stretch' : 'center',
            mb: showCompactLayout ? 0 : 2,
            ml: showCompactLayout ? 0 : 2,
        }}>
            {inlineStart}

            <InputBase
                ref={textFieldRef}
                inputRef={textareaRef}
                fullWidth
                multiline
                maxRows={6}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onKeyDown={onKeyPress}
                onFocus={onFocus}
                onBlur={onBlur}
                disabled={disabled}
            />

            {inlineEnd}

            {showCompactLayout && shouldUseVerticalLayout && hasStackedContent && (
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    transition: 'all 0.3s ease-in-out',
                    mt: 1,
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {stackedStart}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {stackedEnd}
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export const PromptInput: React.FC<PromptInputProps> = ({
    value: externalValue,
    onChange,
    onSend,
    disabled = false,
    placeholder = "Ask me anything...",
    error: externalError = false,
    helperText: externalHelperText,
    layout = 'auto',
    slots,
    disableSend = false,
}) => {
    const theme = useTheme();
    const textFieldRef = React.useRef<HTMLDivElement>(null);
    const { ref: textareaRef, isMultiline } = useTextareaIsMultiline<HTMLTextAreaElement>();

    const slotsConfig = React.useMemo<PromptInputSlots>(() => ({
        inlineStart: slots?.inlineStart,
        inlineEnd: slots?.inlineEnd,
        stackedStart: slots?.stackedStart,
        stackedEnd: slots?.stackedEnd,
        top: slots?.top,
        footer: slots?.footer,
    }), [slots]);

    const [state, send] = useMachine(promptInputMachine);
    const isFocused = state.matches('focused') || state.matches('focusedAndHovered');
    const isHovered = state.matches('hovered') || state.matches('focusedAndHovered');

    React.useEffect(() => {
        if (externalValue !== undefined && externalValue !== state.context.value) {
            send({ type: 'SET_VALUE', value: externalValue });
        }
    }, [externalValue, state.context.value, send]);

    React.useEffect(() => {
        const normalizedHelperText = externalHelperText ?? '';
        if (externalError !== state.context.error || normalizedHelperText !== state.context.helperText) {
            send({
                type: 'SET_ERROR',
                error: externalError,
                helperText: normalizedHelperText
            });
        }
    }, [externalError, externalHelperText, state.context.error, state.context.helperText, send]);

    const handleInputChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newValue = event.target.value;
        send({ type: 'SET_VALUE', value: newValue });
        onChange(newValue);
    }, [send, onChange]);

    const canSend = React.useCallback(() => {
        const hasText = state.context.value.trim().length > 0;
        return hasText && !disabled && !disableSend;
    }, [state.context.value, disabled, disableSend]);

    const handleSend = React.useCallback(() => {
        if (!canSend()) {
            return;
        }

        send({ type: 'SEND' });

        try {
            const result = onSend();
            if (result && typeof (result as Promise<unknown>).then === 'function') {
                (result as Promise<unknown>)
                    .then(() => send({ type: 'SEND_SUCCESS' }))
                    .catch((error) => {
                        const message = error instanceof Error ? error.message : undefined;
                        send({ type: 'SEND_ERROR', message });
                    });
            } else {
                send({ type: 'SEND_SUCCESS' });
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : undefined;
            send({ type: 'SEND_ERROR', message });
        }
    }, [canSend, onSend, send]);

    const handleKeyPress = React.useCallback((event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSend();
        }
    }, [handleSend]);

    const focusInput = React.useCallback(() => {
        textareaRef.current?.focus();
    }, []);

    const resolvedLayout: PromptInputLayout = React.useMemo(() => {
        if (layout === 'compact') {
            return 'compact';
        }

        if (layout === 'expanded') {
            return 'expanded';
        }

        return slotsConfig.footer ? 'expanded' : 'compact';
    }, [layout, slotsConfig.footer]);

    const showCompactLayout = resolvedLayout === 'compact';
    const shouldUseVerticalLayout = showCompactLayout && isMultiline;
    const canSendMessage = canSend();

    const onFocus = React.useCallback(() => send({ type: 'FOCUS' }), [send]);
    const onBlur = React.useCallback(() => send({ type: 'BLUR' }), [send]);

    const slotState = React.useMemo<PromptInputSlotState>(() => ({
        layout: {
            variant: resolvedLayout === 'compact' ? 'compact' : 'expanded',
            isStacked: shouldUseVerticalLayout,
        },
        disabled,
        value: state.context.value,
        isFocused,
        canSend: canSendMessage,
        focusInput,
        send: handleSend,
    }), [resolvedLayout, shouldUseVerticalLayout, disabled, state.context.value, isFocused, canSendMessage, focusInput, handleSend]);

    const topContent = React.useMemo(
        () => renderSlot(slotsConfig.top, slotState),
        [slotsConfig.top, slotState]
    );

    const footerContent = React.useMemo(
        () => renderSlot(slotsConfig.footer, slotState),
        [slotsConfig.footer, slotState]
    );

    const onMouseEnter = React.useCallback(() => send({ type: 'HOVER' }), [send]);
    const onMouseLeave = React.useCallback(() => send({ type: 'UNHOVER' }), [send]);
    const borderColor = state.context.error
        ? theme.vars.palette.error.main
        : isFocused
            ? theme.vars.palette.primary.main
            : isHovered
                ? theme.vars.palette.primary.light
                : theme.vars.palette.divider;

    return (
        <Box>
            <Paper
                elevation={0}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                sx={{
                    borderRadius: 8,
                    border: `1px solid ${borderColor}`,
                    overflow: 'hidden',
                    boxShadow: theme.customShadows.promptInput,
                    position: 'relative',
                    '&:hover': {
                        borderColor: !isFocused
                            ? theme.vars.palette.primary.light
                            : theme.vars.palette.primary.main,
                    },
                }}
            >
                <Box sx={{ p: 2 }}>
                    {topContent}

                    <InputRow
                        value={state.context.value}
                        placeholder={placeholder}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        textFieldRef={textFieldRef}
                        textareaRef={textareaRef}
                        disabled={disabled}
                        showCompactLayout={showCompactLayout}
                        shouldUseVerticalLayout={shouldUseVerticalLayout}
                        slots={{
                            inlineStart: slotsConfig.inlineStart,
                            inlineEnd: slotsConfig.inlineEnd,
                            stackedStart: slotsConfig.stackedStart,
                            stackedEnd: slotsConfig.stackedEnd,
                        }}
                        slotState={slotState}
                    />

                    {resolvedLayout === 'expanded' && footerContent}
                </Box>
            </Paper>

            {state.context.helperText && (
                <Typography
                    variant="caption"
                    color={state.context.error ? "error" : "text.secondary"}
                    sx={{
                        display: 'block',
                        mt: 0.5,
                        textAlign: 'right',
                        px: 1
                    }}
                >
                    {state.context.helperText}
                </Typography>
            )}
        </Box>
    );
};
