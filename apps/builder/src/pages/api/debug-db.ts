import prisma from "@typebot.io/prisma";
import { readdirSync, statSync } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import { join } from "path";

const listDir = (dir: string) => {
  try {
    if (!require("fs").existsSync(dir))
      return `Directory ${dir} does not exist`;
    return readdirSync(dir).map((f) => {
      const path = join(dir, f);
      try {
        const s = statSync(path);
        return f + (s.isDirectory() ? "/" : "") + " (" + s.size + ")";
      } catch {
        return f + " (error reading stat)";
      }
    });
  } catch (e: any) {
    return "Error: " + e.message;
  }
};

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse,
) {
  // Attempt to locate the prisma client directory based on the error log paths
  const possiblePaths = [
    "/var/task/apps/builder/generated/client",
    "/var/task/apps/builder/.next/server",
    "/vercel/path0/packages/prisma/generated/client",
    "/var/task/apps/builder/.prisma/client",
    "/var/task/node_modules/.prisma/client",
    "/var/task/node_modules/@prisma/client",
    process.cwd(),
    join(process.cwd(), "node_modules"),
    join(process.cwd(), "../../packages/prisma/generated/client"),
    join(process.cwd(), ".next/server"),
  ];

  const fileSystemCheck: Record<string, any> = {};
  possiblePaths.forEach((p) => {
    fileSystemCheck[p] = listDir(p);
  });

  const result: Record<string, unknown> = {
    env: {
      NODE_ENV: process.env.NODE_ENV,
      VERCEL_ENV: process.env.VERCEL_ENV,
      DATABASE_URL_SET: !!process.env.DATABASE_URL,
      // Masking partial key for security if needed, but checking start
      DATABASE_URL_PROTOCOL: process.env.DATABASE_URL?.split(":")[0],
    },
    fileSystemCheck,
  };

  try {
    const userCount = await prisma.user.count();
    result.dbStatus = "ok";
    result.userCount = userCount;
  } catch (e: any) {
    console.error("Debug DB Error:", e);
    result.dbStatus = "error";
    result.error = e.message;
    result.errorCode = e.code;
    result.errorName = e.name;
  }

  res.status(200).json(result);
}
