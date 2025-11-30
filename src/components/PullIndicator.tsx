import { Shuffle } from "@phosphor-icons/react";

interface PullIndicatorProps {
  progress: number;
  isPulling: boolean;
  isReady: boolean;
}

export function PullIndicator({
  progress,
  isPulling,
  isReady,
}: PullIndicatorProps) {
  if (!isPulling || progress < 0.1) return null;

  const rotation = progress * 180;
  const scale = 0.8 + Math.min(progress, 1) * 0.2;
  const translateY = Math.min(progress * 60, 120);

  return (
    <>
      <style>{`
        @keyframes pulse-bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-12deg); }
          75% { transform: rotate(12deg); }
        }
        .pull-ready {
          animation: pulse-bounce 0.4s ease-in-out infinite;
        }
        .pull-ready .shuffle-icon {
          animation: wiggle 0.3s ease-in-out infinite;
        }
      `}</style>
      <div
        className="fixed top-0 left-0 right-0 flex justify-center pointer-events-none z-50 print:hidden"
        style={{
          transform: `translateY(${translateY}px)`,
          opacity: Math.min(progress, 1),
        }}
      >
        <div
          className={`
            flex items-center justify-center
            w-12 h-12 rounded-full
            bg-background border-2 shadow-lg
            transition-colors duration-150
            ${isReady ? "border-primary bg-primary/10 pull-ready" : "border-muted-foreground/30"}
          `}
          style={{
            transform: isReady ? undefined : `rotate(${rotation}deg) scale(${scale})`,
          }}
        >
          <Shuffle
            size={20}
            className={`shuffle-icon transition-colors duration-150 ${
              isReady ? "text-primary" : "text-muted-foreground"
            }`}
          />
        </div>
      </div>
    </>
  );
}
