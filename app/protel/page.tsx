import { cookies } from "next/headers";
import ProtelClient from "./protel-client";
import { createProtelAuthToken, getProtelCookieName } from "@/lib/protel-auth";
import { getConfiguredProvider } from "@/lib/ai-provider";

export default async function ProtelPage() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(getProtelCookieName())?.value;
  const isAuthenticated = authCookie === createProtelAuthToken();
  const defaultProvider = getConfiguredProvider();

  return (
    <ProtelClient
      isAuthenticated={isAuthenticated}
      defaultProvider={defaultProvider}
    />
  );
}
