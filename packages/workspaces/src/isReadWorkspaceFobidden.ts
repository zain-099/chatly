import { env } from "@typebot.io/env";
import type { Prisma } from "@typebot.io/prisma/types";

export const isReadWorkspaceFobidden = (
  workspace: {
    members: Pick<Prisma.MemberInWorkspace, "userId">[];
  },
  user: Pick<Prisma.User, "email" | "id">,
) => {
  // Defensive: normalize ADMIN_EMAIL to array
  const adminEmails = Array.isArray(env.ADMIN_EMAIL)
    ? env.ADMIN_EMAIL
    : typeof env.ADMIN_EMAIL === "string"
      ? [env.ADMIN_EMAIL]
      : [];

  if (
    adminEmails.some((email) => email === user.email) ||
    workspace.members.find((member) => member.userId === user.id)
  )
    return false;
  return true;
};
