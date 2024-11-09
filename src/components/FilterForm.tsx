import * as React from "react";

import { Button } from "@/components/ui/button";

import { Form, FormControl, FormField, FormLabel } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { BaseSpirit } from "@/types/baseSpirit";
import { IngredientType } from "@/types/ingredientType";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { IngredientComboBox } from "./IngredientCombobox";
import { DialogClose } from "./ui/dialog";

const formSchema = z.object({
  baseSpirit: z.string(),
  ingredient: z.string().or(z.null()),
});

export function FilterForm({
  className,
  setBaseSpirit,
  setRequiredIngredient,
}: React.ComponentProps<"form"> & {
  setBaseSpirit: (baseSpirit: IngredientType | null) => void;
  setRequiredIngredient: (ingredient: string | null) => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      baseSpirit: IngredientType.All,
      ingredient: null,
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    setBaseSpirit(data.baseSpirit as IngredientType);
    setRequiredIngredient(data.ingredient);
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
          <FormField
            control={form.control}
            name="ingredient"
            render={({ field }) => (
              <>
                <FormLabel htmlFor="ingredient">Ingredient</FormLabel>
                <IngredientComboBox
                  onChange={field.onChange}
                  value={field.value}
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
