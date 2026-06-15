import { legal, termsSections } from "@/data/legal";
import { LegalPage } from "@/features/legal/LegalPage";
import { legalPageMetadata, termsPageDescription } from "@/lib/metadata";

export const metadata = legalPageMetadata("Terms of Use", termsPageDescription);

export default function TermsPage() {
  return <LegalPage sections={termsSections} title="Terms of Use" updated={legal.termsUpdated} />;
}