import { useEffect, useRef, useCallback } from "react";

interface ShakeOptions {
  threshold?: number; // Acceleration threshold to count as movement
  timeout?: number; // Time window to detect shakes (ms)
  shakeCount?: number; // Number of shakes needed to trigger
  cooldown?: number; // Cooldown between triggers (ms)
}

export function useShakeDetection(
  onShake: () => void,
  options: ShakeOptions = {}
) {
  const {
    threshold = 15,
    timeout = 1000,
    shakeCount = 3,
    cooldown = 1000,
  } = options;

  const shakeTimestamps = useRef<number[]>([]);
  const lastTrigger = useRef<number>(0);
  const permissionGranted = useRef<boolean | null>(null);

  const requestPermission = useCallback(async () => {
    // iOS 13+ requires permission request
    if (
      typeof DeviceMotionEvent !== "undefined" &&
      "requestPermission" in DeviceMotionEvent &&
      typeof (DeviceMotionEvent as any).requestPermission === "function"
    ) {
      try {
        const permission = await (DeviceMotionEvent as any).requestPermission();
        permissionGranted.current = permission === "granted";
        return permission === "granted";
      } catch {
        permissionGranted.current = false;
        return false;
      }
    }
    // Non-iOS or older iOS - permission not needed
    permissionGranted.current = true;
    return true;
  }, []);

  useEffect(() => {
    let mounted = true;

    const handleMotion = (event: DeviceMotionEvent) => {
      if (!mounted) return;

      const acceleration = event.accelerationIncludingGravity;
      if (!acceleration) return;

      const { x, y, z } = acceleration;
      if (x === null || y === null || z === null) return;

      // Calculate total acceleration magnitude (minus gravity baseline ~9.8)
      const totalAcceleration = Math.sqrt(x * x + y * y + z * z) - 9.8;

      if (totalAcceleration > threshold) {
        const now = Date.now();

        // Add timestamp and filter old ones
        shakeTimestamps.current = [
          ...shakeTimestamps.current.filter((t) => now - t < timeout),
          now,
        ];

        // Check if we have enough shakes and cooldown has passed
        if (
          shakeTimestamps.current.length >= shakeCount &&
          now - lastTrigger.current > cooldown
        ) {
          lastTrigger.current = now;
          shakeTimestamps.current = [];
          onShake();
        }
      }
    };

    const init = async () => {
      const hasPermission = await requestPermission();
      if (hasPermission && mounted) {
        window.addEventListener("devicemotion", handleMotion);
      }
    };

    init();

    return () => {
      mounted = false;
      window.removeEventListener("devicemotion", handleMotion);
    };
  }, [onShake, threshold, timeout, shakeCount, cooldown, requestPermission]);

  return { requestPermission };
}
