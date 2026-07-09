import { coffeeDrinks, currentBean, gear, teas } from "@/coffee";
import type { ReactNode } from "react";
import ShotChart from "./ShotChart";

/**
 * The Coffee & Tea tab. Unlike the cocktail menu this is a composed page
 * read top to bottom — one bean on bar at a time, a few preparations —
 * so there's no search or filtering, and it renders as static HTML.
 */

const SectionHeading = ({ children }: { children: ReactNode }) => (
  <h2 className="m-0 mb-4 text-sm font-sans font-normal uppercase tracking-[0.3em] text-muted-foreground">
    {children}
  </h2>
);

const Chip = ({ children }: { children: ReactNode }) => (
  <span className="shrink-0 text-sm font-sans px-3 py-1 rounded-full bg-secondary text-secondary-foreground">
    {children}
  </span>
);

const ProudlyBrewSign = () => (
  <div className="mx-auto mb-16 max-w-sm -rotate-1 rounded-lg border-4 border-double border-emerald-800 px-8 py-5 text-center font-sans dark:border-emerald-500">
    <p className="m-0 text-xs font-bold uppercase tracking-[0.4em] text-muted-foreground">
      We proudly brew
    </p>
    <p className="m-0 mt-1 text-3xl font-black uppercase tracking-[0.15em] text-emerald-800 dark:text-emerald-500">
      Sey<span className="align-super text-base">®</span> Coffee
    </p>
  </div>
);

const NowBrewing = () => (
  <section className="mb-16">
    <SectionHeading>Now Brewing</SectionHeading>
    <h3 className="m-0 text-2xl font-bold tracking-wide">{currentBean.name}</h3>
    <p
      className="mt-1 mb-0 text-sm font-light tracking-wide"
      style={{ color: "hsl(var(--notes-foreground))" }}
    >
      {[...currentBean.tastingNotes].join(" · ")}
    </p>
    <p className="mt-2 mb-0 text-base font-sans text-muted-foreground">
      {currentBean.originTrail.join(" → ")}
    </p>
    <div className="mt-3 flex flex-wrap gap-2">
      <Chip>{currentBean.process}</Chip>
      <Chip>{currentBean.varietal}</Chip>
      <Chip>{currentBean.elevation}</Chip>
    </div>
    <p className="mt-3 mb-0 text-sm font-sans text-muted-foreground italic">
      Roasted by {currentBean.roaster}
    </p>
  </section>
);

const Drinks = () => (
  <section className="mb-16">
    <SectionHeading>Coffee</SectionHeading>
    <div className="flex flex-col gap-12">
      {coffeeDrinks.map((drink) => (
        <article key={drink.title}>
          <h3 className="m-0 text-xl font-bold tracking-wide">{drink.title}</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {drink.params.map((param) => (
              <Chip key={param.label}>
                {param.label} · {param.value}
              </Chip>
            ))}
          </div>
          <p className="mt-3 mb-0">{drink.description}</p>
          {drink.recipeSteps && (
            <ol className="mt-3 mb-0 pl-5 font-sans text-base text-muted-foreground">
              {drink.recipeSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          )}
          {drink.profile && (
            <div className="mt-5">
              <p className="mb-2 mt-0 text-sm font-sans uppercase tracking-[0.2em] text-muted-foreground">
                {drink.profile.label}
              </p>
              <ShotChart profile={drink.profile} {...(drink.shot ? { shot: drink.shot } : {})} />
              {drink.shot && (
                <p className="mt-2 mb-0 text-sm font-sans text-muted-foreground italic">
                  A real pull of this profile: {drink.shot.volume} g in{" "}
                  {(drink.shot.duration / 1000).toFixed(1)} s. The machine brews by weight —
                  it cuts the pump early and lets the drips land the shot on target.
                </p>
              )}
            </div>
          )}
        </article>
      ))}
    </div>
  </section>
);

const TeaList = () => (
  <section className="mb-16">
    <SectionHeading>Tea</SectionHeading>
    <ul className="m-0 flex list-none flex-col gap-4 p-0">
      {teas.map((tea) => (
        <li key={tea.name}>
          <span className="text-lg font-bold tracking-wide">{tea.name}</span>
          <span className="ml-3 align-middle text-xs font-sans uppercase tracking-wider border border-border rounded-full px-2 py-0.5 text-muted-foreground">
            {tea.type}
          </span>
          <p className="m-0 text-base font-sans text-muted-foreground">{tea.note}</p>
        </li>
      ))}
    </ul>
  </section>
);

const TheSetup = () => (
  <section>
    <SectionHeading>The Setup</SectionHeading>
    <ul className="m-0 flex list-none flex-col gap-4 p-0">
      {gear.map((item) => (
        <li key={item.name}>
          <span className="text-lg font-bold tracking-wide">{item.name}</span>
          <p className="m-0 text-base font-sans text-muted-foreground">{item.detail}</p>
        </li>
      ))}
    </ul>
  </section>
);

const CoffeeMenu = () => (
  <section className="flex-grow">
    <ProudlyBrewSign />
    <NowBrewing />
    <Drinks />
    <TeaList />
    <TheSetup />
  </section>
);

export default CoffeeMenu;
