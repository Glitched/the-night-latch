import * as React from "react";

import { Button } from "@/components/ui/button";

import { allNotes } from "@/menu";

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

export function NotesComboBox({
  onChange,
  value,
}: {
  onChange: (note: string) => void;
  value: string | null;
}) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start">
            {value ? <>{value}</> : <>Select taste</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <NotesList setOpen={setOpen} setSelectedNote={onChange} />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          {value ? <>{value}</> : <>Select taste</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <NotesList setOpen={setOpen} setSelectedNote={onChange} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function NotesList({
  setOpen,
  setSelectedNote,
}: {
  setOpen: (open: boolean) => void;
  setSelectedNote: (note: string) => void;
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter taste..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {allNotes.map((note) => (
            <CommandItem
              key={note}
              value={note}
              onSelect={(n) => {
                setSelectedNote(n);
                setOpen(false);
              }}
            >
              {note}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
