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
 * Map of operator IDs to their corresponding icons
 */
const operatorIconMap = {
    'equals': <EqualsIcon weight="bold" />,
    'not-equals': <NotEqualsIcon weight="bold" />,
    'greater-than': <GreaterThanIcon weight="bold" />,
    'less-than': <LessThanIcon weight="bold" />,
    'greater-than-or-equal': <CaretRightIcon weight="bold" />,
    'less-than-or-equal': <CaretLeftIcon weight="bold" />,
    'contains': <MagnifyingGlassIcon weight="bold" />,
    'not-contains': <ProhibitIcon weight="bold" />,
    'starts-with': <CaretRightIcon weight="bold" />,
    'ends-with': <CaretLeftIcon weight="bold" />,
    'in': <ListIcon weight="bold" />,
    'not-in': <FunnelIcon weight="bold" />,
} as const;

/**
 * Gets the appropriate icon for an operator
 * 
 * @param operatorId - The operator ID to get the icon for
 * @returns React element containing the operator icon
 */
export const getOperatorIcon = (operatorId: string) => {
    return operatorIconMap[operatorId as keyof typeof operatorIconMap] ?? <EqualsIcon weight="bold" />;
};