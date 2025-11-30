import * as React from "react";

import { Button } from "@/components/ui/button";
import type { Ingredient } from "@/types/ingredient";

import { Form, FormField, FormLabel } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import {
  allNotes,
  baseSpiritDrinkCounts,
  ingredientDrinkCounts,
  ingredientsInAllDrinks,
  noteDrinkCounts,
} from "@/menu";
import { baseSpirits, getByName } from "@/types/ingredient";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FilterCombobox } from "./FilterCombobox";
import { DialogClose } from "./ui/dialog";

const formSchema = z.object({
  baseSpirit: z.string(),
  ingredient: z.string().or(z.null()),
  note: z.string().or(z.null()),
});

const spiritItems = baseSpirits.map((s) => ({
  value: s.name,
  count: baseSpiritDrinkCounts.get(s.name),
}));

const ingredientItems = ingredientsInAllDrinks.map((i) => ({
  value: i.name,
  count: ingredientDrinkCounts.get(i.name),
}));

const noteItems = allNotes.map((n) => ({
  value: n,
  count: noteDrinkCounts.get(n),
}));

export function FilterForm({
  className,
  setBaseSpirit,
  baseSpirit,
  setRequiredIngredient,
  requiredIngredient,
  setRequiredNote,
  requiredNote,
}: React.ComponentProps<"form"> & {
  setBaseSpirit: (baseSpirit: Ingredient | null) => void;
  baseSpirit: Ingredient | null;
  setRequiredIngredient: (ingredient: string | null) => void;
  requiredIngredient: string | null;
  setRequiredNote: (note: string | null) => void;
  requiredNote: string | null;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      baseSpirit: baseSpirit?.name ?? "",
      ingredient: requiredIngredient,
      note: requiredNote,
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setBaseSpirit(getByName(data.baseSpirit));
    setRequiredIngredient(data.ingredient);
    setRequiredNote(data.note);
  };

  const onClear = () => {
    setBaseSpirit(null);
    setRequiredIngredient(null);
    setRequiredNote(null);
  };

  return (
    <Form {...form}>
      <form
        className={cn("grid items-start gap-4", className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="baseSpirit"
            render={({ field }) => (
              <>
                <FormLabel htmlFor="base">Base Spirit</FormLabel>
                <FilterCombobox
                  items={spiritItems}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select spirit"
                  filterPlaceholder="Filter spirit..."
                />
              </>
            )}
          />
        </div>
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="ingredient"
            render={({ field }) => (
              <>
                <FormLabel htmlFor="ingredient">Ingredient</FormLabel>
                <FilterCombobox
                  items={ingredientItems}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select ingredient"
                  filterPlaceholder="Filter ingredient..."
                />
              </>
            )}
          />
        </div>
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <>
                <FormLabel htmlFor="note">Tasting Notes</FormLabel>
                <FilterCombobox
                  items={noteItems}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select note"
                  filterPlaceholder="Filter notes..."
                />
              </>
            )}
          />
        </div>
        <DialogClose asChild>
          <Button type="submit">Filter</Button>
        </DialogClose>
        <DialogClose asChild>
          <Button variant="outline" onClick={onClear}>
            Clear
          </Button>
        </DialogClose>
      </form>
    </Form>
  );
}
