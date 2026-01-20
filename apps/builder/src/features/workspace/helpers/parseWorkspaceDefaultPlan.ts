import { env } from "@typebot.io/env";
import { Plan } from "@typebot.io/prisma/enum";

export const parseWorkspaceDefaultPlan = (userEmail: string) => {
  const adminEmails = Array.isArray(env.ADMIN_EMAIL)
    ? env.ADMIN_EMAIL
    : typeof env.ADMIN_EMAIL === "string"
      ? [env.ADMIN_EMAIL]
      : [];
  if (adminEmails.some((email) => email === userEmail)) return Plan.UNLIMITED;
  const defaultPlan = env.DEFAULT_WORKSPACE_PLAN as Plan;
  if (defaultPlan && Object.values(Plan).includes(defaultPlan))
    return defaultPlan;
  return Plan.FREE;
};
