import { auth, signIn, signOut } from "@/auth";
import { ContentPage, PageHeader } from "@/components/layout/ContentPage";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { BlogEditor } from "@/features/blog/BlogEditor";

export const dynamic = "force-dynamic";

export default async function BlogAdminPage() {
  const authConfigured = Boolean(
    process.env.AUTH_SECRET &&
      process.env.AUTH_GITHUB_ID &&
      process.env.AUTH_GITHUB_SECRET &&
      process.env.GITHUB_ADMIN_ID,
  );
  const session = authConfigured ? await auth() : null;

  return (
    <ContentPage sectionClassName="max-w-5xl">
      <PageHeader eyebrow="Private workspace" title="Blog admin" titleClassName="text-teal" />

      {session ? (
        <>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-5">
            <p className="font-mono text-xs text-[var(--text-muted-body)]">
              Signed in as {session.user?.name}
            </p>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/blog" });
              }}
            >
              <button
                className="glass-clear-surface rounded-full px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.12em]"
                type="submit"
              >
                Sign out
              </button>
            </form>
          </div>
          <GlassPanel className="mt-8 p-6 sm:p-8">
            <BlogEditor />
          </GlassPanel>
        </>
      ) : (
        <GlassPanel className="mt-10 p-6 sm:p-8">
          {authConfigured ? (
            <form
              action={async () => {
                "use server";
                await signIn("github", { redirectTo: "/blog/admin" });
              }}
            >
              <button
                className="glass-clear-surface rounded-full px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.12em]"
                type="submit"
              >
                Continue with GitHub
              </button>
            </form>
          ) : (
            <p className="text-[var(--text-muted-body)]">
              Add the values from <code className="font-mono text-foreground">.env.example</code> to
              <code className="font-mono text-foreground"> .env.local</code> to enable GitHub login.
            </p>
          )}
        </GlassPanel>
      )}
    </ContentPage>
  );
}
