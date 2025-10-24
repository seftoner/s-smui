import * as React from 'react';
import { styled, Chip, Icon, InputBase, IconButton } from '@mui/material';
import useAutocomplete, { type UseAutocompleteProps } from '@mui/material/useAutocomplete';
import { CaretDownIcon } from '@phosphor-icons/react';
import { autocompleteClasses } from '@mui/material/Autocomplete';

const Root = styled('div')({
    flex: 1,
    position: 'relative',
});

const InputWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: theme.spacing(0.5),
    padding: theme.spacing(1, 1),
    paddingRight: theme.spacing(4),
    border: 'none',
    minHeight: 44,
    cursor: 'text',
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
    '&.disabled': {
        cursor: 'default',
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
}));

const StyledInputBase = styled(InputBase)({
    flex: 1,
    minWidth: 30,
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

const PopupIndicator = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    right: theme.spacing(1),
    top: '50%',
    transform: 'translateY(-50%)',
    color: theme.vars.palette.action.active,
    padding: theme.spacing(0.5),
    '&.disabled': {
        color: theme.vars.palette.action.disabled,
    },
    '& svg': {
        height: '20px',
        width: '20px',
    },
}));

const Listbox = styled('ul')(({ theme }) => ({
    margin: 0,
    padding: 0,
    position: 'fixed', // Changed from absolute to fixed
    listStyle: 'none',
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
    maxHeight: 250,
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[8],
    zIndex: theme.zIndex.modal,
    minWidth: '200px',
    '& li': {
        padding: theme.spacing(1, 2),
        display: 'flex',
        cursor: 'pointer',
        '& span': {
            flexGrow: 1,
        },
    },
    "& li[aria-selected='true']": {
        backgroundColor: theme.palette.action.selected,
        fontWeight: 600,
    },
    [`& li.${autocompleteClasses.focused}`]: {
        backgroundColor: theme.palette.action.hover,
    },
}));

interface FilterAutocompleteProps<T, Multiple extends boolean | undefined>
    extends Omit<UseAutocompleteProps<T, Multiple, false, false>, 'freeSolo'> {
    placeholder?: string;
}

/**
 * Custom FilterAutocomplete component with Phosphor CaretDown icon
 * Uses useAutocomplete hook for full control over rendering
 * Supports both single and multiple selection with chips
 * Matches the styling of FilterSelect
 */
export const FilterAutocomplete = <T, Multiple extends boolean | undefined = false>({
    placeholder,
    disabled = false,
    ...autocompleteProps
}: FilterAutocompleteProps<T, Multiple>) => {
    const anchorRef = React.useRef<HTMLDivElement | null>(null);

    const {
        getRootProps,
        getInputProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
        value,
        popupOpen,
    } = useAutocomplete({
        ...autocompleteProps,
        disabled,
    });

    const inputProps = getInputProps();
    const rootProps = getRootProps();
    const isMultiple = autocompleteProps.multiple;

    // Calculate dropdown position
    const getDropdownStyle = (): React.CSSProperties => {
        if (!anchorRef.current) return {};

        const rect = anchorRef.current.getBoundingClientRect();
        return {
            top: rect.bottom + 4, // 4px gap below the input
            left: rect.left,
            width: rect.width,
        };
    };

    // Handle chip deletion for multiple selection
    const handleChipDelete = (option: T, index: number) => (event: React.MouseEvent) => {
        event.stopPropagation();
        if (autocompleteProps.onChange && isMultiple && Array.isArray(value)) {
            const newValue = value.filter((_, i) => i !== index);
            autocompleteProps.onChange(
                event as any,
                newValue as any,
                'removeOption',
                { option }
            );
        }
    };

    // Get label for an option
    const getLabel = (option: T): string => {
        if (autocompleteProps.getOptionLabel) {
            return autocompleteProps.getOptionLabel(option);
        }
        return String(option);
    };

    const showPlaceholder = !value || (Array.isArray(value) && value.length === 0);

    return (
        <Root {...rootProps}>
            <InputWrapper
                ref={anchorRef}
                className={disabled ? 'disabled' : ''}
                onClick={() => {
                    if (!disabled && inputProps.ref && 'current' in inputProps.ref) {
                        inputProps.ref.current?.focus();
                    }
                }}
            >
                {/* Render chips for multiple selection */}
                {isMultiple && Array.isArray(value) && value.map((option, index) => (
                    <StyledChip
                        key={index}
                        label={getLabel(option)}
                        size="small"
                        onDelete={!disabled ? handleChipDelete(option, index) : undefined}
                        disabled={disabled}
                    />
                ))}

                {/* Input field */}
                <StyledInputBase
                    placeholder={showPlaceholder ? placeholder : ''}
                    disabled={disabled}
                    inputProps={{
                        ...inputProps,
                        style: {
                            width: showPlaceholder ? '100%' : undefined,
                        },
                    }}
                />
            </InputWrapper>

            {/* Popup indicator */}
            <PopupIndicator
                className={disabled ? 'disabled' : ''}
                disabled={disabled}
                size="small"
                disableRipple
            >
                <Icon fontSize="medium">
                    <CaretDownIcon />
                </Icon>
            </PopupIndicator>

            {/* Options dropdown */}
            {popupOpen && groupedOptions.length > 0 ? (
                <Listbox {...getListboxProps()} style={getDropdownStyle()}>
                    {(groupedOptions as T[]).map((option, index) => {
                        const { key, ...optionProps } = getOptionProps({ option, index });
                        return (
                            <li key={key} {...optionProps}>
                                <span>{getLabel(option)}</span>
                            </li>
                        );
                    })}
                </Listbox>
            ) : null}
        </Root>
    );
};
