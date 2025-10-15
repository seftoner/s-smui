import {
    EqualsIcon,
    NotEqualsIcon,
    GreaterThanIcon,
    LessThanIcon,
    MagnifyingGlassIcon,
    FunnelIcon,
    CaretRightIcon,
    CaretLeftIcon,
    ListIcon,
    ProhibitIcon
} from '@phosphor-icons/react';

/**
 * Gets the appropriate icon for an operator
 * 
 * @param operatorId - The operator ID to get the icon for
 * @returns React element containing the operator icon
 */
export const getOperatorIcon = (operatorId: string) => {
    switch (operatorId) {
        case 'equals':
            return <EqualsIcon weight="bold" />;
        case 'not-equals':
            return <NotEqualsIcon weight="bold" />;
        case 'greater-than':
            return <GreaterThanIcon weight="bold" />;
        case 'less-than':
            return <LessThanIcon weight="bold" />;
        case 'greater-than-or-equal':
            return <CaretRightIcon weight="bold" />;
        case 'less-than-or-equal':
            return <CaretLeftIcon weight="bold" />;
        case 'contains':
            return <MagnifyingGlassIcon weight="bold" />;
        case 'not-contains':
            return <ProhibitIcon weight="bold" />;
        case 'starts-with':
            return <CaretRightIcon weight="bold" />;
        case 'ends-with':
            return <CaretLeftIcon weight="bold" />;
        case 'in':
            return <ListIcon weight="bold" />;
        case 'not-in':
            return <FunnelIcon weight="bold" />;
        default:
            return <EqualsIcon weight="bold" />;
    }
};