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
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { useMediaQuery } from "@/hooks/use-media-query";
import type { Ingredient } from "@/types/ingredient";
import { Funnel } from "@phosphor-icons/react";
import { FilterForm } from "./FilterForm";

export function FilterModal({
  setBaseSpirit,
  baseSpirit,
  setRequiredIngredient,
  requiredIngredient,
}: {
  setBaseSpirit: (baseSpirit: Ingredient | null) => void;
  baseSpirit: Ingredient | null;
  setRequiredIngredient: (ingredient: string | null) => void;
  requiredIngredient: string | null;
}) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const btn = (
    <Button
      variant="ghost"
      className="font-serif text-xl w-full mb-16 text-muted-foreground"
    >
      <Funnel size={32} />
      Filter Drinks
    </Button>
  );
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
            baseSpirit={baseSpirit}
            setRequiredIngredient={setRequiredIngredient}
            requiredIngredient={requiredIngredient}
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
          baseSpirit={baseSpirit}
          setRequiredIngredient={setRequiredIngredient}
          requiredIngredient={requiredIngredient}
        />
      </DrawerContent>
    </Drawer>
  );
}
