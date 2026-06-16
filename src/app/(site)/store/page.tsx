import { ContentPage, PageHeader } from "@/components/layout/ContentPage";
import { storeIntro } from "@/data/store";
import { StoreHorizon } from "@/features/store/StoreHorizon";
import { storePageMetadata } from "@/lib/metadata";

export const metadata = storePageMetadata;

export default function StorePage() {
  return (
    <ContentPage>
      <PageHeader
        eyebrow={storeIntro.eyebrow}
        title={storeIntro.title}
        titleClassName="text-[var(--store-accent)]"
      />
      <StoreHorizon />
    </ContentPage>
  );
}