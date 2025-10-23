"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Impressum() {
  useEffect(() => {
    // E-Mail-Adresse per JS zusammensetzen, um Bots das Auslesen zu erschweren
    const user = "mail";
    const domain = "fgs.one";
    const email = user + "@" + domain;
    const emailLink = `<a href="mailto:${email}" style="color: inherit; text-decoration: underline; word-break: break-all;">${email}</a>`;
    const emailElement = document.getElementById("email");
    if (emailElement) {
      emailElement.innerHTML = emailLink;
    }
  }, []);

  return (
    <>
      <Link
        href="/"
        className="fixed top-8 left-8 z-[100] flex items-center justify-center w-12 h-12 rounded-full 
                   bg-white/70 shadow-[0_2px_8px_rgba(0,0,0,0.07)] text-[#222] 
                   transition-all duration-200 no-underline
                   hover:bg-[#D092C0] hover:text-white
                   dark:bg-[#111313]/70 dark:text-[#f5f5f5]
                   dark:hover:bg-[#FFB3F6] dark:hover:text-[#111313]
                   max-[700px]:top-3 max-[700px]:left-3 max-[700px]:w-10 max-[700px]:h-10"
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
          className="max-[700px]:w-6 max-[700px]:h-6"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </Link>

      <section
        className="max-w-[800px] my-[5vw] mx-auto 
                          bg-white
                          rounded-[1.5rem] pt-10 px-8 pb-8 box-border 
                          text-[#222] text-lg leading-[1.7] 
                          transition-all duration-300
                          dark:bg-transparent dark:text-[#f5f5f5]
                          max-[700px]:max-w-[95vw] max-[700px]:px-3 max-[700px]:pt-5 max-[700px]:pb-5 max-[700px]:text-base"
      >
        <h1
          className="text-[2.5rem] mb-6 text-[#D092C0] text-center tracking-[-0.02em] font-extrabold
                       dark:text-[#D092C0]
                       max-[700px]:text-[2rem]"
        >
          Impressum
        </h1>

        <p className="my-[1.1em]">
          <strong className="text-[#D092C0] font-semibold dark:text-[#FFB3F6]">
            Angaben gemäß § 5 TMG
          </strong>
        </p>
        <p className="my-[1.1em]">
          FGS One GmbH
          <br />
          Musterstraße 12
          <br />
          12345 Musterstadt
          <br />
          Deutschland
        </p>

        <p className="my-[1.1em]">
          <strong className="text-[#D092C0] font-semibold dark:text-[#FFB3F6]">
            Vertreten durch:
          </strong>
          <br />
          Felix Günter Strassner (Geschäftsführer)
        </p>

        <p className="my-[1.1em]">
          <strong className="text-[#D092C0] font-semibold dark:text-[#FFB3F6]">
            Kontakt:
          </strong>
          <br />
          Telefon: <br />
          E-Mail: <span id="email"></span>
        </p>

        <p className="my-[1.1em]">
          <strong className="text-[#D092C0] font-semibold dark:text-[#FFB3F6]">
            Registereintrag:
          </strong>
          <br />
          Eintragung im Handelsregister.
          <br />
          Registergericht: Amtsgericht Musterstadt
          <br />
          Registernummer: HRB 123456
        </p>

        <p className="my-[1.1em]">
          <strong className="text-[#D092C0] font-semibold dark:text-[#FFB3F6]">
            Umsatzsteuer-ID:
          </strong>
          <br />
          Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
          <br />
          DE123456789
        </p>

        <p className="my-[1.1em]">
          <strong className="text-[#D092C0] font-semibold dark:text-[#FFB3F6]">
            Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:
          </strong>
          <br />
          Felix Strassner
          <br />
          Musterstraße 12
          <br />
          12345 Musterstadt
        </p>

        <p className="my-[1.1em]">
          <strong className="text-[#D092C0] font-semibold dark:text-[#FFB3F6]">
            Haftungsausschluss:
          </strong>
          <br />
          Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung
          für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten
          sind ausschließlich deren Betreiber verantwortlich.
        </p>

        <p className="my-[1.1em]">
          <strong className="text-[#D092C0] font-semibold dark:text-[#FFB3F6]">
            Streitschlichtung:
          </strong>
          <br />
          Die Europäische Kommission stellt eine Plattform zur
          Online-Streitbeilegung (OS) bereit:
          <a
            href="https://ec.europa.eu/consumers/odr"
            target="_blank"
            rel="noopener"
            className="text-[#D092C0] underline break-all dark:text-[#FFB3F6]"
          >
            https://ec.europa.eu/consumers/odr
          </a>
          <br />
          Unsere E-Mail-Adresse finden Sie oben im Impressum.
        </p>
      </section>

      <footer className="w-full flex justify-center items-center py-4 bg-transparent mt-8">
        <Link
          href="/"
          className="text-inherit no-underline text-lg opacity-70 transition-opacity duration-200 font-light hover:opacity-100"
        >
          Home
        </Link>
      </footer>
    </>
  );
}
