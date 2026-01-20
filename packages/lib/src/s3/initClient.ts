import { env } from "@typebot.io/env";
import { Client } from "minio";

/**
 * Check if S3 storage is properly configured
 */
export const isS3Configured = (): boolean => {
  return !!(env.S3_ENDPOINT && env.S3_ACCESS_KEY && env.S3_SECRET_KEY);
};

/**
 * Validate S3 endpoint format
 */
const isValidEndpoint = (endpoint: string): boolean => {
  // Endpoint should be a hostname, not a full URL
  // Valid: s3.amazonaws.com, your-project.supabase.co
  // Invalid: https://... or partial URLs
  if (endpoint.startsWith("http://") || endpoint.startsWith("https://")) {
    return false;
  }
  // Check for basic hostname format
  return /^[a-zA-Z0-9][a-zA-Z0-9.-]+[a-zA-Z0-9]$/.test(endpoint);
};

export const initClient = () => {
  if (!env.S3_ENDPOINT || !env.S3_ACCESS_KEY || !env.S3_SECRET_KEY)
    throw new Error(
      "S3 not properly configured. Missing one of those variables: S3_ENDPOINT, S3_ACCESS_KEY, S3_SECRET_KEY",
    );

  if (!isValidEndpoint(env.S3_ENDPOINT)) {
    throw new Error(
      `S3_ENDPOINT is malformed: "${env.S3_ENDPOINT}". It should be a hostname like "s3.amazonaws.com" or "your-project.supabase.co", not a full URL.`,
    );
  }

  const minioClient = new Client({
    endPoint: env.S3_ENDPOINT,
    port: env.S3_PORT,
    useSSL: env.S3_SSL,
    accessKey: env.S3_ACCESS_KEY,
    secretKey: env.S3_SECRET_KEY,
    region: env.S3_REGION,
  });

  return minioClient;
};
