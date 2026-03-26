"use server";

import { generateText } from "ai";
import { cookies } from "next/headers";
import {
  getModelForProvider,
  hasProviderApiKey,
  resolveProvider,
  SupportedProvider,
} from "@/lib/ai-provider";
import {
  createProtelAuthToken,
  getProtelCookieName,
  isValidProtelPassword,
} from "@/lib/protel-auth";

const SYSTEM_PROMPT =
  "Du bist ein Agent in einem Service Center und bekommst Texte und Antworten, die vielleicht nicht im richtigen Format sind und die richtige Anrede hat. Gliedere die Antwort in Absätze, falls angebracht und formatiere es richtig. Die Antworten sollen im plural (wir) geschrieben werden nicht in der Ich-Perspektive. Ergänze am am Anfang und am Ende Flosekln, die in eine Email gehören. ";

type ActionResult = {
  success: boolean;
  output?: string;
  error?: string;
};

export async function unlockProtel(password: string): Promise<ActionResult> {
  if (!password?.trim()) {
    return { success: false, error: "Bitte ein Passwort eingeben." };
  }

  if (!isValidProtelPassword(password)) {
    return { success: false, error: "Passwort ist ungueltig." };
  }

  const cookieStore = await cookies();
  cookieStore.set(getProtelCookieName(), createProtelAuthToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return { success: true };
}

export async function clearProtelSession(): Promise<ActionResult> {
  const cookieStore = await cookies();
  cookieStore.delete(getProtelCookieName());
  return { success: true };
}

export async function processText(
  inputText: string,
  selectedProvider?: SupportedProvider
): Promise<ActionResult> {
  const text = inputText?.trim();

  if (!text) {
    return { success: false, error: "Bitte gib zuerst einen Text ein." };
  }

  const provider = resolveProvider(selectedProvider);

  if (!hasProviderApiKey(provider)) {
    return {
      success: false,
      error:
        provider === "openai"
          ? "OPENAI_API_KEY fehlt in .env.local."
          : "GOOGLE_GENERATIVE_AI_API_KEY fehlt in .env.local.",
    };
  }

  try {
    const { text: output } = await generateText({
      model: getModelForProvider(provider),
      system: SYSTEM_PROMPT,
      prompt: text,
    });

    return { success: true, output: output.trim() };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unbekannter Fehler vom Provider.";
    return {
      success: false,
      error:
        `Verarbeitung fehlgeschlagen (Provider: ${provider}). Ursache: ${message}`,
    };
  }
}
