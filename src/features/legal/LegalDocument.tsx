import type { LegalSection } from "@/data/legal";
import { GlassPillNav } from "@/components/ui/GlassPillNav";
import { Section } from "@/components/ui/Section";
import "./legal-document.css";

type LegalDocumentProps = {
  title: string;
  updated: string;
  sections: LegalSection[];
};

export function LegalDocument({ title, updated, sections }: LegalDocumentProps) {
  return (
    <main className="site-main">
      <Section className="pb-20 sm:pb-32">
        <div className="mx-auto max-w-2xl">
          <GlassPillNav items={[{ label: "← Back home", href: "/" }]} />

          <header className="mt-8">
            <h1 className="legal-document__title">{title}</h1>
            <p className="legal-document__updated">Last updated {updated}</p>
          </header>

          <div className="legal-document__sections">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="legal-document__section-title">{section.title}</h2>
                <div className="legal-document__section-body">
                  {section.paragraphs.map((paragraph, index) => (
                    <p key={`${section.title}-p-${index}`}>{paragraph}</p>
                  ))}
                  {section.list ? (
                    <ul className="legal-document__list">
                      {section.list.map((item, index) => (
                        <li key={`${section.title}-li-${index}`}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </section>
            ))}
          </div>
        </div>
      </Section>
    </main>
  );
}