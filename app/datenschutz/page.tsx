import Link from "next/link";

import { LegalPageShell, LegalSection } from "@/components/legal/legal-templates";

export const metadata = {
  title: "Datenschutz · FGS ONE",
  description: "Datenschutzerklärung",
};

export default function DatenschutzPage() {
  return (
    <LegalPageShell
      title="Datenschutzerklärung (DSGVO)"
      description={
        <p>
          Diese Erklärung informiert über die Verarbeitung personenbezogener Daten auf der Website{" "}
          <strong>FGS ONE</strong>. Die Angaben zur verantwortlichen Stelle finden Sie unter Punkt
          1; ergänzend gilt das{" "}
          <Link href="/impressum" className="underline underline-offset-4">
            Impressum
          </Link>
          .
        </p>
      }
    >
      <LegalSection heading="1. Verantwortliche Stelle">
        <p>
          Verantwortlich für die Datenverarbeitung auf dieser Plattform im Sinne der DSGVO ist:
        </p>
        <p>
          <strong>[Vor- und Nachname]</strong>
          <br />
          <strong>[Straße und Hausnummer, PLZ Ort]</strong>
          <br />
          E-Mail: <strong>[Kontakt-E-Mail-Adresse]</strong>
        </p>
      </LegalSection>

      <LegalSection heading="2. Art, Zweck und Rechtsgrundlage der Datenverarbeitung">
        <p>
          Wir verarbeiten personenbezogene Daten unserer Nutzer nur, soweit dies zur Bereitstellung
          einer funktionsfähigen Website sowie unserer Inhalte und Leistungen erforderlich ist.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Bestands- und Vertragsdaten</strong> (z. B. Name, Adresse, Vertragsdaten).{" "}
            <strong>Zweck:</strong> Verwaltung des Vertragsverhältnisses und Bereitstellung im
            digitalen Dokumenten-Safe.
          </li>
          <li>
            <strong>Kommunikationsdaten</strong> (z. B. E-Mail-Adresse, Telefonnummer,
            Nachrichten). <strong>Zweck:</strong> Bearbeitung von Anfragen.
          </li>
          <li>
            <strong>Zahlungsdaten</strong> (z. B. Bankverbindung). <strong>Zweck:</strong> Anzeige
            des Zahlungsstatus.
          </li>
        </ul>
        <p>
          Rechtsgrundlage hierfür ist Art. 6 Abs. 1 lit. b DSGVO (Erfüllung eines Vertrags) sowie
          Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer effizienten Verwaltung).
        </p>
      </LegalSection>

      <LegalSection heading="3. Eingesetzte Dienstleister (Auftragsverarbeiter)">
        <p>
          Um unsere Dienste sicher und zuverlässig anbieten zu können, setzen wir externe
          Dienstleister ein, mit denen wir Verträge zur Auftragsverarbeitung (AVV) gem. Art. 28
          DSGVO geschlossen haben. Die Datenverarbeitung findet primär auf Servern innerhalb der
          Europäischen Union (EU) statt:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Vercel Inc.:</strong> Hosting der Webanwendung (Hosting in EU-Rechenzentren,
            soweit konfiguriert).
          </li>
          <li>
            <strong>Supabase:</strong> Datenbank, Datenspeicherung und Authentifizierung.
            Serverstandort bitte in den Projekteinstellungen prüfen und hier konkretisieren (z. B.
            Region Frankfurt / EU).
          </li>
          <li>
            <strong>Resend:</strong> Versand von System-E-Mails (z. B. Benachrichtigungen,
            Passwort-Resets).
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="4. Speicherdauer">
        <p>
          Wir löschen personenbezogene Daten, sobald sie für die Erreichung des Zweckes ihrer
          Erhebung nicht mehr erforderlich sind. Nach Beendigung des Vertragsverhältnisses und der
          vollständigen Abwicklung (inklusive gesetzlicher Aufbewahrungsfristen von z. B. 10 Jahren
          für steuerrelevante Unterlagen gem. AO/HGB) werden die Daten gelöscht.
        </p>
      </LegalSection>

      <LegalSection heading="5. Ihre Rechte (Betroffenenrechte)">
        <p>
          Sie haben gemäß der DSGVO jederzeit das Recht auf Auskunft (Art. 15), Berichtigung
          (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18),
          Datenübertragbarkeit (Art. 20) und das Recht auf Widerspruch (Art. 21). Zur Ausübung Ihrer
          Rechte genügt eine E-Mail an die oben genannte Adresse. Zudem haben Sie ein
          Beschwerderecht bei einer zuständigen Datenschutzaufsichtsbehörde.
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
