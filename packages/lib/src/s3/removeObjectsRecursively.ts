import { env } from "@typebot.io/env";
import { initClient, isS3Configured } from "./initClient";

const removeObjectsRecursively = async (prefix: string): Promise<boolean> => {
  // Gracefully skip if S3 is not configured
  if (!isS3Configured()) {
    console.warn(
      "[S3] Storage not configured. Skipping object removal for prefix:",
      prefix,
    );
    return true; // Return success since there's nothing to remove
  }

  try {
    const minioClient = initClient();
    const bucketName = env.S3_BUCKET;

    const objectsStream = minioClient.listObjectsV2(bucketName, prefix, true);

    for await (const obj of objectsStream) {
      try {
        await minioClient.removeObject(bucketName, obj.name);
      } catch (err) {
        console.error(`[S3] Error removing ${obj.name}:`, err);
      }
    }
    return true;
  } catch (err) {
    console.error("[S3] Error in removeObjectsRecursively:", err);
    return false;
  }
};

export const removeObjectsFromWorkspace = async (workspaceId: string) => {
  await removeObjectsRecursively(`public/workspaces/${workspaceId}/`);
  await removeObjectsRecursively(`private/workspaces/${workspaceId}/`);
};

export const removeObjectsFromResult = async ({
  workspaceId,
  resultIds,
  typebotId,
}: {
  workspaceId: string;
  resultIds: string[];
  typebotId: string;
}) => {
  for (const resultId of resultIds) {
    await removeObjectsRecursively(
      `public/workspaces/${workspaceId}/typebots/${typebotId}/results/${resultId}/`,
    );
  }
};

export const removeAllObjectsFromResult = async ({
  workspaceId,
  typebotId,
}: {
  workspaceId: string;
  typebotId: string;
}) => {
  await removeObjectsRecursively(
    `public/workspaces/${workspaceId}/typebots/${typebotId}/results/`,
  );
};

export const removeObjectsFromTypebot = async ({
  typebotId,
  workspaceId,
}: {
  typebotId: string;
  workspaceId: string;
}) => {
  await removeObjectsRecursively(
    `public/workspaces/${workspaceId}/typebots/${typebotId}/`,
  );
};

export const removeObjectsFromUser = async (userId: string) => {
  await removeObjectsRecursively(`public/users/${userId}/`);
};
