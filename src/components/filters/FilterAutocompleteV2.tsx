import React from 'react';
import { styled, Autocomplete, InputBase, Chip, Box } from '@mui/material';
import type { AutocompleteProps, AutocompleteRenderInputParams } from '@mui/material';
import { CaretDownIcon, XIcon } from '@phosphor-icons/react';
import { MultiValueLogicSelector } from './MultiValueLogicSelector';
import type { ValueLogicOperator } from './types';

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
    padding: theme.spacing(0, 2, 0, 1),
    minHeight: 44,
    alignItems: 'center',
    display: 'flex',
    gap: theme.spacing(1),

    '& .MuiAutocomplete-popupIndicator': {
        '& svg': {
            fontSize: '20px',
        },
    },
    '& .MuiAutocomplete-clearIndicator': {
        '& svg': {
            fontSize: '20px',
        },
    },
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:has(.Mui-disabled)': {
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
})) as typeof Autocomplete;

const StyledInputBase = styled(InputBase)({
    flex: 1,
    '& input': {
        padding: 0,
        border: 0,
        outline: 0,
    },
});

const StyledChip = styled(Chip)(({ theme }) => ({
    height: 24,
    '& .MuiChip-label': {
        padding: theme.spacing(0, 1),
    },
}));

const LimitChip = styled(Chip)(({ theme }) => ({
    height: 20,
    fontSize: '0.75rem',
    '& .MuiChip-label': {
        padding: theme.spacing(0, 0.5),
    },
}));

interface FilterAutocompleteV2Props<
    T,
    Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined
> extends Omit<
    AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
    'renderInput'
> {
    placeholder?: string;
    // Multi-value logic operator support
    showLogicSelector?: boolean;
    logicOperator?: ValueLogicOperator;
    onLogicOperatorChange?: (operator: ValueLogicOperator) => void;
}

/**
 * FilterAutocompleteV2 - Uses MUI Autocomplete with custom styling
 * Matches FilterInput design with proper chip display for multiple selection
 * Shows chips with limit indicator (+N) similar to FilterSelect
 * Supports AND/OR logic selector for multi-select mode
 */
export const FilterAutocompleteV2 = <
    T,
    Multiple extends boolean | undefined = false,
    DisableClearable extends boolean | undefined = false,
    FreeSolo extends boolean | undefined = false
>({
    placeholder,
    limitTags = -1,
    showLogicSelector = false,
    logicOperator = 'and',
    onLogicOperatorChange,
    ...props
}: FilterAutocompleteV2Props<T, Multiple, DisableClearable, FreeSolo>) => {
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (event.key === 'Enter') {
            // Blur the input to close the autocomplete
            const target = event.target as HTMLInputElement;
            target.blur();
        }
    };

    const renderInput = (params: AutocompleteRenderInputParams) => {
        const { InputLabelProps, InputProps, ...rest } = params;

        // Handle multiple selection display within renderInput
        let displayContent = InputProps.startAdornment;

        if (props.multiple && props.value && Array.isArray(props.value) && props.value.length > 0) {
            const values = props.value as T[];
            const limit = limitTags > 0 ? limitTags : values.length;
            const visibleValues = values.slice(0, limit);
            const hiddenCount = values.length - limit;

            displayContent = (
                <>
                    {visibleValues.map((option, index) => {
                        const label = props.getOptionLabel
                            ? props.getOptionLabel(option)
                            : String(option);

                        return (
                            <StyledChip
                                key={index}
                                label={label}
                                size="small"
                                disabled={props.disabled}
                                onDelete={
                                    !props.disabled
                                        ? () => {
                                            const newValue = values.filter((_, i) => i !== index);
                                            props.onChange?.(null as any, newValue as any, 'removeOption', { option });
                                        }
                                        : undefined
                                }
                            />
                        );
                    })}
                    {hiddenCount > 0 && (
                        <LimitChip
                            label={`+${hiddenCount}`}
                            size="small"
                            disabled={props.disabled}
                        />
                    )}
                </>
            );
        }

        return (
            <StyledInputBase
                ref={InputProps.ref}
                {...rest}
                placeholder={placeholder}
                startAdornment={displayContent}
                endAdornment={InputProps.endAdornment}
                onKeyDown={handleKeyDown}
            />
        );
    };

    // Custom ListboxComponent to add AND/OR selector at the top
    const CustomListbox = React.forwardRef<
        HTMLDivElement,
        React.HTMLAttributes<HTMLElement>
    >(function CustomListbox(listboxProps, ref) {
        const { children, ...other } = listboxProps;

        // Check if we should show logic selector based on outer component props
        const shouldShowSelector =
            showLogicSelector &&
            props.multiple &&
            Array.isArray(props.value) &&
            props.value.length >= 2;

        return (
            <Box ref={ref} {...other}>
                {/* Show AND/OR selector only for multi-select with 2+ values */}
                {shouldShowSelector && onLogicOperatorChange && (
                    <MultiValueLogicSelector
                        value={logicOperator}
                        onChange={onLogicOperatorChange}
                        disabled={props.disabled}
                    />
                )}
                {children}
            </Box>
        );
    });

    return (
        <StyledAutocomplete
            {...props}
            // disableClearable
            limitTags={limitTags}
            popupIcon={<CaretDownIcon />}
            clearIcon={<XIcon />}
            renderInput={renderInput}
            ListboxComponent={showLogicSelector ? CustomListbox as any : undefined}
        />
    );
};
