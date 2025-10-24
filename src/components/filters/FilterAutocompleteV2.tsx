import { styled, Autocomplete, InputBase, Chip } from '@mui/material';
import type { AutocompleteProps, AutocompleteRenderInputParams } from '@mui/material';
import { CaretDownIcon, XIcon } from '@phosphor-icons/react';

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
}

/**
 * FilterAutocompleteV2 - Uses MUI Autocomplete with custom styling
 * Matches FilterInput design with proper chip display for multiple selection
 * Shows chips with limit indicator (+N) similar to FilterSelect
 */
export const FilterAutocompleteV2 = <
    T,
    Multiple extends boolean | undefined = false,
    DisableClearable extends boolean | undefined = false,
    FreeSolo extends boolean | undefined = false
>({
    placeholder,
    limitTags = -1,
    ...props
}: FilterAutocompleteV2Props<T, Multiple, DisableClearable, FreeSolo>) => {
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
            />
        );
    };

    return (
        <StyledAutocomplete
            {...props}
            // disableClearable
            limitTags={limitTags}
            popupIcon={<CaretDownIcon />}
            clearIcon={<XIcon />}
            renderInput={renderInput}
        />
    );
};
