import { SiteShell } from "@/components/layout/SiteShell";
import { NotFoundView } from "@/features/not-found/NotFoundView";

export default function NotFound() {
  return (
    <SiteShell>
      <NotFoundView />
    </SiteShell>
  );
}