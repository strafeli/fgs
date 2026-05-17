import Link from "next/link";

import { LegalPageShell, LegalSection } from "@/components/legal/legal-templates";

export const metadata = {
  title: "AGB · FGS ONE",
  description: "Nutzungsbedingungen",
};

export default function AgbPage() {
  return (
    <LegalPageShell
      title="Nutzungsbedingungen (AGB)"
      description={
        <p>
          Diese Nutzungsbedingungen gelten für die Nutzung der Website und Dienste von{" "}
          <strong>FGS ONE</strong>. Angaben zum Betreiber und zur Kontaktaufnahme finden Sie im{" "}
          <Link href="/impressum" className="underline underline-offset-4">
            Impressum
          </Link>
          .
        </p>
      }
    >
      <LegalSection heading="§ 1 Geltungsbereich und Vertragsgegenstand">
        <p>
          <strong>(1)</strong> Diese Nutzungsbedingungen regeln die Nutzung der Website und
          zugehöriger Dienste von FGS ONE (nachfolgend „Dienst“ genannt).
        </p>
        <p>
          <strong>(2)</strong> Betreiber des Dienstes und Vertragspartner ist{" "}
          <strong>[Vor- und Nachname]</strong>, <strong>[Adresse]</strong>. Bitte ergänzen Sie die
          Angaben entsprechend dem Impressum.
        </p>
        <p>
          <strong>(3)</strong> Der Dienst wird Nutzern als Service zur Verfügung gestellt. Er dient
          der Kommunikation, der Bereitstellung von Dokumenten sowie der Bearbeitung von Anfragen.
        </p>
      </LegalSection>

      <LegalSection heading="§ 2 Verfügbarkeit des Dienstes (Best Effort)">
        <p>
          <strong>(1)</strong> Der Betreiber stellt den Dienst nach dem „Best Effort“-Prinzip zur
          Verfügung. Es besteht kein Anspruch auf eine ständige oder unterbrechungsfreie
          Verfügbarkeit.
        </p>
        <p>
          <strong>(2)</strong> Der Betreiber behält sich das Recht vor, den Dienst für
          Wartungsarbeiten vorübergehend abzuschalten, Funktionen jederzeit zu ändern, zu erweitern
          oder den Betrieb ganz oder teilweise einzustellen.
        </p>
      </LegalSection>

      <LegalSection heading="§ 3 Pflichten der Nutzer">
        <p>
          <strong>(1)</strong> Zugangsdaten sind vom Nutzer streng vertraulich zu behandeln und vor
          dem Zugriff Dritter zu schützen.
        </p>
        <p>
          <strong>(2)</strong> Der Nutzer verpflichtet sich, keine rechtswidrigen, beleidigenden
          oder virenverseuchten Inhalte hochzuladen oder zu übermitteln.
        </p>
        <p>
          <strong>(3)</strong> Der Nutzer ist dafür verantwortlich, dass hinterlegte Kontaktdaten
          (z. B. E-Mail-Adresse) aktuell sind.
        </p>
      </LegalSection>

      <LegalSection heading="§ 4 Haftungsausschluss und Dokumente">
        <p>
          <strong>(1)</strong> Über den Dienst bereitgestellte Dokumente und Berechnungen dienen
          ausschließlich der Information und Arbeitserleichterung.
        </p>
        <p>
          <strong>(2)</strong> Der Betreiber übernimmt keine Gewähr für die rechnerische,
          steuerliche oder rechtliche Richtigkeit, Vollständigkeit oder Aktualität automatisch
          generierter Daten. Diese ersetzen keine steuerliche oder rechtliche Beratung.
        </p>
        <p>
          <strong>(3)</strong> Die Haftung des Betreibers auf Schadensersatz ist auf Vorsatz und
          grobe Fahrlässigkeit beschränkt. Bei der Verletzung von Leben, Körper oder Gesundheit
          sowie bei der Verletzung wesentlicher Vertragspflichten haftet der Betreiber auch für
          leichte Fahrlässigkeit, begrenzt auf den vertragstypischen, vorhersehbaren Schaden.
        </p>
      </LegalSection>

      <LegalSection heading="§ 5 Laufzeit und Beendigung">
        <p>
          <strong>(1)</strong> Die Nutzungsberechtigung ist an das bestehende Vertragsverhältnis mit
          dem Betreiber gebunden.
        </p>
        <p>
          <strong>(2)</strong> Der Zugang endet nach rechtlicher Beendigung des Vertragsverhältnisses
          und vollständiger Abwicklung, sofern nichts anderes vereinbart ist.
        </p>
        <p>
          <strong>(3)</strong> Beide Parteien können die Nutzung jederzeit ohne Angabe von Gründen
          beenden.
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
