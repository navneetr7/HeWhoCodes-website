import { legal, privacySections } from "@/data/legal";
import { LegalDocument } from "@/features/legal/LegalDocument";
import { legalPageMetadata, privacyPageDescription } from "@/lib/metadata";

export const metadata = legalPageMetadata("Privacy Policy", privacyPageDescription, "/privacy");

export default function PrivacyPage() {
  return <LegalDocument sections={privacySections} title="Privacy Policy" updated={legal.privacyUpdated} />;
}