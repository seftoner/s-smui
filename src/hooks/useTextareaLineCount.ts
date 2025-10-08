import * as React from "react";

/**
 * useTextareaLineCount
 * Tracks how many visible lines a textarea currently has.
 * Returns a ref to attach to the textarea and the current line count.
 */
/* export function useTextareaLineCount<T extends HTMLTextAreaElement>() {
  const ref = React.useRef<T | null>(null);
  const [lineCount, setLineCount] = React.useState(1);

  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const computeLineCount = () => {
      const style = window.getComputedStyle(el);
      const lineHeight = parseFloat(style.lineHeight);
      if (!lineHeight) return;

      // scrollHeight includes padding; remove it
      const paddingTop = parseFloat(style.paddingTop);
      const paddingBottom = parseFloat(style.paddingBottom);
      const contentHeight = el.scrollHeight - paddingTop - paddingBottom;

      const count = Math.max(1, Math.round(contentHeight / lineHeight));
      setLineCount(count);
    };

    computeLineCount();

    const observer = new ResizeObserver(computeLineCount);
    observer.observe(el);

    el.addEventListener("input", computeLineCount);
    el.addEventListener("change", computeLineCount);

    return () => {
      observer.disconnect();
      el.removeEventListener("input", computeLineCount);
      el.removeEventListener("change", computeLineCount);
    };
  }, []);

  return { ref, lineCount };
} */

  //Cloude
  /* export function useTextareaLineCount<T extends HTMLTextAreaElement>() {
    const [lineCount, setLineCount] = React.useState(1);
    const ref = React.useRef<T | null>(null);
    const rafId = React.useRef<number | null>(null);

    React.useLayoutEffect(() => {
        const el = ref.current;
        if (!el) return;

        const getLineHeight = (): number => {
            const lh = window.getComputedStyle(el).lineHeight;
            const n = parseFloat(lh);
            return Number.isFinite(n) ? n : 0;
        };

        const measure = () => {
            const lh = getLineHeight();
            if (!lh) {
                // Line height is not numeric (e.g., "normal")
                // Fall back to a simple calculation
                setLineCount(1);
                return;
            }

            // If textarea is empty, always return 1 line
            if (!el.value) {
                setLineCount(prev => prev !== 1 ? 1 : prev);
                return;
            }

            // Create a temporary div to measure actual content height
            const style = window.getComputedStyle(el);
            const tempDiv = document.createElement('div');
            
            // Copy all relevant styles
            tempDiv.style.position = 'absolute';
            tempDiv.style.visibility = 'hidden';
            tempDiv.style.pointerEvents = 'none';
            tempDiv.style.width = `${el.clientWidth}px`;
            tempDiv.style.fontFamily = style.fontFamily;
            tempDiv.style.fontSize = style.fontSize;
            tempDiv.style.fontWeight = style.fontWeight;
            tempDiv.style.lineHeight = style.lineHeight;
            tempDiv.style.letterSpacing = style.letterSpacing;
            tempDiv.style.wordBreak = style.wordBreak;
            tempDiv.style.wordWrap = style.wordWrap;
            tempDiv.style.whiteSpace = 'pre-wrap';
            tempDiv.style.overflowWrap = style.overflowWrap;
            
            // Set the content
            tempDiv.textContent = el.value;
            
            // Measure
            document.body.appendChild(tempDiv);
            const contentHeight = tempDiv.offsetHeight;
            document.body.removeChild(tempDiv);
            
            // Calculate line count
            const next = Math.max(1, Math.round(contentHeight / lh));
            setLineCount(prev => prev !== next ? next : prev);
        };

        const debouncedMeasure = () => {
            if (rafId.current != null) {
                cancelAnimationFrame(rafId.current);
            }
            rafId.current = requestAnimationFrame(measure);
        };

        // Observe size changes (e.g., window resize, width changes)
        const ro = new ResizeObserver(debouncedMeasure);
        ro.observe(el);

        // Listen to input changes (typing, deleting, pasting)
        el.addEventListener('input', debouncedMeasure);

        // Initial measurement
        const timeoutId = setTimeout(measure, 0);

        return () => {
            clearTimeout(timeoutId);
            if (rafId.current != null) {
                cancelAnimationFrame(rafId.current);
            }
            ro.disconnect();
            el.removeEventListener('input', debouncedMeasure);
        };
    }, []);

    return { ref, lineCount };
} */

    //GPT-5


export function useTextareaLineCount<T extends HTMLTextAreaElement>() {
  const ref = React.useRef<T | null>(null);
  const [lineCount, setLineCount] = React.useState(1);

  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const computeLineCount = () => {
      const style = window.getComputedStyle(el);
      const lineHeight = parseFloat(style.lineHeight);
      if (!lineHeight) return;

      const paddingTop = parseFloat(style.paddingTop);
      const paddingBottom = parseFloat(style.paddingBottom);
      const contentHeight = el.scrollHeight - paddingTop - paddingBottom;

      const count = Math.max(1, Math.round(contentHeight / lineHeight));
      setLineCount(count);
    };

    computeLineCount();

    const resizeObserver = new ResizeObserver(computeLineCount);
    resizeObserver.observe(el);

    el.addEventListener("input", computeLineCount);

    return () => {
      resizeObserver.disconnect();
      el.removeEventListener("input", computeLineCount);
    };
  }, []);

  return { ref, lineCount };
}