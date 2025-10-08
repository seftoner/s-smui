import * as React from "react";

/* export function useTextareaIsMultiline<T extends HTMLTextAreaElement>(threshold = 4) {
  const ref = React.useRef<T | null>(null);
  const baseHeightRef = React.useRef<number | null>(null);
  const [isMultiline, setIsMultiline] = React.useState(false);

  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = (height: number) => {
      baseHeightRef.current = baseHeightRef.current == null
        ? height
        : Math.min(baseHeightRef.current, height);
      const base = baseHeightRef.current ?? height;
      setIsMultiline(height - base > threshold);
    };

    const observer = new ResizeObserver(([entry]) => {
      if (entry) update(entry.contentRect.height);
    });

    update(el.getBoundingClientRect().height);
    observer.observe(el);

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isMultiline };
}
 */
// src/hooks/useTextareaIsMultiline.ts
export function useTextareaIsMultiline<T extends HTMLTextAreaElement>(
  threshold = 4,
  releaseThreshold = 12
) {
  const ref = React.useRef<T | null>(null);
  const baseWidthRef = React.useRef<number | null>(null);
  const baseHeightRef = React.useRef<number | null>(null);
  const rafRef = React.useRef<number | null>(null);
  const [isMultiline, setIsMultiline] = React.useState(false);

  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const resetBaseline = () => {
      baseWidthRef.current = null;
      baseHeightRef.current = null;
    };

    const measure = () => {
      if (!el) return;

      // Treat empty value as a fresh single-line state
      if (!el.value) {
        resetBaseline();
        setIsMultiline(false);
        return;
      }

      const { scrollHeight, scrollWidth, clientWidth } = el;

      if (!isMultiline || baseWidthRef.current == null) {
        baseWidthRef.current =
          baseWidthRef.current == null
            ? clientWidth
            : Math.min(baseWidthRef.current, clientWidth);
      }

      if (!isMultiline || baseHeightRef.current == null) {
        baseHeightRef.current =
          baseHeightRef.current == null
            ? scrollHeight
            : Math.min(baseHeightRef.current, scrollHeight);
      }

      const baseWidth = baseWidthRef.current ?? clientWidth;
      const baseHeight = baseHeightRef.current ?? scrollHeight;
      const overflowWidth = scrollWidth - baseWidth;
      const overflowHeight = scrollHeight - baseHeight;

      const shouldStack =
        overflowWidth > threshold || overflowHeight > threshold;
      const shouldRelease =
        overflowWidth < -releaseThreshold &&
        overflowHeight < releaseThreshold;

      setIsMultiline((prev) =>
        shouldStack ? true : shouldRelease ? false : prev
      );

      if (shouldRelease) {
        baseWidthRef.current = clientWidth;
        baseHeightRef.current = scrollHeight;
      }
    };

    const scheduleMeasure = () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(measure);
    };

    measure();

    const observer = new ResizeObserver(scheduleMeasure);
    observer.observe(el);
    el.addEventListener("input", scheduleMeasure);

    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      el.removeEventListener("input", scheduleMeasure);
    };
  }, [isMultiline, threshold, releaseThreshold]);

  return { ref, isMultiline };
}
