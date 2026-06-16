import { SiteShell } from "@/components/layout/SiteShell";
import { NotFoundView } from "@/features/not-found/NotFoundView";
import { notFoundPageMetadata } from "@/lib/metadata";

export const metadata = notFoundPageMetadata;

export default function NotFound() {
  return (
    <SiteShell>
      <NotFoundView />
    </SiteShell>
  );
}