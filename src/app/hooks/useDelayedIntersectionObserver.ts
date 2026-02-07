import { useState, useEffect, useRef, useCallback } from "react";

interface UseDelayedIntersectionObserverOptions {
  rootMargin?: string;
  threshold?: number | number[];
  delay?: number;
  triggerOnce?: boolean;
}

/**
 * Custom hook for delayed intersection observation with advanced options.
 * Similar to useInView but with customizable delay and enhanced control.
 *
 * Performance notes:
 * - The observer is only recreated when configuration options change, NOT when
 *   inView state changes (which was causing an observer teardown/rebuild loop).
 * - Uses a ref to track the frozen state for triggerOnce without re-running the effect.
 * - Delay timers are properly cleaned up on unmount or when the element leaves the viewport.
 *
 * @param options Configuration options for intersection observer
 * @returns Object with ref setter, inView state, and entry data
 */
function useDelayedIntersectionObserver<T extends Element>({
  rootMargin = "0px",
  threshold = 0,
  delay = 0,
  triggerOnce = false,
}: UseDelayedIntersectionObserverOptions = {}) {
  const [ref, setRef] = useState<T | null>(null);
  const [inView, setInView] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const frozenRef = useRef(false);
  const delayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Stable ref callback to avoid unnecessary re-renders
  const setRefCallback = useCallback((node: T | null) => {
    setRef(node);
  }, []);

  useEffect(() => {
    if (!ref) return;

    // If triggerOnce already fired, don't observe again
    if (frozenRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [observerEntry] = entries;
        setEntry(observerEntry);

        if (frozenRef.current) return;

        if (observerEntry.isIntersecting) {
          // Clear any pending delay timer from a previous intersection
          if (delayTimerRef.current) {
            clearTimeout(delayTimerRef.current);
            delayTimerRef.current = null;
          }

          if (delay > 0) {
            delayTimerRef.current = setTimeout(() => {
              setInView(true);
              if (triggerOnce) {
                frozenRef.current = true;
                observer.disconnect();
              }
              delayTimerRef.current = null;
            }, delay);
          } else {
            setInView(true);
            if (triggerOnce) {
              frozenRef.current = true;
              observer.disconnect();
            }
          }
        } else {
          // Clear delay timer if element leaves viewport before delay fires
          if (delayTimerRef.current) {
            clearTimeout(delayTimerRef.current);
            delayTimerRef.current = null;
          }
          if (!triggerOnce) {
            setInView(false);
          }
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(ref);
    return () => {
      observer.disconnect();
      if (delayTimerRef.current) {
        clearTimeout(delayTimerRef.current);
        delayTimerRef.current = null;
      }
    };
  }, [ref, rootMargin, threshold, delay, triggerOnce]);

  return { ref: setRefCallback, inView, entry };
}

export default useDelayedIntersectionObserver;
