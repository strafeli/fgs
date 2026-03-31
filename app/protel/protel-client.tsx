"use client";

import { FormEvent, useState, useTransition } from "react";
import { Copy, RefreshCcw, Sparkles } from "lucide-react";
import {
  clearProtelSession,
  processText,
  unlockProtel,
} from "@/app/actions/process-text";
import { SupportedProvider } from "@/lib/ai-provider";

const TEMPLATE_PRESETS = [
  {
    id: "newKPR",
    title: "Neue KPR",
    text: `Sehr geehrter Kunde,
vielen Dank fuer die Anfrage.
Ich habe Ihnen ein neues Formular in einer separaten Email zugesendet.
Der Absender der Email lautet noreply@supra-elektronik.com
Bitte pruefen Sie auch Ihren SPAM-Ordner.
Bitte beachten Sie, dass das Formular aus Sicherheitsgruenden nur 48h gueltig ist.
Fuer weitere Fragen stehen wir Ihnen selbstverstaendlich gerne zur Verfuegung.`,
  },
  {
    id: "newKPREn",
    title: "Neue KPR EN",
    text: `Dear Customer,
thank you very much for your request.
I have sent you a new form in a separate email.
The sender of the email is noreply@supra-elektronik.com.
Please also check your SPAM folder.
Please note that the form is only valid for 48h for security reasons.
If you have any further questions, please do not hesitate to contact us.`,
  },
  {
    id: "productCode",
    title: "Produkt Code",
    text: `Der Produktcode ist eine vier- bis sechsstellige Nummer auf der Verpackung, der Garantiekarte, dem Benutzerhandbuch oder dem Kassenbon.
Sie ist notwendig, um den Artikel in unserem System zu identifizieren.`,
  },
  {
    id: "productCodeEn",
    title: "Produkt Code EN",
    text: `The product code is as four to six digit long number on package, warranty card, user manual or receipt.
It is necessary to identify the article in our system.`,
  },
  {
    id: "expertTeam",
    title: "Experten Team",
    text: `Sehr geehrter Kunde,
wir danken Ihnen fuer Ihre Nachricht.
Ich habe Ihre Anfrage an die zustaendige Abteilung weitergeleitet.
Diese wird sich so schnell wie moeglich mit Ihnen in Verbindung setzen.
Wir danken Ihnen fuer Ihre Geduld und Ihr Verstaendnis.
Sollten Sie innerhalb der naechsten 3 Werktage nichts von uns gehoert haben, kontaktieren Sie uns bitte erneut.`,
  },
  {
    id: "expertTeamEN",
    title: "Experten Team EN",
    text: `Dear Customer,
we thank you for your message.
I have forwarded your request to the expert team.
They will contact you as soon as possible.
Thank you for your patience and understanding.
If you do not receive in the next three working days, please contact us again.
If you have any further questions, please do not hesitate to contact us again.`,
  },
  {
    id: "noPhoto",
    title: "Kein Foto",
    text: `Sehr geehrter Kunde,
wir danken Ihnen fuer Ihre Nachricht.
Leider sind die Fotos, die Sie Ihrer letzten Nachricht beigefuegt haben, in unserem System nicht sichtbar. Wir bitten Sie, uns diese erneut zur Verfuegung zu stellen, vorzugsweise als PDF.
Wir danken Ihnen fuer Ihr Verstaendnis und Ihre Mitarbeit.

Wenn Sie weitere Fragen haben, zoegern Sie bitte nicht, uns erneut zu kontaktieren.`,
  },
  {
    id: "noPhotoEN",
    title: "Kein Foto EN",
    text: `Dear Customer,
we thank you for your message.
Unfortunately, the photo(s) attached to your last message are not visible in our system. We kindly ask you to provide them again, preferably as PDF.
Thank you for your understanding and cooperation.

If you have any further questions, please do not hesitate to contact us again.`,
  },
  {
    id: "noSell",
    title: "Kein Verkauf",
    text: `Sehr geehrter Kunde,
vielen Dank fuer die Anfrage.
Als Garantiedienstleister sind wir leider nur fuer Garantiefaelle zustaendig und duerfen keine Ersatzteile verkaufen.
Zusaetzlich wurden wir vom Hersteller leider nicht informiert, ob und wo Ersatzteile erworben werden koennen.
Es tut mir Leid, Ihnen keine hilfreichere Antwort senden zu koennen.

Fuer weitere Fragen stehen wir Ihnen selbstverstaendlich gerne zur Verfuegung.`,
  },
  {
    id: "noSollEn",
    title: "Kein Verkauf von ET",
    text: `Dear Customer,
Thank you for your enquiry.
As a warranty service provider, we are unfortunately only responsible for warranty cases and are not allowed to sell spare parts.
In addition, we have unfortunately not been informed by the manufacturer whether and where spare parts can be purchased.
I am sorry not to be able to send you a more helpful answer.

If you have any further questions, please do not hesitate to contact us.`,
  },
  {
    id: "PositecContact",
    title: "Positec Kontakt",
    text: `Positec Kontakt:
aldi.ferrex@positecgroup.com
+34 91 56 02 577`,
  },
  {
    id: "kprEN",
    title: "KPR Anbieten EN",
    text: `Dear Customer,
Thank you for your message.

We regret to inform you that the item you complained about is currently out of stock.
In the interest of a quick resolution of your service case, we would therefore like to offer you a purchase price refund.

Please use our encrypted online form to submit your data, which will be sent to you in a separate e-mail.
Please do not return the defective item to us, but dispose of it properly after receiving your purchase price refund.

If you have any questions regarding your transaction, please do not hesitate to contact us.`,
  },
  {
    id: "dataEN",
    title: "Daten erhalten EN",
    text: `Dear Customer,
Thank you for your feedback.

We have received your bank details and forwarded them to our accounting department.
The refund will be made within the next 3-5 working days.

Please do not hesitate to contact us if you have any further questions.`,
  },
  {
    id: "replaceEN",
    title: "Austausch EN",
    text: `Dear Customer,
Thank you for your message.

We have entered your data into our system and will send you the requested spare part/replacement unit as soon as possible.
Please do not return the defective item to us, but dispose of it properly after receiving your new item.

If you have any further questions, please do not hesitate to contact our service team.`,
  },
  {
    id: "logfile",
    title: "Logfile-Email",
    text: `hmaj@supra-elektronik.com`,
  },
  {
    id: "backToAldi",
    title: "Zurueck zu Aldi",
    text: `Guten Tag,

vielen Dank fuer Ihre Nachricht.
Es tut uns Leid, dass das Produkt nicht den Erwartungen entspricht.

Da wir als Garantiedienstleister erst nach 90 Tagen fuer die Bearbeitung Ihrer Anfrage zustaendig sind, moechten wir Sie bitten sich an die Aldi-Filiale zu wenden.

Sollten Sie dort keine Hilfe erhalten, kontaktieren Sie uns bitte erneut.`,
  },
  {
    id: "backToAldiEn",
    title: "Zurueck zu Aldi EN",
    text: `Dear customer,

Thank you for your message.
We are sorry that the product does not meet your expectations.

As Aldi is responsible for the first 90 days after purchase, we would ask you to contact them first.

If you do not receive any help there, please contact us again.`,
  },
  {
    id: "thankYou",
    title: "Danke & Feedback",
    text: `Guten Tag,

vielen Dank fuer die positive Rueckmeldung.
Kontaktieren Sie uns gerne jederzeit, sollte der Bedarf bestehen.
Bis dahin wuenschen wir Ihnen alles Gute.`,
  },
  {
    id: "thankYouEN",
    title: "Thank you & Feedback",
    text: `Dear customer,

Thank you for your positive feedback.
Please feel free to contact us at any time should you need us.
Until then, we wish you all the best.`,
  },
] as const;

type ProtelClientProps = {
  isAuthenticated: boolean;
  defaultProvider: SupportedProvider;
};

export default function ProtelClient({
  isAuthenticated,
  defaultProvider,
}: ProtelClientProps) {
  const [authenticated, setAuthenticated] = useState(isAuthenticated);
  const [password, setPassword] = useState("");
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [selectedProvider, setSelectedProvider] =
    useState<SupportedProvider>(defaultProvider);
  const [copiedTemplateId, setCopiedTemplateId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleUnlock = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage(null);

    startTransition(async () => {
      const result = await unlockProtel(password);
      if (!result.success) {
        setStatusMessage(result.error ?? "Login fehlgeschlagen.");
        return;
      }

      setAuthenticated(true);
      setPassword("");
    });
  };

  const handleProcess = () => {
    setStatusMessage(null);

    startTransition(async () => {
      const result = await processText(inputText, selectedProvider);
      if (!result.success) {
        setStatusMessage(result.error ?? "Text konnte nicht verarbeitet werden.");
        return;
      }

      setOutputText(result.output ?? "");
    });
  };

  const handleCopy = async () => {
    if (!outputText.trim()) {
      setStatusMessage("Kein Ausgabetext zum Kopieren vorhanden.");
      return;
    }

    try {
      await navigator.clipboard.writeText(outputText);
      setStatusMessage("Ausgabe in die Zwischenablage kopiert.");
    } catch {
      setStatusMessage("Kopieren fehlgeschlagen.");
    }
  };

  const handleReset = () => {
    setInputText("");
    setOutputText("");
    setStatusMessage("Eingabe und Ausgabe wurden zurueckgesetzt.");
  };

  const handleReload = async () => {
    await clearProtelSession();
    window.location.reload();
  };

  const handleTemplateCopy = async (templateId: string, templateText: string) => {
    try {
      await navigator.clipboard.writeText(templateText);
      setCopiedTemplateId(templateId);
      setTimeout(() => {
        setCopiedTemplateId((current) =>
          current === templateId ? null : current
        );
      }, 1400);
    } catch {
      setStatusMessage("Kopieren der Vorlage fehlgeschlagen.");
    }
  };

  if (!authenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center p-6">
        <div className="w-full max-w-md rounded-2xl border border-white/20 bg-white/60 p-6 shadow-xl backdrop-blur dark:border-white/10 dark:bg-white/5">
          <h1 className="mb-2 text-2xl font-semibold text-[#111313] dark:text-white">
            Protel Zugang
          </h1>
          <p className="mb-6 text-sm text-[#4b4b4b] dark:text-neutral-300">
            Diese Unterseite ist passwortgeschuetzt.
          </p>

          <form className="space-y-4" onSubmit={handleUnlock}>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Passwort"
              className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-[#111313] outline-none ring-[#D092C0] transition focus:ring-2 dark:border-white/20 dark:bg-[#161818] dark:text-white"
              required
            />
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#D092C0] px-4 py-3 font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Sparkles className="h-4 w-4" />
              {isPending ? "Pruefe..." : "Entsperren"}
            </button>
          </form>

          {statusMessage ? (
            <p className="mt-4 text-sm text-red-600 dark:text-red-400">
              {statusMessage}
            </p>
          ) : null}
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-5 p-6 md:p-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-[#111313] dark:text-white">
          Protel Text Optimizer
        </h1>
        <button
          type="button"
          onClick={handleReload}
          className="inline-flex items-center gap-2 rounded-lg border border-black/10 px-3 py-2 text-sm text-[#111313] transition hover:bg-black/5 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
        >
          <RefreshCcw className="h-4 w-4" />
          Logout & Reload
        </button>
      </div>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-black/10 bg-white/70 p-4 shadow-xl backdrop-blur dark:border-white/10 dark:bg-white/5">
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-[#111313] dark:text-neutral-200">
              Modell
            </label>
            <select
              value={selectedProvider}
              onChange={(event) =>
                setSelectedProvider(event.target.value as SupportedProvider)
              }
              className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-[#111313] outline-none ring-[#D092C0] transition focus:ring-2 dark:border-white/20 dark:bg-[#161818] dark:text-white"
            >
              <option value="google">Google - Gemini 1.5 Flash</option>
              <option value="openai">OpenAI - GPT-4o-mini</option>
            </select>
          </div>
          <label className="mb-2 block text-sm font-medium text-[#111313] dark:text-neutral-200">
            Eingabetext
          </label>
          <textarea
            value={inputText}
            onChange={(event) => setInputText(event.target.value)}
            rows={12}
            placeholder="Text hier einfuegen..."
            className="w-full resize-y rounded-xl border border-black/10 bg-white px-4 py-3 text-[#111313] outline-none ring-[#D092C0] transition focus:ring-2 dark:border-white/20 dark:bg-[#161818] dark:text-white"
          />
        </div>

        <div className="rounded-2xl border border-black/10 bg-white/70 p-4 shadow-xl backdrop-blur dark:border-white/10 dark:bg-white/5">
          <div className="mb-2 flex items-center justify-between">
            <label className="block text-sm font-medium text-[#111313] dark:text-neutral-200">
              Ausgabe
            </label>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-2 rounded-lg border border-black/10 px-3 py-1.5 text-xs text-[#111313] transition hover:bg-black/5 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
            >
              <Copy className="h-4 w-4" />
              Copy
            </button>
          </div>
          <textarea
            value={outputText}
            readOnly
            rows={12}
            placeholder="Die optimierte Ausgabe erscheint hier..."
            className="w-full resize-y rounded-xl border border-black/10 bg-neutral-100 px-4 py-3 text-[#111313] outline-none dark:border-white/20 dark:bg-[#111313] dark:text-white"
          />
        </div>
      </section>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleProcess}
          disabled={isPending}
          className="inline-flex items-center gap-2 rounded-xl bg-[#D092C0] px-4 py-3 font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Sparkles className="h-4 w-4" />
          {isPending ? "Processing..." : "Verarbeiten"}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-2 rounded-xl border border-black/10 px-4 py-3 font-medium text-[#111313] transition hover:bg-black/5 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
        >
          <RefreshCcw className="h-4 w-4" />
          Reset
        </button>
      </div>

      <section className="rounded-2xl border border-black/10 bg-white/70 p-4 shadow-xl backdrop-blur dark:border-white/10 dark:bg-white/5">
        <h2 className="mb-3 text-base font-semibold text-[#111313] dark:text-white">
          Vorlagen
        </h2>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {TEMPLATE_PRESETS.map((template) => (
            <button
              key={template.id}
              type="button"
              onClick={() => handleTemplateCopy(template.id, template.text)}
              className="inline-flex items-center justify-between rounded-lg border border-black/10 bg-white px-3 py-2 text-left text-sm text-[#111313] transition hover:bg-black/5 dark:border-white/20 dark:bg-[#161818] dark:text-white dark:hover:bg-white/10"
            >
              <span className="truncate">{template.title}</span>
              <span
                className={`ml-2 shrink-0 text-xs ${
                  copiedTemplateId === template.id
                    ? "text-green-600 dark:text-green-400"
                    : "text-[#7a7a7a] dark:text-neutral-400"
                }`}
              >
                {copiedTemplateId === template.id ? "Kopiert" : "Kopieren"}
              </span>
            </button>
          ))}
        </div>
      </section>

      {statusMessage ? (
        <p className="text-sm text-[#111313] dark:text-neutral-300">{statusMessage}</p>
      ) : null}
    </main>
  );
}
