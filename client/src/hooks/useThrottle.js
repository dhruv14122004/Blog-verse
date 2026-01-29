import { useCallback, useRef } from 'react';

/**
 * useThrottle Hook
 * 
 * Ensures a function is called at most once every specified period.
 * Useful for button clicks, scroll events, resize events.
 * 
 * @param {Function} callback - The function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} - The throttled function
 */
const useThrottle = (callback, limit = 1000) => {
    const lastRun = useRef(Date.now());

    return useCallback((...args) => {
        const now = Date.now();

        if (now - lastRun.current >= limit) {
            callback(...args);
            lastRun.current = now;
        }
    }, [callback, limit]);
};

export default useThrottle;
