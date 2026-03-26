import { google } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";

export type SupportedProvider = "google" | "openai";

const GOOGLE_MODEL = "gemini-1.5-flash";
const OPENAI_MODEL = "gpt-4o-mini";

export function getConfiguredProvider(): SupportedProvider {
  const provider = process.env.AI_MODEL_PROVIDER?.toLowerCase();

  if (provider === "google" || provider === "openai") {
    return provider;
  }

  return "google";
}

export function resolveProvider(selectedProvider?: string): SupportedProvider {
  if (selectedProvider === "google" || selectedProvider === "openai") {
    return selectedProvider;
  }

  return getConfiguredProvider();
}

export function hasProviderApiKey(provider: SupportedProvider) {
  if (provider === "openai") {
    return Boolean(process.env.OPENAI_API_KEY);
  }

  return Boolean(process.env.GOOGLE_GENERATIVE_AI_API_KEY);
}

export function getModelForProvider(selectedProvider?: string) {
  const provider = resolveProvider(selectedProvider);

  if (provider === "openai") {
    return openai(OPENAI_MODEL);
  }

  return google(GOOGLE_MODEL);
}
