import * as React from "react";

import { Button } from "@/components/ui/button";

import { allIngredients } from "@/types/ingredient";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMediaQuery } from "@/hooks/use-media-query";

export function IngredientComboBox({
  onChange,
  value,
}: {
  onChange: (ingredient: string) => void;
  value: string | null;
}) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start">
            {value ? <>{value}</> : <>Select ingredient</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <IngredientList setOpen={setOpen} setSelectedIngredient={onChange} />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          {value ? <>{value}</> : <>Select ingredient</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <IngredientList setOpen={setOpen} setSelectedIngredient={onChange} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function IngredientList({
  setOpen,
  setSelectedIngredient,
}: {
  setOpen: (open: boolean) => void;
  setSelectedIngredient: (ingredient: string) => void;
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter ingredient..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {Object.values(allIngredients).map((ingredient) => (
            <CommandItem
              key={ingredient.name}
              value={ingredient.name}
              onSelect={(i) => {
                setSelectedIngredient(i);
                setOpen(false);
              }}
            >
              {ingredient.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
