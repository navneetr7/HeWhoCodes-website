import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    signIn({ account, profile }) {
      return (
        account?.provider === "github" &&
        Boolean(process.env.GITHUB_ADMIN_ID) &&
        String(profile?.id) === process.env.GITHUB_ADMIN_ID
      );
    },
  },
});
