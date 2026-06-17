import { stackCategories, stackIntro } from "@/data/stack";
import { cn } from "@/lib/utils";
import "./stack-section.css";

export function StackSection() {
  return (
    <section
      id="stack"
      className="stack-section site-content-grid mx-auto grid w-full max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.38fr_0.62fr]"
    >
      <div className="stack-section__intro min-w-0">
        <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.22em] text-teal">
          {stackIntro.eyebrow}
        </p>
        <h2 className="text-5xl font-black leading-none text-foreground sm:text-6xl">
          {stackIntro.title}
        </h2>
        <p className="mt-4 text-lg text-[var(--text-muted-body)]">{stackIntro.description}</p>
      </div>

      <div className="stack-section__groups min-w-0">
        {stackCategories.map((category) => (
          <article key={category.title} className="stack-section__group">
            <h3 className="stack-section__category">
              <span className="stack-section__category-name">{category.title}</span>
              <span className="stack-section__category-count"> ({category.items.length})</span>
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
                    <span className="block text-sm font-bold leading-tight text-foreground">
                      {item.name}
                    </span>
                    {item.detail ? (
                      <span className="mt-1 block font-mono text-xs leading-tight text-[var(--text-muted-subtle)]">
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