import { env } from "@typebot.io/env";
import { Client } from "minio";

/**
 * Check if S3 storage is properly configured
 */
export const isS3Configured = (): boolean => {
  return !!(env.S3_ENDPOINT && env.S3_ACCESS_KEY && env.S3_SECRET_KEY);
};

/**
 * Parse endpoint - extract hostname from full URL if needed
 * Handles both formats:
 * - "s3.amazonaws.com" (just hostname)
 * - "https://project.storage.supabase.co/storage/v1/s3" (full URL)
 */
const parseEndpoint = (
  endpoint: string,
): { hostname: string; useSSL?: boolean } => {
  // If it's already a hostname (no protocol), return as-is
  if (!endpoint.startsWith("http://") && !endpoint.startsWith("https://")) {
    return { hostname: endpoint };
  }

  // Parse full URL to extract hostname
  try {
    const url = new URL(endpoint);
    return {
      hostname: url.hostname,
      useSSL: url.protocol === "https:",
    };
  } catch {
    // If URL parsing fails, return original (will likely fail later with better error)
    console.warn(`[S3] Could not parse endpoint URL: ${endpoint}, using as-is`);
    return { hostname: endpoint };
  }
};

export const initClient = () => {
  if (!env.S3_ENDPOINT || !env.S3_ACCESS_KEY || !env.S3_SECRET_KEY)
    throw new Error(
      "S3 not properly configured. Missing one of those variables: S3_ENDPOINT, S3_ACCESS_KEY, S3_SECRET_KEY",
    );

  const { hostname, useSSL: parsedSSL } = parseEndpoint(env.S3_ENDPOINT);

  // Use parsed SSL setting if available, otherwise fall back to env setting
  const useSSL = parsedSSL !== undefined ? parsedSSL : env.S3_SSL;

  console.log(`[S3] Initializing client with endpoint: ${hostname}`);

  const minioClient = new Client({
    endPoint: hostname,
    port: env.S3_PORT,
    useSSL,
    accessKey: env.S3_ACCESS_KEY,
    secretKey: env.S3_SECRET_KEY,
    region: env.S3_REGION,
  });

  return minioClient;
};
