import * as React from "react";

import { Button } from "@/components/ui/button";

import { Form, FormControl, FormField, FormLabel } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { BaseSpirit } from "@/types/baseSpirit";
import { type IngredientEntry } from "@/types/ingredient";
import { IngredientType } from "@/types/ingredientType";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DialogClose } from "./ui/dialog";

const formSchema = z.object({
  baseSpirit: z.string(),
  ingredient: z.string(),
});

export function FilterForm({
  className,
  setBaseSpirit,
  setRequiredIngredient,
}: React.ComponentProps<"form"> & {
  setBaseSpirit: (baseSpirit: IngredientType | null) => void;
  setRequiredIngredient: (ingredient: IngredientEntry | null) => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      baseSpirit: IngredientType.All,
      ingredient: "None",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    setBaseSpirit(data.baseSpirit as IngredientType);
    // setRequiredIngredient(
    //   Ingredient.find((entry) => entry.name === data.ingredient) || null
    // );
  };

  const onClear = () => {
    setBaseSpirit(IngredientType.All);
    setRequiredIngredient(null);
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {BaseSpirit.map((option) => (
                      <SelectItem value={option} key={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </>
            )}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="ingredient">Ingredient</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Ingredient" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
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
