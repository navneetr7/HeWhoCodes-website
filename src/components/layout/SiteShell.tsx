import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { cn } from "@/lib/utils";
import "./shell.css";

type SiteShellProps = {
  children: ReactNode;
  className?: string;
};

export function SiteShell({ children, className }: SiteShellProps) {
  return (
    <div className={cn("site-shell min-h-screen text-foreground", className)}>
      <div aria-hidden className="site-shell__atmosphere" />
      <Header />
      {children}
      <Footer />
    </div>
  );
}
