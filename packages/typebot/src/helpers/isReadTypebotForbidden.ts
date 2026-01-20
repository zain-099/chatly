import { env } from "@typebot.io/env";
import type { Prisma } from "@typebot.io/prisma/types";
import { settingsSchema } from "@typebot.io/settings/schemas";
import type { Workspace } from "@typebot.io/workspaces/schemas";

export const isReadTypebotForbidden = async (
  typebot: {
    settings?: Prisma.Typebot["settings"];
    collaborators: Pick<Prisma.CollaboratorsOnTypebots, "userId">[];
  } & {
    workspace: Pick<Workspace, "isSuspended" | "isPastDue"> & {
      members: Pick<Prisma.MemberInWorkspace, "userId">[];
    };
  },
  user?: Pick<Prisma.User, "email" | "id">,
) => {
  const settings = typebot.settings
    ? settingsSchema.parse(typebot.settings)
    : undefined;
  const isTypebotPublic = settings?.publicShare?.isEnabled === true;
  if (isTypebotPublic) return false;
  if (!user) return true;

  // Defensive: normalize ADMIN_EMAIL to array
  const adminEmails = Array.isArray(env.ADMIN_EMAIL)
    ? env.ADMIN_EMAIL
    : typeof env.ADMIN_EMAIL === "string"
      ? [env.ADMIN_EMAIL]
      : [];
  if (adminEmails.some((email) => email === user.email)) return false;
  return (
    typebot.workspace.isSuspended ||
    typebot.workspace.isPastDue ||
    (!typebot.collaborators.some(
      (collaborator) => collaborator.userId === user.id,
    ) &&
      !typebot.workspace.members.some((member) => member.userId === user.id))
  );
};
