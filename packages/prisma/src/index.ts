export * from "../generated/client";

import * as fs from "fs";
import { PrismaClient } from "../generated/client";

declare const global: { prisma: PrismaClient };

if (!global.prisma) {
  const vercelRuntimePath =
    "/var/task/packages/prisma/generated/client/libquery_engine-rhel-openssl-3.0.x.so.node";
  if (
    !process.env.PRISMA_QUERY_ENGINE_LIBRARY &&
    fs.existsSync(vercelRuntimePath)
  ) {
    process.env.PRISMA_QUERY_ENGINE_LIBRARY = vercelRuntimePath;
    console.log(
      "Automatically set PRISMA_QUERY_ENGINE_LIBRARY to: " + vercelRuntimePath,
    );
  }
  global.prisma = new PrismaClient();
}

export default global.prisma;
