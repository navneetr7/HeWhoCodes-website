import "@fontsource-variable/space-grotesk";
import { SiteLoader } from "@/components/brand/SiteLoader";
import { defaultSiteMetadata } from "@/lib/metadata";
import "./globals.css";

export const metadata = defaultSiteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">
        <SiteLoader />
        {children}
      </body>
    </html>
  );
}
