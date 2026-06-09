import { Share } from "@phosphor-icons/react";
import confetti from "canvas-confetti";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { Drink } from "../types/drinks";
import { scaleAmount } from "../utils/scaleAmount";
import { getConfettiColors } from "../utils/confettiColors";
import { getSimilarDrinks } from "../utils/drinkSimilarity";
import { slugify } from "../utils/drinkSlug";
import {
  calculateDrinkUnits,
  formatDrinkStrength,
  isNonAlcoholic,
} from "../utils/drinkStrength";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

const SWIPE_THRESHOLD = 50;

const DrinkListing = ({
  drink,
  open,
  onOpenChange,
  onIngredientClick,
  onNoteClick,
  onDrinkClick,
  onNavigate,
  allDrinks,
  hasPrev,
  hasNext,
  onCloseAutoFocus,
}: {
  drink: Drink;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onIngredientClick?: (ingredientName: string) => void;
  onNoteClick?: (note: string) => void;
  onDrinkClick?: (drinkTitle: string) => void;
  onNavigate?: (direction: "prev" | "next") => void;
  allDrinks?: Drink[];
  hasPrev?: boolean;
  hasNext?: boolean;
  onCloseAutoFocus?: (e: Event) => void;
}) => {
  const [showDUs, setShowDUs] = useState(false);
  const [batchFactor, setBatchFactor] = useState(1);
  const [batchOpen, setBatchOpen] = useState(false);
  const isTouchDevice = useRef(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const nonAlcoholic = isNonAlcoholic(drink);
  const strength = formatDrinkStrength(drink);
  const dus = calculateDrinkUnits(drink);
  const similarDrinks = useMemo(
    () => (allDrinks ? getSimilarDrinks(drink, allDrinks, 3) : []),
    [drink, allDrinks]
  );

  // Batch size is per-opening: reset whenever this drink's dialog opens
  useEffect(() => {
    if (open) {
      setBatchFactor(1);
      setBatchOpen(false);
    }
  }, [open]);

  return (
    <li className="list-none group">
      <Dialog {...(open !== undefined ? { open, onOpenChange } : {})}>
        <DialogTrigger className="text-left">
          <h2 className="m-0 text-xl font-bold tracking-wide">
            {drink.title}
            {nonAlcoholic && (
              <span className="ml-2 align-middle text-xs font-normal tracking-wider border border-border rounded-full px-2 py-0.5 text-muted-foreground">
                NA
              </span>
            )}
          </h2>
          {drink.notes && drink.notes.length > 0 && (
            <p className="mt-1 mb-0 text-sm font-light tracking-wide" style={{ color: "hsl(var(--notes-foreground))" }}>
              {[...drink.notes].sort().slice(0, 3).join(" · ")}
            </p>
          )}
          <p className="mt-1 mb-0 text-base text-muted-foreground font-light font-sans group-hover:text-foreground">
            {drink.ingredients.map((d) => d.ingredient.name).join(", ")}
          </p>
        </DialogTrigger>
        <DialogContent
          onCloseAutoFocus={onCloseAutoFocus}
          onTouchStart={(e) => {
            const touch = e.touches[0];
            if (!touch) return;
            // Don't track if starting on a horizontally scrollable element
            const target = e.target as HTMLElement;
            if (target.closest(".scrollbar-hide")) return;
            touchStartX.current = touch.clientX;
            touchStartY.current = touch.clientY;
          }}
          onTouchEnd={(e) => {
            const touch = e.changedTouches[0];
            if (!touch || touchStartX.current === null || touchStartY.current === null) return;
            const deltaX = touch.clientX - touchStartX.current;
            const deltaY = touch.clientY - touchStartY.current;
            // Only trigger if horizontal swipe is dominant
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > SWIPE_THRESHOLD) {
              if (deltaX > 0 && hasPrev) {
                onNavigate?.("prev");
              } else if (deltaX < 0 && hasNext) {
                onNavigate?.("next");
              }
            }
            touchStartX.current = null;
            touchStartY.current = null;
          }}
        >
          <button
            onClick={async () => {
              const url = `https://thenightlatch.com/${slugify(drink.title)}`;
              const text = `Try a ${drink.title} at The Night Latch!`;

              // Fire confetti first
              if (drink.color) {
                confetti({
                  particleCount: 100,
                  spread: 120,
                  origin: { y: 0.6 },
                  ticks: 60,
                  colors: getConfettiColors(drink.color),
                });
              }

              // Try native share sheet (mobile)
              if (navigator.share) {
                try {
                  await navigator.share({ title: drink.title, text, url });
                } catch {
                  // User cancelled or share failed - silently ignore
                }
              } else {
                // Fallback to clipboard copy (desktop)
                navigator.clipboard.writeText(`${text} ${url}`);
              }
            }}
            className="absolute right-12 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            aria-label="Share drink"
          >
            <Share className="h-4 w-4" />
          </button>
          <DialogHeader>
            <DialogTitle>{drink.title}</DialogTitle>
            <DialogDescription asChild>
              <div>
                <div className="mt-1 mb-3 -mx-6 px-6 flex gap-2 overflow-x-auto scrollbar-hide">
                    {batchOpen ? (
                      <div className="shrink-0 flex items-center gap-0.5 rounded-full bg-secondary p-0.5">
                        {[1, 2, 3, 4].map((factor) => (
                          <button
                            key={factor}
                            type="button"
                            onClick={() => {
                              setBatchFactor(factor);
                              setBatchOpen(false);
                            }}
                            className={cn(
                              "px-2 py-0.5 text-sm rounded-full transition-colors",
                              factor === batchFactor
                                ? "bg-foreground text-background"
                                : "text-secondary-foreground hover:bg-secondary-foreground/10"
                            )}
                          >
                            {factor}×
                          </button>
                        ))}
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setBatchOpen(true)}
                        aria-label="Batch size"
                        className={cn(
                          "shrink-0 text-sm px-3 py-1 rounded-full transition-colors",
                          batchFactor > 1
                            ? "bg-foreground text-background"
                            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                        )}
                      >
                        {batchFactor}×
                      </button>
                    )}
                    {nonAlcoholic ? (
                      <span className="shrink-0 text-sm px-3 py-1 rounded-full bg-secondary text-secondary-foreground select-none">
                        Non-Alcoholic
                      </span>
                    ) : (
                      strength && (
                        <span
                          className="shrink-0 text-sm px-3 py-1 rounded-full bg-secondary text-secondary-foreground cursor-pointer select-none"
                          onTouchStart={() => {
                            isTouchDevice.current = true;
                          }}
                          onMouseEnter={() =>
                            !isTouchDevice.current && setShowDUs(true)
                          }
                          onMouseLeave={() =>
                            !isTouchDevice.current && setShowDUs(false)
                          }
                          onClick={() => setShowDUs((prev) => !prev)}
                        >
                          {showDUs && dus ? `${Math.round(dus)} DUs` : strength}
                        </span>
                      )
                    )}
                    {drink.notes?.map((note) => (
                      <button
                        key={note}
                        type="button"
                        onClick={() => onNoteClick?.(note)}
                        className="shrink-0 text-sm px-3 py-1 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                      >
                        {note}
                      </button>
                    ))}
                </div>
                <ul className="list-none text-foreground font-sans p-0">
                  {drink.ingredients.map((d) => (
                    <li key={d.ingredient.name}>
                      <button
                        type="button"
                        onClick={() => onIngredientClick?.(d.ingredient.name)}
                        className="hover:text-primary hover:underline underline-offset-2 transition-colors text-left"
                      >
                        {d.ingredient.name}
                      </button>
                      {d.amount && (
                        <span className="text-muted-foreground">
                          {" "}
                          • {scaleAmount(d.amount, batchFactor)}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
                <p className="mt-4">{drink.instructions}</p>
                {drink.source && (
                  <p className="mt-3 text-sm text-muted-foreground italic">
                    {[drink.source.creator, drink.source.bar, drink.source.year]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                )}
                {similarDrinks.length > 0 && (
                  <div className="mt-4 -mx-6 px-6 flex items-center gap-2 overflow-x-auto scrollbar-hide">
                    <span className="shrink-0 text-sm text-muted-foreground">Also try:</span>
                    {similarDrinks.map((d) => (
                      <button
                        key={d.title}
                        type="button"
                        onClick={() => onDrinkClick?.(d.title)}
                        className="shrink-0 text-sm px-3 py-1 rounded-full border border-border text-muted-foreground hover:bg-secondary/50 transition-colors"
                      >
                        {d.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </li>
  );
};

export default DrinkListing;
