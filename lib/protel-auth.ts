import { createHash } from "crypto";

const COOKIE_NAME = "protel-auth";

function getPasswordFromEnv(): string {
  return process.env.PROTEL_ACCESS_PASSWORD ?? "";
}

export function getProtelCookieName() {
  return COOKIE_NAME;
}

export function createProtelAuthToken() {
  const password = getPasswordFromEnv();
  return createHash("sha256").update(password).digest("hex");
}

export function isValidProtelPassword(inputPassword: string) {
  const configuredPassword = getPasswordFromEnv();

  if (!configuredPassword) {
    return false;
  }

  return inputPassword === configuredPassword;
}
