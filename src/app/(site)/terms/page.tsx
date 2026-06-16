import { legal, termsSections } from "@/data/legal";
import { LegalDocument } from "@/features/legal/LegalDocument";
import { legalPageMetadata, termsPageDescription } from "@/lib/metadata";

export const metadata = legalPageMetadata("Terms of Use", termsPageDescription, "/terms");

export default function TermsPage() {
  return <LegalDocument sections={termsSections} title="Terms of Use" updated={legal.termsUpdated} />;
}