import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * Custom hook to detect if a scrollable container is overflowing
 * @returns {Object} Object containing ref, isOverflowing state, and evaluateOverflow function
 */
export const useOverflowDetection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isOverflowing, setIsOverflowing] = useState(false);

    const evaluateOverflow = useCallback(() => {
        const container = containerRef.current;
        if (!container) return false;

        const shouldOverflow = container.scrollHeight > container.clientHeight;
        setIsOverflowing(shouldOverflow);
        return shouldOverflow;
    }, []);

    // Automatically evaluate overflow when container size might change
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Create ResizeObserver to watch for size changes
        const resizeObserver = new ResizeObserver(() => {
            evaluateOverflow();
        });

        resizeObserver.observe(container);

        return () => {
            resizeObserver.disconnect();
        };
    }, [evaluateOverflow]);

    return {
        containerRef,
        isOverflowing,
        evaluateOverflow,
    };
};