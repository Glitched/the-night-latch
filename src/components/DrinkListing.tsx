import type { Drink } from "../types/drinks";
import {
  calculateDrinkUnits,
  formatDrinkStrength,
} from "../utils/drinkStrength";
import { useRef, useState } from "react";
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
}: {
  drink: Drink;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) => {
  const [showDUs, setShowDUs] = useState(false);
  const isTouchDevice = useRef(false);
  const strength = formatDrinkStrength(drink);
  const dus = calculateDrinkUnits(drink);

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
          <DialogHeader>
            <DialogTitle>{drink.title}</DialogTitle>
            <DialogDescription>
              {strength && (
                <p className="mb-2 text-muted-foreground font-light flex items-center gap-1">
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
                </p>
              )}
              <ul className="list-none text-foreground font-sans p-0">
                {drink.ingredients.map((d) => (
                  <li key={d.ingredient.name}>
                    {d.ingredient.name}
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
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </li>
  );
};

export default DrinkListing;
