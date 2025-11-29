import type { Drink } from "../types/drinks";
import {
  calculateDrinkUnits,
  formatDrinkStrength,
} from "../utils/drinkStrength";
import { Wine } from "@phosphor-icons/react";
import { useState } from "react";
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
  const [tapped, setTapped] = useState(false);
  const strength = formatDrinkStrength(drink);
  const dus = calculateDrinkUnits(drink);

  return (
    <li className="list-none group">
      <Dialog {...(open !== undefined ? { open, onOpenChange } : {})}>
        <DialogTrigger className="text-left">
          <h2 className="m-0 text-xl font-bold tracking-wide">{drink.title}</h2>
          <p className="mt-1 mb-0 text-base text-muted-foreground font-light font-sans group-hover:text-foreground">
            {drink.ingredients.map((d) => d.ingredient.name).join(", ")}
          </p>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{drink.title}</DialogTitle>
            <DialogDescription>
              {drink.instructions}
              <ul className="list-disc list-inside text-foreground mt-4 font-sans">
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
              {strength && (
                <p
                  className="mt-4 text-sm text-muted-foreground flex items-center gap-1 cursor-pointer select-none"
                  onMouseEnter={() => !tapped && setShowDUs(true)}
                  onMouseLeave={() => !tapped && setShowDUs(false)}
                  onClick={() => {
                    setTapped((prev) => !prev);
                    setShowDUs((prev) => !prev);
                  }}
                >
                  <Wine size={16} />
                  {showDUs && dus ? `${Math.round(dus)} DUs` : strength}
                </p>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </li>
  );
};

export default DrinkListing;
