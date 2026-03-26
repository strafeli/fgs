"use client";

import { FormEvent, useState, useTransition } from "react";
import { Copy, RefreshCcw, Sparkles } from "lucide-react";
import {
  clearProtelSession,
  processText,
  unlockProtel,
} from "@/app/actions/process-text";
import { SupportedProvider } from "@/lib/ai-provider";

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

      {statusMessage ? (
        <p className="text-sm text-[#111313] dark:text-neutral-300">{statusMessage}</p>
      ) : null}
    </main>
  );
}
