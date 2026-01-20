import { router } from "@/helpers/server/trpc";
import { createWorkspace } from "./createWorkspace";
import { deleteWorkspace } from "./deleteWorkspace";
import { getWorkspace } from "./getWorkspace";
import { listMembersInWorkspace } from "./listMembersInWorkspace";
import { listWorkspaces } from "./listWorkspaces";
import { updateWorkspace } from "./updateWorkspace";

export const workspaceRouter = router({
  listWorkspaces,
  getWorkspace: (() => {
    if (!getWorkspace)
      console.error("CRITICAL: getWorkspace is undefined in workspaceRouter");
    return getWorkspace;
  })(),
  listMembersInWorkspace,
  createWorkspace,
  updateWorkspace,
  deleteWorkspace,
});
