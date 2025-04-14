import { useState, useEffect } from "react";

interface MediaQueryOptions {
  defaultValue?: boolean;
  initializeWithValue?: boolean;
}

export function useMediaQuery(
  query: string,
  options?: MediaQueryOptions
): boolean {
  const [matches, setMatches] = useState<boolean>(
    options?.defaultValue ?? false
  );
  
  // This will be true only on the client side
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Only run media queries on the client
    if (typeof window === 'undefined') return;
    
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);

    if (options?.initializeWithValue !== false) {
      setMatches(media.matches); // Initialize with initial state
    }

    window.addEventListener("resize", listener);
    // Add listener for media query changes as well
    media.addEventListener("change", listener);

    return () => {
      window.removeEventListener("resize", listener);
      media.removeEventListener("change", listener);
    };
  }, [query, options]);

  // On server, always return the default value
  // On client after hydration, return the actual match
  return isMounted ? matches : (options?.defaultValue ?? false);
}
