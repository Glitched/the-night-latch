import type { Drink } from "../types/drinks";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

const DrinkListing = ({ drink }: { drink: Drink }) => (
  <li className="list-none">
    <Dialog>
      <DialogTrigger className="text-left">
        <h2 className="m-0 text-xl font-bold tracking-wide">{drink.title}</h2>
        <p className="mt-2 mb-0 text-base text-muted-foreground font-light">
          {drink.ingredients.map((d) => d.ingredient.name).join(", ")}
        </p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{drink.title}</DialogTitle>
          <DialogDescription>
            {drink.instructions}
            <ul className="list-disc list-inside text-foreground mt-4">
              {drink.ingredients.map((d) => (
                <li key={d.ingredient.name}>
                  {d.ingredient.name}
                  {d.amount && (
                    <span className="text-muted-foreground"> • {d.amount}</span>
                  )}
                </li>
              ))}
            </ul>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  </li>
);

export default DrinkListing;
