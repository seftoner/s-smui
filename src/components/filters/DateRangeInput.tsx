import React, { useState, useRef } from 'react';
import {
    Box,
    Popper,
    Paper,
    Typography,
    Button,
    IconButton,
    styled,
    Divider,
} from '@mui/material';
import { CalendarBlank, CaretLeft, CaretRight } from '@phosphor-icons/react';
import type { DateRangeValue } from './types';

const StyledPopper = styled(Popper)(({ theme }) => ({
    zIndex: theme.zIndex.modal,
}));

const MenuPaper = styled(Paper)(({ theme }) => ({
    marginTop: theme.spacing(0.5),
    borderRadius: 12,
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows[4],
    width: 400,
    padding: theme.spacing(2),
}));

const DateDisplay = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    padding: theme.spacing(0, 2),
    minHeight: 44,
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
}));

const DateField = styled(Box)(({ theme }) => ({
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
}));

const CalendarHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2),
}));

const DayCell = styled(Box)<{ selected?: boolean; isToday?: boolean; disabled?: boolean }>(
    ({ theme, selected, isToday, disabled }) => ({
        aspectRatio: '1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontSize: '0.875rem',
        fontWeight: selected ? 600 : 400,
        color: disabled
            ? theme.palette.text.disabled
            : selected
                ? theme.palette.primary.contrastText
                : theme.palette.text.primary,
        backgroundColor: selected ? theme.palette.primary.main : 'transparent',
        border: isToday && !selected ? `1px solid ${theme.palette.primary.main}` : 'none',
        '&:hover': !disabled && !selected
            ? {
                backgroundColor: theme.palette.action.hover,
            }
            : {},
    })
);

const QuickSelectButton = styled(Button)(({ theme }) => ({
    justifyContent: 'space-between',
    textTransform: 'none',
    padding: theme.spacing(1, 2),
    color: theme.palette.text.primary,
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
}));

interface DateRangeInputProps {
    value: DateRangeValue;
    placeholder?: string;
    disabled?: boolean;
    minDate?: Date;
    maxDate?: Date;
    onChange: (value: DateRangeValue) => void;
}

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

interface QuickOption {
    label: string;
    date: Date;
}

const getQuickOptions = (): QuickOption[] => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);

    const twoWeeks = new Date(today);
    twoWeeks.setDate(twoWeeks.getDate() + 14);

    const fourWeeks = new Date(today);
    fourWeeks.setDate(fourWeeks.getDate() + 28);

    return [
        { label: 'Today', date: today },
        { label: 'Tomorrow', date: tomorrow },
        { label: 'Next week', date: nextWeek },
        { label: '2 weeks', date: twoWeeks },
        { label: '4 weeks', date: fourWeeks },
    ];
};

/**
 * DateRangeInput - Date range picker with calendar and quick select options
 * Based on the provided design mockup
 */
export const DateRangeInput: React.FC<DateRangeInputProps> = ({
    value,
    placeholder = 'Select date range',
    onChange,
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [viewDate, setViewDate] = useState(new Date());
    const [selectingField, setSelectingField] = useState<'from' | 'to'>('from');
    const anchorRef = useRef<HTMLDivElement>(null);

    const formatDate = (date: Date | null) => {
        if (!date) return '';
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
        });
    };

    const handleOpen = () => {
        setIsFocused(true);
        setSelectingField('from');
    };

    const handleClose = () => {
        setIsFocused(false);
    };

    const handleDateClick = (date: Date) => {
        if (selectingField === 'from') {
            onChange({ ...value, from: date });
            setSelectingField('to');
        } else {
            onChange({ ...value, to: date });
            handleClose();
        }
    };

    const handleQuickSelect = (date: Date, field: 'from' | 'to') => {
        onChange({ ...value, [field]: date });
    };

    const handlePrevMonth = () => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1));
    };

    const handleCancel = () => {
        handleClose();
    };

    const handleOk = () => {
        handleClose();
    };

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days: (Date | null)[] = [];

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }

        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(new Date(year, month, day));
        }

        return days;
    };

    const isToday = (date: Date) => {
        const today = new Date();
        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
    };

    const isSelected = (date: Date) => {
        return (
            (value.from &&
                date.getDate() === value.from.getDate() &&
                date.getMonth() === value.from.getMonth() &&
                date.getFullYear() === value.from.getFullYear()) ||
            (value.to &&
                date.getDate() === value.to.getDate() &&
                date.getMonth() === value.to.getMonth() &&
                date.getFullYear() === value.to.getFullYear())
        );
    };

    const days = getDaysInMonth(viewDate);
    const quickOptions = getQuickOptions();

    return (
        <Box ref={anchorRef} sx={{ position: 'relative', flex: 1 }}>
            <DateDisplay onClick={handleOpen}>
                <DateField>
                    <Typography variant="caption" color="text.secondary">
                        From
                    </Typography>
                    <Typography variant="body2">
                        {formatDate(value.from) || placeholder}
                    </Typography>
                </DateField>
                <CalendarBlank size={20} />
                <DateField>
                    <Typography variant="caption" color="text.secondary">
                        To
                    </Typography>
                    <Typography variant="body2">
                        {formatDate(value.to) || placeholder}
                    </Typography>
                </DateField>
                <CalendarBlank size={20} />
            </DateDisplay>

            <StyledPopper open={isFocused} anchorEl={anchorRef.current} placement="bottom-start">
                <MenuPaper>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        {/* Left side - Calendar */}
                        <Box sx={{ flex: '1 1 70%' }}>
                            <CalendarHeader>
                                <IconButton size="small" onClick={handlePrevMonth}>
                                    <CaretLeft size={20} />
                                </IconButton>
                                <Typography variant="subtitle2">
                                    {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
                                </Typography>
                                <IconButton size="small" onClick={handleNextMonth}>
                                    <CaretRight size={20} />
                                </IconButton>
                            </CalendarHeader>

                            {/* Weekday headers */}
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(7, 1fr)',
                                    gap: 0.5,
                                    mb: 1,
                                }}
                            >
                                {WEEKDAYS.map((day) => (
                                    <Box
                                        key={day}
                                        sx={{
                                            textAlign: 'center',
                                            fontSize: '0.75rem',
                                            color: 'text.secondary',
                                            fontWeight: 500,
                                        }}
                                    >
                                        {day}
                                    </Box>
                                ))}
                            </Box>

                            {/* Calendar days */}
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(7, 1fr)',
                                    gap: 0.5,
                                }}
                            >
                                {days.map((day, index) => (
                                    <Box key={index}>
                                        {day ? (
                                            <DayCell
                                                onClick={() => handleDateClick(day)}
                                                selected={isSelected(day) || undefined}
                                                isToday={isToday(day)}
                                            >
                                                {day.getDate()}
                                            </DayCell>
                                        ) : (
                                            <Box sx={{ aspectRatio: '1' }} />
                                        )}
                                    </Box>
                                ))}
                            </Box>
                        </Box>

                        {/* Right side - Quick select */}
                        <Box sx={{ flex: '0 0 30%', display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
                                {selectingField === 'from' ? 'From' : 'To'}
                            </Typography>
                            {quickOptions.map((option) => (
                                <QuickSelectButton
                                    key={option.label}
                                    onClick={() => handleQuickSelect(option.date, selectingField)}
                                    fullWidth
                                    size="small"
                                >
                                    <span>{option.label}</span>
                                    <Typography variant="caption" color="text.secondary">
                                        {option.date.getDate()} {MONTHS[option.date.getMonth()].slice(0, 3)}
                                    </Typography>
                                </QuickSelectButton>
                            ))}
                        </Box>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* Action buttons */}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                        <Button onClick={handleCancel}>Cancel</Button>
                        <Button onClick={handleOk} variant="contained">
                            Ok
                        </Button>
                    </Box>
                </MenuPaper>
            </StyledPopper>
        </Box>
    );
};
