export const breakpoints = {
  md: 768,
};

export const currentBaseUrl = "https://chatly.vercel.app";
export const signinUrl = "https://chatly-builder.vercel.app/signin";
export const registerUrl = "https://chatly-builder.vercel.app/register";
export const dashboardUrl = "https://chatly-builder.vercel.app/typebots";
export const githubRepoUrl = "https://github.com/zain-099";
export const blueskyUrl = "https://bsky.app/profile/chatly.io";
export const linkedInUrl = "https://www.linkedin.com/company/chatly";
export const discordUrl = "https://chatly.io/discord";
export const docsUrl = "https://docs.chatly.io";
export const howToGetHelpUrl = `${docsUrl}/guides/how-to-get-help`;
export const stripeClimateUrl = "https://climate.stripe.com/5VCRAq";
export const enterpriseLeadTypebotUrl =
  "https://chatly-builder.vercel.app/enterprise-lead-form";

export const legacyRedirects = {
  "/typebot-lib": "https://unpkg.com/typebot-js@2.0.21/dist/index.umd.min.js",
  "/typebot-lib/v2": "https://unpkg.com/typebot-js@2.1.3/dist/index.umd.min.js",
} as const;
