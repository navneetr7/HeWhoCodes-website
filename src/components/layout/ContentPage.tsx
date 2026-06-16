import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import "@/components/ui/typography.css";

type ContentPageProps = {
  children: ReactNode;
  mainClassName?: string;
  sectionClassName?: string;
};

export function ContentPage({ children, mainClassName, sectionClassName }: ContentPageProps) {
  return (
    <main className={cn("site-main relative min-h-screen", mainClassName)}>
      <section
        className={cn(
          "site-content-grid mx-auto w-full max-w-7xl px-5 pb-20 sm:px-8",
          sectionClassName,
        )}
      >
        {children}
      </section>
    </main>
  );
}

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  titleClassName?: string;
};

export function PageHeader({ eyebrow, title, titleClassName }: PageHeaderProps) {
  return (
    <>
      <p className="page-eyebrow">{eyebrow}</p>
      <h1 className={cn("text-5xl font-black leading-none sm:text-6xl", titleClassName)}>{title}</h1>
    </>
  );
}