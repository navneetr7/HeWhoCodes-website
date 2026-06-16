import { ContentPage, PageHeader } from "@/components/layout/ContentPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { appShowcases, appsIntro } from "@/data/apps";
import { AppShowcase } from "@/features/apps/AppShowcase";
import { appsPageJsonLd } from "@/lib/json-ld";
import { appsPageMetadata } from "@/lib/metadata";

export const metadata = appsPageMetadata;

export default function AppsPage() {
  return (
    <ContentPage>
      <JsonLd data={appsPageJsonLd} />
      <PageHeader eyebrow={appsIntro.eyebrow} title={appsIntro.title} titleClassName="text-burnt-orange" />

      <div className="apps-showcase-list">
        {appShowcases.map((app) => (
          <AppShowcase key={app.name} app={app} />
        ))}
      </div>
    </ContentPage>
  );
}