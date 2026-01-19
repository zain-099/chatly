import { readReplicas } from "@prisma/extension-read-replicas";
import { PrismaClient } from "../generated/client";

if (!process.env.DATABASE_URL_REPLICA) {
  throw new Error("DATABASE_URL_REPLICA is not set");
}

const prisma = new PrismaClient().$extends(
  readReplicas({
    url: process.env.DATABASE_URL_REPLICA,
  }),
);

export default prisma;
