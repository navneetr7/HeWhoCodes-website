import "@fontsource-variable/space-grotesk";
import type { Viewport } from "next";
import { SiteLoader } from "@/components/brand/SiteLoader";
import { defaultSiteMetadata } from "@/lib/metadata";
import "./globals.css";
import "./palette.css";

export const metadata = defaultSiteMetadata;

export const viewport: Viewport = {
  themeColor: "#080907",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full" suppressHydrationWarning>
        <SiteLoader />
        {children}
      </body>
    </html>
  );
}
