# CLAUDE.md

This website is for Ryan Slama's personal bar, hosted on https://thenightlatch.com. It's automatically deployed via Netlify on push. Ryan is a 27 year old guy who lives in Williamsburg, Brooklyn.

## Commands

```bash
# Development
yarn dev          # Start dev server (or: yarn start)
yarn build        # Type-check and build for production
yarn preview      # Preview production build
```

## Tech Stack

- **Framework**: Astro with React integration
- **Styling**: Tailwind CSS with shadcn/ui components
- **Language**: TypeScript (strict mode)

## Architecture

This is a cocktail menu website. The main data flow:

1. **Ingredients** (`src/types/ingredient.ts`): Hierarchical type system where ingredients have parent relationships (e.g., Rittenhouse Rye → Rye → Whisky → Liquor). Use `isDescendantOf()` to check ancestry and `registerIngredient()` when adding new ingredients.

2. **Drinks** (`src/menu.ts`): Array of drink objects referencing ingredients from the type system. Each drink has a title, instructions, and ingredients list with optional amounts.

3. **Menu Component** (`src/components/Menu.tsx`): React component that filters drinks by base spirit and required ingredient using the ingredient hierarchy.

## Path Aliases

Use `@/*` for imports from `src/` (configured in tsconfig.json).

## shadcn/ui

Components live in `src/components/ui/`. Add new components via shadcn CLI.
