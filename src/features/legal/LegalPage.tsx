import type { LegalSection } from "@/data/legal";
import { LegalDocument } from "@/features/legal/LegalDocument";

type LegalPageProps = {
  title: string;
  updated: string;
  sections: LegalSection[];
};

export function LegalPage({ title, updated, sections }: LegalPageProps) {
  return (
    <main>
      <LegalDocument title={title} updated={updated} sections={sections} />
    </main>
  );
}