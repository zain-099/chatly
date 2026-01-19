import { readdirSync, statSync } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import { join } from "path";

const listDir = (dir: string) => {
  try {
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

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const cwd = process.cwd();

  // Try to find the prisma client folder
  // Based on logs: /vercel/path0/packages/prisma/generated/client
  // But also check relative paths

  const debugInfo = {
    cwd,
    dirname: __dirname,
    "ls cwd": listDir(cwd),
    "ls ..": listDir(join(cwd, "..")),
    "ls ../..": listDir(join(cwd, "../..")),
    "ls packages/prisma": listDir(join(cwd, "packages/prisma")),
    "ls packages/prisma/generated": listDir(
      join(cwd, "packages/prisma/generated"),
    ),
    "ls packages/prisma/generated/client": listDir(
      join(cwd, "packages/prisma/generated/client"),
    ),
    // Try absolute path seen in logs
    "ls /vercel/path0/packages/prisma/generated/client": listDir(
      "/vercel/path0/packages/prisma/generated/client",
    ),
    "ls .next/server": listDir(join(cwd, ".next/server")),
    "ls .next/server/chunks": listDir(join(cwd, ".next/server/chunks")),
  };

  res.status(200).json(debugInfo);
}
