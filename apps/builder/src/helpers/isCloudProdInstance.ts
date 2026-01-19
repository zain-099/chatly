import { env } from "@typebot.io/env";

export const isCloudProdInstance = () => {
  if (typeof window !== "undefined") {
    return window.location.hostname === "chatly-builder.vercel.app";
  }
  return env.NEXTAUTH_URL === "https://chatly-builder.vercel.app";
};
