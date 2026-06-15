import { legal, privacySections } from "@/data/legal";
import { LegalPage } from "@/features/legal/LegalPage";
import { legalPageMetadata, privacyPageDescription } from "@/lib/metadata";

export const metadata = legalPageMetadata("Privacy Policy", privacyPageDescription);

export default function PrivacyPage() {
  return <LegalPage sections={privacySections} title="Privacy Policy" updated={legal.privacyUpdated} />;
}