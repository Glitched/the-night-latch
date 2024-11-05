import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { useMediaQuery } from "@/hooks/use-media-query";
import type { IngredientEntry } from "@/types/ingredient";
import { IngredientType } from "@/types/ingredientType";
import { FilterForm } from "./FilterForm";

export function FilterModal({
  setBaseSpirit,
  setRequiredIngredient,
}: {
  setBaseSpirit: (baseSpirit: IngredientType | null) => void;
  setRequiredIngredient: (ingredient: IngredientEntry | null) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const btn = <Button variant="ghost">Filter</Button>;
  const title = "Filter Menu";
  const description = "Select a base spirit or ingredient to filter the menu.";
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{btn}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <FilterForm
            setBaseSpirit={setBaseSpirit}
            setRequiredIngredient={setRequiredIngredient}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{btn}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <FilterForm
          className="px-4"
          setBaseSpirit={setBaseSpirit}
          setRequiredIngredient={setRequiredIngredient}
        />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Clear</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
