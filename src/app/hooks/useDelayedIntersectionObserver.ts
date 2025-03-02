import { useState, useEffect } from "react";

interface UseDelayedIntersectionObserverOptions {
  rootMargin?: string;
  threshold?: number | number[];
  delay?: number;
  triggerOnce?: boolean;
}

/**
 * Custom hook for delayed intersection observation with advanced options
 * Similar to useInView but with customizable delay and enhanced control
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

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setEntry(entry);

        // If it's already in view and triggerOnce is true, don't change
        if (inView && triggerOnce) return;

        // If it's intersecting, apply the delay
        if (entry.isIntersecting) {
          if (delay > 0) {
            const timer = setTimeout(() => {
              setInView(true);
            }, delay);
            return () => clearTimeout(timer);
          } else {
            setInView(true);
          }
        } else {
          // If not intersecting and not triggerOnce, set to false
          if (!triggerOnce) {
            setInView(false);
          }
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, rootMargin, threshold, delay, triggerOnce, inView]);

  return { ref: setRef, inView, entry };
}

export default useDelayedIntersectionObserver;
