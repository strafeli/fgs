import { LegalPageShell, LegalSection } from "@/components/legal/legal-templates";

export const metadata = {
  title: "Impressum · FGS ONE",
  description: "Impressum",
};

export default function ImpressumPage() {
  return (
    <LegalPageShell
      title="Impressum"
      description={
        <p>
          Öffentlich erreichbare Websites benötigen in Deutschland ein Impressum nach{" "}
          <strong>§ 5 TMG</strong> — auch wenn sie nur eine Login-Oberfläche zeigen. Die folgenden
          Angaben sind <strong>Platzhalter</strong>; bitte durch Ihre rechtskonformen Daten gemäß §
          5 TMG und § 55 RStV (soweit einschlägig) ersetzen.
        </p>
      }
    >
      <LegalSection heading="Angaben gemäß § 5 TMG">
        <p>
          <strong>Firma / Name</strong>
          <br />
          Straße Hausnr.
          <br />
          PLZ Ort
          <br />
          Deutschland
        </p>
      </LegalSection>

      <LegalSection heading="Kontakt">
        <p>
          Telefon: …
          <br />
          E-Mail: …
        </p>
      </LegalSection>

      <LegalSection heading="Vertretungsberechtigt">
        <p>Geschäftsführer / Inhaber: …</p>
      </LegalSection>

      <LegalSection heading="Registereintrag (falls vorhanden)">
        <p>
          Handelsregister: …
          <br />
          Registergericht: …
          <br />
          Registernummer: …
        </p>
      </LegalSection>

      <LegalSection heading="Umsatzsteuer-ID (falls vorhanden)">
        <p>USt-IdNr. gemäß § 27 a Umsatzsteuergesetz: …</p>
      </LegalSection>

      <LegalSection heading="Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV">
        <p>Name, Anschrift (wie oben oder gesondert).</p>
      </LegalSection>

      <LegalSection heading="EU-Streitschlichtung / Verbraucherstreitbeilegung">
        <p>
          Hinweis auf die EU-Plattform zur Online-Streitbeilegung und — falls ihr nicht
          verpflichtet oder nicht bereit seid — entsprechender Negativhinweis nach Muster
          eurer Rechtsberatung.
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
