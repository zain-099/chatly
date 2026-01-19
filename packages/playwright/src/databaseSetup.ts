import { encrypt } from "@typebot.io/credentials/encrypt";
import type { StripeCredentials } from "@typebot.io/credentials/schemas";
import { env } from "@typebot.io/env";
import prisma from "@typebot.io/prisma";
import { Plan, WorkspaceRole } from "@typebot.io/prisma/enum";

export const apiToken = process.env.API_TOKEN ?? "redacted_token";

export const proWorkspaceId = "proWorkspace";
export const freeWorkspaceId = "freeWorkspace";
export const starterWorkspaceId = "starterWorkspace";
export const lifetimeWorkspaceId = "lifetimeWorkspaceId";
export const customWorkspaceId = "customWorkspaceId";

const setupWorkspaces = async () => {
  await prisma.workspace.createMany({
    data: [
      {
        id: freeWorkspaceId,
        name: "Free workspace",
        plan: Plan.FREE,
      },
      {
        id: starterWorkspaceId,
        name: "Starter workspace",
        stripeId: "cus_LnPDugJfa18N41",
        plan: Plan.STARTER,
      },
      {
        id: proWorkspaceId,
        name: "Pro workspace",
        plan: Plan.PRO,
      },
      {
        id: lifetimeWorkspaceId,
        name: "Lifetime workspace",
        plan: Plan.LIFETIME,
      },
      {
        id: customWorkspaceId,
        name: "Custom workspace",
        plan: Plan.CUSTOM,
        customChatsLimit: 100000,
        customStorageLimit: 50,
        customSeatsLimit: 20,
      },
    ],
  });
};

export const setupUsers = async () => {
  const authenticatedUser = await prisma.user.findFirst({
    where: {
      email: "abdelrahman.abdelazeiz@gmail.com",
    },
  });
  if (!authenticatedUser) {
    throw new Error("Authenticated user not found");
  }
  await prisma.apiToken.createMany({
    data: [
      {
        ownerId: authenticatedUser.id,
        name: "Token 1",
        token: apiToken,
        createdAt: new Date(2022, 1, 1),
      },
      {
        ownerId: authenticatedUser.id,
        name: "Github",
        token: process.env.GITHUB_TEST_TOKEN ?? "redacted_token_github",
        createdAt: new Date(2022, 1, 2),
      },
      {
        ownerId: authenticatedUser.id,
        name: "N8n",
        token: process.env.N8N_TEST_TOKEN ?? "redacted_token_n8n",
        createdAt: new Date(2022, 1, 3),
      },
    ],
  });
  return prisma.memberInWorkspace.createMany({
    data: [
      {
        role: WorkspaceRole.ADMIN,
        userId: authenticatedUser.id,
        workspaceId: freeWorkspaceId,
      },
      {
        role: WorkspaceRole.ADMIN,
        userId: authenticatedUser.id,
        workspaceId: starterWorkspaceId,
      },
      {
        role: WorkspaceRole.ADMIN,
        userId: authenticatedUser.id,
        workspaceId: proWorkspaceId,
      },
      {
        role: WorkspaceRole.ADMIN,
        userId: authenticatedUser.id,
        workspaceId: lifetimeWorkspaceId,
      },
      {
        role: WorkspaceRole.ADMIN,
        userId: authenticatedUser.id,
        workspaceId: customWorkspaceId,
      },
    ],
  });
};

const setupCredentials = async () => {
  const { encryptedData, iv } = await encrypt({
    expiry_date: 1642441058842,
    access_token: process.env.GOOGLE_TEST_ACCESS_TOKEN ?? "redacted_token",
    // This token is linked to a test Google account (typebot.test.user@gmail.com)
    refresh_token: process.env.GOOGLE_TEST_REFRESH_TOKEN ?? "redacted_token",
  });
  const { encryptedData: stripeEncryptedData, iv: stripeIv } = await encrypt({
    test: {
      publicKey: env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
      secretKey: env.STRIPE_SECRET_KEY,
    },
    live: {
      publicKey: env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY ?? "",
      secretKey: env.STRIPE_SECRET_KEY ?? "",
    },
  } satisfies StripeCredentials["data"]);
  const { encryptedData: mistralEncryptedData, iv: mistralIv } = await encrypt({
    apiKey: process.env.MISTRAL,
  });
  return prisma.credentials.createMany({
    data: [
      {
        name: "pro-user@email.com",
        type: "google sheets",
        data: encryptedData,
        workspaceId: proWorkspaceId,
        iv,
      },
      {
        id: "stripe",
        name: "Test",
        type: "stripe",
        data: stripeEncryptedData,
        workspaceId: proWorkspaceId,
        iv: stripeIv,
      },
      {
        id: "mistral",
        name: "Mistral",
        type: "mistral",
        data: mistralEncryptedData,
        workspaceId: proWorkspaceId,
        iv: mistralIv,
      },
    ],
  });
};

export const setupDatabase = async () => {
  await setupWorkspaces();
  await setupUsers();
  return setupCredentials();
};

export const teardownDatabase = async () => {
  const existingUser = await prisma.user.findFirst({
    where: {
      email: "abdelrahman.abdelazeiz@gmail.com",
    },
  });
  if (!existingUser) {
    console.warn("Authenticated user not found");
    return;
  }
  await prisma.apiToken.deleteMany({
    where: {
      ownerId: existingUser.id,
    },
  });
  await prisma.webhook.deleteMany({
    where: {
      typebot: {
        workspace: {
          members: {
            some: { userId: { in: [existingUser.id] } },
          },
        },
      },
    },
  });
  await prisma.workspace.deleteMany({
    where: {
      members: {
        some: { userId: { in: [existingUser.id] } },
      },
    },
  });
  await prisma.workspace.deleteMany({
    where: {
      id: {
        in: [
          proWorkspaceId,
          freeWorkspaceId,
          starterWorkspaceId,
          lifetimeWorkspaceId,
          customWorkspaceId,
        ],
      },
    },
  });
};
