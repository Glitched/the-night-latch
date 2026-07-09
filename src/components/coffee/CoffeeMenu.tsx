import { coffeeDrinks, currentBean, gear, teas } from "@/coffee";
import type { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import ShotChart from "./ShotChart";

/**
 * The Coffee & Tea tab. One bean on bar at a time and a few preparations,
 * so the page is composed top to bottom with no search or filtering.
 * Drink cards stay brief and progressively disclose the technical detail
 * (params, brew steps, shot chart) in a dialog, like the cocktail menu.
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
      We proudly serve
    </p>
    <p className="m-0 mt-1 text-3xl font-black uppercase tracking-[0.15em] text-emerald-800 dark:text-emerald-500">
      Sey Coffee
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
      {currentBean.originTrail.join(" / ")}
    </p>
    <div className="mt-3 flex flex-wrap gap-2">
      <Chip>Process · {currentBean.process}</Chip>
      <Chip>Varietal · {currentBean.varietal}</Chip>
      <Chip>Elevation · {currentBean.elevation}</Chip>
    </div>
    {currentBean.description && (
      <p className="mt-3 mb-0 text-base font-sans text-muted-foreground">
        {currentBean.description}
      </p>
    )}
  </section>
);

const Drinks = () => (
  <section className="mb-16">
    <SectionHeading>Coffee</SectionHeading>
    <ul className="m-0 flex list-none flex-col gap-8 p-0">
      {coffeeDrinks.map((drink) => (
        <li key={drink.title} className="group">
          <Dialog>
            <DialogTrigger className="text-left">
              <h3 className="m-0 text-xl font-bold tracking-wide">{drink.title}</h3>
              <p className="mt-1 mb-0 text-base text-muted-foreground font-light font-sans group-hover:text-foreground">
                {drink.blurb}
              </p>
            </DialogTrigger>
            <DialogContent className={drink.shot ? "sm:max-w-2xl" : undefined}>
              <DialogHeader>
                <DialogTitle>{drink.title}</DialogTitle>
                <DialogDescription asChild>
                  <div>
                    <div className="mt-1 mb-3 -mx-6 px-6 flex gap-2 overflow-x-auto scrollbar-hide">
                      {drink.params.map((param) => (
                        <Chip key={param.label}>
                          {param.label} · {param.value}
                        </Chip>
                      ))}
                    </div>
                    <p className="m-0 text-foreground">{drink.description}</p>
                    {drink.recipeSteps && (
                      <ol className="mt-3 mb-0 pl-5 font-sans text-base text-muted-foreground">
                        {drink.recipeSteps.map((step) => (
                          <li key={step}>{step}</li>
                        ))}
                      </ol>
                    )}
                    {drink.profile && (
                      <div className="mt-4">
                        <p className="mb-2 mt-0 text-sm font-sans uppercase tracking-[0.2em] text-muted-foreground">
                          {drink.profile.label}
                        </p>
                        <ShotChart
                          profile={drink.profile}
                          {...(drink.shot ? { shot: drink.shot } : {})}
                        />
                        {drink.shot && (
                          <p className="mt-2 mb-0 text-sm font-sans text-muted-foreground italic">
                            A real pull of this profile: {drink.shot.volume} g in{" "}
                            {(drink.shot.duration / 1000).toFixed(1)} s. The machine brews by
                            weight — it cuts the pump early and lets the drips land the shot on
                            target.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </li>
      ))}
    </ul>
  </section>
);

const TeaList = () => (
  <section className="mb-16">
    <SectionHeading>Tea</SectionHeading>
    <ul className="m-0 flex list-none flex-col gap-8 p-0">
      {teas.map((tea) => (
        <li key={tea.name} className="group">
          <Dialog>
            <DialogTrigger className="text-left">
              <h3 className="m-0 text-xl font-bold tracking-wide">
                {tea.name}
                {tea.caffeineFree && (
                  <span className="ml-2 align-middle text-xs font-normal tracking-wider border border-border rounded-full px-2 py-0.5 text-muted-foreground">
                    No caffeine
                  </span>
                )}
              </h3>
              <p
                className="mt-1 mb-0 text-sm font-light tracking-wide"
                style={{ color: "hsl(var(--notes-foreground))" }}
              >
                {tea.tastingNotes.join(" · ")}
              </p>
              <p className="mt-1 mb-0 text-base text-muted-foreground font-light font-sans group-hover:text-foreground">
                {tea.type}
                {tea.region ? ` · ${tea.region}` : ""}
              </p>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{tea.name}</DialogTitle>
                <DialogDescription asChild>
                  <div>
                    <div className="mt-1 mb-3 -mx-6 px-6 flex gap-2 overflow-x-auto scrollbar-hide">
                      <Chip>{tea.type}</Chip>
                      {tea.producer && <Chip>Producer · {tea.producer}</Chip>}
                      {tea.cultivar && <Chip>Cultivar · {tea.cultivar}</Chip>}
                      {tea.region && <Chip>Region · {tea.region}</Chip>}
                    </div>
                    {tea.description && <p className="m-0 text-foreground">{tea.description}</p>}
                    {tea.brew && (
                      <p className="mt-3 mb-0 text-sm font-sans text-muted-foreground">
                        Brew · {tea.brew}
                      </p>
                    )}
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </li>
      ))}
    </ul>
    <p className="mt-6 mb-0 text-sm font-sans text-muted-foreground italic">
      Loose leaf from Kettl, Greenpoint.
    </p>
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
