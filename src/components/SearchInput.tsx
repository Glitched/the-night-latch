import { MagnifyingGlass, X } from "@phosphor-icons/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

export function SearchInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const expand = useCallback(() => {
    setExpanded(true);
  }, []);

  const collapse = useCallback(() => {
    onChange("");
    setExpanded(false);
  }, [onChange]);

  // Focus input when expanded
  useEffect(() => {
    if (expanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [expanded]);

  // Keep expanded if there's a value
  useEffect(() => {
    if (value && !expanded) {
      setExpanded(true);
    }
  }, [value, expanded]);

  if (!expanded) {
    return (
      <Button
        variant="ghost"
        onClick={expand}
        className="font-serif text-xl text-muted-foreground print:hidden select-none"
      >
        <MagnifyingGlass size={32} />
        Search
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2 print:hidden">
      <div className="relative flex items-center">
        <MagnifyingGlass
          size={20}
          className="absolute left-3 text-muted-foreground pointer-events-none"
        />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape") collapse();
          }}
          placeholder="Search drinks..."
          className="h-10 w-48 sm:w-64 pl-10 pr-10 rounded-md border border-input bg-background text-base font-sans placeholder:text-muted-foreground focus:outline-none focus:border-foreground/50"
        />
        <button
          onClick={collapse}
          className="absolute right-2 p-1 rounded-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          aria-label="Clear search"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
