import { useState, useEffect } from 'react';

/**
 * Shared hook for responsive breakpoint detection using the `matchMedia` API.
 *
 * Performance advantages over manual `resize` event listeners:
 * - Uses the browser's native `matchMedia` which is event-driven (fires only
 *   when the media query result actually changes, not on every resize pixel).
 * - A single hook replaces 4+ separate `resize` listeners that were each
 *   independently debouncing and calling setState.
 * - No debounce timer overhead since matchMedia already coalesces changes.
 *
 * @param query - A CSS media query string, e.g. '(max-width: 768px)'
 * @returns Whether the media query currently matches
 */
const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);

    // Sync state in case it changed between render and effect
    setMatches(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
};

export default useMediaQuery;
