import "@fontsource-variable/space-grotesk";
import type { Viewport } from "next";
import { headers } from "next/headers";
import { SiteLoader } from "@/components/brand/SiteLoader";
import { getLoaderBootstrapScript } from "@/lib/loaderSession";
import { defaultSiteMetadata } from "@/lib/metadata";
import "./globals.css";
import "./palette.css";

export const metadata = defaultSiteMetadata;

export const viewport: Viewport = {
  themeColor: "#080907",
  colorScheme: "dark",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nonce = (await headers()).get("x-nonce") ?? "";

  return (
    <html lang="en" data-scroll-behavior="smooth" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script nonce={nonce} dangerouslySetInnerHTML={{ __html: getLoaderBootstrapScript() }} />
      </head>
      <body className="min-h-full" suppressHydrationWarning>
        <SiteLoader />
        <div data-site-shell>{children}</div>
      </body>
    </html>
  );
}
