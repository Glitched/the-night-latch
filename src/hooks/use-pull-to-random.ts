import { useEffect, useRef, useState, useCallback } from "react";

interface PullToRandomOptions {
  threshold?: number; // Pull distance needed to trigger (px)
  resistance?: number; // How much to resist pulling (higher = harder to pull)
}

export function usePullToRandom(
  onTrigger: () => void,
  options: PullToRandomOptions = {}
) {
  const { threshold = 80, resistance = 2.5 } = options;

  const [pullDistance, setPullDistance] = useState(0);
  const [isPulling, setIsPulling] = useState(false);

  const startY = useRef<number | null>(null);
  const pullDistanceRef = useRef(0);

  const isAtTop = useCallback(() => {
    return window.scrollY <= 0;
  }, []);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (isAtTop() && e.touches[0]) {
        startY.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (startY.current === null || !e.touches[0]) return;

      // Only track if we started at the top
      const currentY = e.touches[0].clientY;
      const diff = currentY - startY.current;

      // Only track downward pulls
      if (diff > 0 && isAtTop()) {
        const resistedDiff = diff / resistance;
        pullDistanceRef.current = resistedDiff;
        setPullDistance(resistedDiff);
        setIsPulling(true);
        // Don't prevent default - let native overscroll happen
      } else if (diff <= 0) {
        // User is scrolling up or not pulling
        pullDistanceRef.current = 0;
        setPullDistance(0);
        setIsPulling(false);
      }
    };

    const handleTouchEnd = () => {
      if (pullDistanceRef.current >= threshold) {
        onTrigger();
      }

      startY.current = null;
      pullDistanceRef.current = 0;
      setPullDistance(0);
      setIsPulling(false);
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [onTrigger, threshold, resistance, isAtTop]);

  const progress = pullDistance / threshold; // No cap - can keep pulling
  const isReady = pullDistance >= threshold;

  return { pullDistance, progress, isPulling, isReady };
}
