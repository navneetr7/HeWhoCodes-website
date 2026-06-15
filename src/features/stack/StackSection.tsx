import { stackCategories, stackIntro } from "@/data/stack";
import { cn } from "@/lib/utils";
import "./stack-section.css";

export function StackSection() {
  return (
    <section
      id="stack"
      className="stack-section mx-auto grid w-full max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.38fr_0.62fr] xl:max-w-[90rem] xl:gap-16 xl:px-12 xl:py-24 2xl:max-w-screen-2xl 2xl:gap-20 2xl:px-16 2xl:py-28"
    >
      <div className="stack-section__intro">
        <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.22em] text-teal xl:mb-4 xl:text-sm 2xl:text-base">
          {stackIntro.eyebrow}
        </p>
        <h2 className="text-5xl font-black leading-none text-foreground sm:text-6xl xl:text-7xl 2xl:text-8xl">
          {stackIntro.title}
        </h2>
        <p className="mt-4 text-lg text-[var(--text-muted-body)] xl:mt-6 xl:text-xl 2xl:mt-8 2xl:text-2xl">
          {stackIntro.description}
        </p>
      </div>

      <div className="stack-section__groups">
        {stackCategories.map((category) => (
          <article key={category.title} className="stack-section__group">
            <h3 className="stack-section__category font-mono text-xs font-bold uppercase tracking-[0.2em] xl:text-sm 2xl:text-base">
              {category.title}
            </h3>
            <ul className="stack-section__items">
              {category.items.map((item) => (
                <li key={`${category.title}-${item.name}`} className="stack-section__item">
                  {item.icon ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.icon}
                      alt=""
                      aria-hidden
                      className={cn("stack-section__icon", item.invertIcon && "stack-section__icon--invert")}
                    />
                  ) : null}
                  <span>
                    <span className="block text-sm font-bold leading-tight text-foreground xl:text-base 2xl:text-lg">
                      {item.name}
                    </span>
                    {item.detail ? (
                      <span className="mt-1 block font-mono text-xs leading-tight text-[var(--text-muted-subtle)] xl:text-sm 2xl:text-base">
                        {item.detail}
                      </span>
                    ) : null}
                  </span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
