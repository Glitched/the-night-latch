import { Share } from "@phosphor-icons/react";
import confetti from "canvas-confetti";
import { useMemo, useRef, useState } from "react";
import type { Drink } from "../types/drinks";
import { getConfettiColors } from "../utils/confettiColors";
import { getSimilarDrinks } from "../utils/drinkSimilarity";
import {
  calculateDrinkUnits,
  formatDrinkStrength,
} from "../utils/drinkStrength";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

const DrinkListing = ({
  drink,
  open,
  onOpenChange,
  onIngredientClick,
  onDrinkClick,
  allDrinks,
}: {
  drink: Drink;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onIngredientClick?: (ingredientName: string) => void;
  onDrinkClick?: (drinkTitle: string) => void;
  allDrinks?: Drink[];
}) => {
  const [showDUs, setShowDUs] = useState(false);
  const isTouchDevice = useRef(false);
  const strength = formatDrinkStrength(drink);
  const dus = calculateDrinkUnits(drink);
  const similarDrinks = useMemo(
    () => (allDrinks ? getSimilarDrinks(drink, allDrinks, 3) : []),
    [drink, allDrinks]
  );

  return (
    <li className="list-none group">
      <Dialog {...(open !== undefined ? { open, onOpenChange } : {})}>
        <DialogTrigger className="text-left">
          <h2 className="m-0 text-xl font-bold tracking-wide">{drink.title}</h2>
          {drink.notes && drink.notes.length > 0 && (
            <p className="mt-1 mb-0 text-sm text-gray-400 font-light tracking-wide">
              {drink.notes.slice(0, 3).join(" · ")}
            </p>
          )}
          <p className="mt-1 mb-0 text-base text-muted-foreground font-light font-sans group-hover:text-foreground">
            {drink.ingredients.map((d) => d.ingredient.name).join(", ")}
          </p>
        </DialogTrigger>
        <DialogContent>
          <button
            onClick={() => {
              const slug = drink.title.toLowerCase().replace(/\s+/g, "-");
              const url = `https://thenightlatch.com/${slug}`;
              const text = `Try a ${drink.title} at The Night Latch! ${url}`;
              navigator.clipboard.writeText(text);
              if (drink.color) {
                confetti({
                  particleCount: 100,
                  spread: 120,
                  origin: { y: 0.6 },
                  ticks: 60,
                  colors: getConfettiColors(drink.color),
                });
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
                {strength && (
                  <div className="mb-2 text-muted-foreground font-light flex items-center gap-1">
                    <span
                      className="flex items-center gap-1 cursor-pointer select-none"
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
                    {drink.notes && drink.notes.length > 0 && (
                      <span> • {drink.notes.join(" • ")}</span>
                    )}
                  </div>
                )}
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
                          • {d.amount}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
                <p className="mt-4">{drink.instructions}</p>
                {similarDrinks.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-2">Also try:</p>
                    <div className="flex flex-wrap gap-2">
                      {similarDrinks.map((d) => (
                        <button
                          key={d.title}
                          type="button"
                          onClick={() => onDrinkClick?.(d.title)}
                          className="text-sm px-3 py-1 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                        >
                          {d.title}
                        </button>
                      ))}
                    </div>
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
