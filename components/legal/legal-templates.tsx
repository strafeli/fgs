import Link from "next/link";
import type { ReactNode } from "react";

const LEGAL_NAV = [
  { href: "/datenschutz", label: "Datenschutz" },
  { href: "/agb", label: "AGB" },
  { href: "/impressum", label: "Impressum" },
] as const;

export function LegalBackLink() {
  return (
    <Link
      href="/"
      className="fixed top-8 left-8 z-[100] flex h-12 w-12 items-center justify-center rounded-full bg-white/70 text-[#222] no-underline shadow-[0_2px_8px_rgba(0,0,0,0.07)] transition-all duration-200 hover:bg-[#D092C0] hover:text-white dark:bg-[#111313]/70 dark:text-[#f5f5f5] dark:hover:bg-[#FFB3F6] dark:hover:text-[#111313] max-[700px]:left-3 max-[700px]:top-3 max-[700px]:h-10 max-[700px]:w-10"
      aria-label="Zurück zur Startseite"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="max-[700px]:h-6 max-[700px]:w-6"
      >
        <path d="m15 18-6-6 6-6" />
      </svg>
    </Link>
  );
}

export function LegalPageShell({
  title,
  description,
  children,
}: {
  title: string;
  description?: ReactNode;
  children: ReactNode;
}) {
  return (
    <>
      <LegalBackLink />
      <main className="mx-auto my-[5vw] box-border max-w-[800px] px-8 pb-8 pt-10 text-lg leading-[1.7] text-[#222] max-[700px]:max-w-[95vw] max-[700px]:px-3 max-[700px]:pb-5 max-[700px]:pt-5 max-[700px]:text-base dark:text-[#f5f5f5]">
        <div className="rounded-[1.5rem] bg-white px-2 py-2 transition-all duration-300 dark:bg-transparent">
          <header className="mb-8 space-y-3">
            <h1 className="text-center text-[2.5rem] font-extrabold tracking-[-0.02em] text-[#D092C0] max-[700px]:text-[2rem]">
              {title}
            </h1>
            {description ? (
              <div className="text-[#4b4b4b] dark:text-neutral-300">
                {description}
              </div>
            ) : null}
          </header>

          <div className="flex flex-col gap-8">{children}</div>
        </div>

        <footer className="mt-10 border-t border-black/10 pt-8 dark:border-white/10">
          <nav
            aria-label="Rechtliche Hinweise"
            className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1 text-center text-base font-light"
          >
            {LEGAL_NAV.map((item, index) => (
              <span key={item.href} className="contents">
                {index > 0 ? (
                  <span aria-hidden className="select-none px-2 opacity-50">
                    ·
                  </span>
                ) : null}
                <Link
                  href={item.href}
                  className="text-inherit no-underline opacity-70 transition-opacity duration-200 hover:opacity-100"
                >
                  {item.label}
                </Link>
              </span>
            ))}
          </nav>
        </footer>
      </main>
    </>
  );
}

export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-2">
      <h2 className="text-xl font-semibold text-[#D092C0] dark:text-[#FFB3F6]">
        {heading}
      </h2>
      <div className="space-y-2 leading-relaxed [&_a]:text-[#D092C0] [&_a]:underline [&_a]:underline-offset-4 dark:[&_a]:text-[#FFB3F6]">
        {children}
      </div>
    </section>
  );
}
