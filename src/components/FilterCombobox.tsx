import * as React from "react";

import { Button } from "@/components/ui/button";
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

export interface FilterItem {
  value: string;
  count?: number | undefined;
}

interface FilterComboboxProps {
  items: FilterItem[];
  value: string | null;
  onChange: (value: string) => void;
  placeholder: string;
  filterPlaceholder: string;
}

export function FilterCombobox({
  items,
  value,
  onChange,
  placeholder,
  filterPlaceholder,
}: FilterComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setOpen(false);
  };

  const list = (
    <Command>
      <CommandInput placeholder={filterPlaceholder} />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {items.map((item) => (
            <CommandItem
              key={item.value}
              value={item.value}
              onSelect={handleSelect}
            >
              {item.value}
              {item.count !== undefined && (
                <span className="ml-auto text-muted-foreground">
                  {item.count}
                </span>
              )}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );

  const trigger = (
    <Button variant="outline" className="w-full justify-start">
      {value || placeholder}
    </Button>
  );

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>{trigger}</PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          {list}
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">{list}</div>
      </DrawerContent>
    </Drawer>
  );
}
