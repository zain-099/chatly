import { env } from "@typebot.io/env";

/**
 * Get admin emails as a normalized array
 * Handles cases where ADMIN_EMAIL might be a string, array, or undefined
 */
export const getAdminEmails = (): string[] => {
  if (Array.isArray(env.ADMIN_EMAIL)) {
    return env.ADMIN_EMAIL;
  }
  if (typeof env.ADMIN_EMAIL === "string") {
    return [env.ADMIN_EMAIL];
  }
  return [];
};

/**
 * Check if the given email is an admin email
 */
export const isAdminEmail = (email: string | null | undefined): boolean => {
  if (!email) return false;
  return getAdminEmails().includes(email);
};

/**
 * Check if the given email is NOT an admin email
 */
export const isNotAdminEmail = (email: string | null | undefined): boolean => {
  return !isAdminEmail(email);
};
